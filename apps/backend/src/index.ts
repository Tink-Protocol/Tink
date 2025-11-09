// src/index.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import crypto from "crypto";
import { initDB } from "./db/index";
import Tip from "./db/models";
import { verifyTransaction, anchorDigest, USDC_MINT } from "./utils/solana";
import { suggestTip } from "./utils/ai";
import posRouter from "./pos";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use("/pos", posRouter);

// Helpers
function generateReceiptId(session: string) {
  return `r_${session}`;
}

function generateDigest(obj: any) {
  return crypto.createHash("sha256").update(JSON.stringify(obj)).digest("hex");
}

// Build x402 payment payload
function buildPaymentPayload(
  session: string,
  merchantId: string,
  amount: number
) {
  const recipient =
    process.env.RECIPIENT_WALLET ||
    "seFkxFkXEY9JGEpCyPfCWTuPZG9WK6ucf95zvKCfsRX";
  return {
    code: 402,
    message: "Payment required to complete request",
    payment: {
      amount,
      currency: "USDC",
      network: "solana-devnet",
      pay_to: recipient,
      token_mint: USDC_MINT.toBase58(),
      memo: `tip:${merchantId}:${session}`,
      expires_at: new Date(Date.now() + 3600 * 1000).toISOString(),
    },
    session,
  };
}

// Middleware: validate session and amount
function validateResource(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const amount = parseFloat((req.query.amount as string) || "0");
  if (amount <= 0) return res.status(400).json({ error: "Invalid amount" });
  next();
}

// GET /api/resource
app.get("/api/resource", validateResource, async (req, res) => {
  const session = (req.query.session as string) || `demo_${Date.now()}`;
  const merchantId = (req.query.merchantId as string) || "demo_merchant";
  const amount = parseFloat((req.query.amount as string) || "0.5");

  await Tip.create({
    session,
    merchantId,
    amount: amount.toString(),
    currency: "USDC",
    status: "pending",
    created_at: new Date(),
  });

  const payload = buildPaymentPayload(session, merchantId, amount);
  (payload as any).ai_suggestion = suggestTip(amount);
  res.status(402).json(payload);
});

// POST /api/verify
app.post("/api/verify", async (req, res) => {
  const { session, tx_hash } = req.body as {
    session?: string;
    tx_hash?: string;
  };

  if (!session) return res.status(400).json({ error: "Missing session" });
  if (!tx_hash) return res.status(400).json({ error: "Missing tx_hash" });

  const tip = await Tip.findOne({ where: { session } });
  if (!tip) return res.status(404).json({ error: "Tip session not found" });

  const recipient =
    process.env.RECIPIENT_WALLET ||
    "seFkxFkXEY9JGEpCyPfCWTuPZG9WK6ucf95zvKCfsRX";
  const expectedAmount = parseFloat(tip.amount);

  const result = await verifyTransaction(tx_hash, expectedAmount, recipient);
  const verified = result.ok;

  tip.status = verified ? "confirmed" : "failed";
  tip.tx_hash = tx_hash;
  await tip.save();

  const digest = generateDigest({
    session,
    amount: tip.amount,
    tx_hash: tip.tx_hash,
  });
  const anchorTx = await anchorDigest(digest);

  res.json({
    status: tip.status,
    receipt_id: generateReceiptId(session),
    digest,
    anchorTx,
    verificationDetails: result.details,
  });
});

// Merchant tips
app.get("/api/merchant/:id/tips", async (req, res) => {
  const merchantId = req.params.id;
  const tips = await Tip.findAll({ where: { merchantId } });
  res.json({ tips });
});

// Split calculation
app.get("/api/merchant/:id/split", (req, res) => {
  const total = parseFloat((req.query.total as string) || "0") || 0;
  const split = {
    FOH: +(total * 0.6).toFixed(2),
    BOH: +(total * 0.3).toFixed(2),
    Bar: +(total * 0.1).toFixed(2),
  };
  const digest = generateDigest(split);
  res.json({ total, split, digest });
});

// Health
app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

// --- TEST HARNESS (Optional) ---
// Call this endpoint to simulate a tip flow on the backend without frontend
app.get("/api/test-flow", async (_req, res) => {
  const session = `test_${Date.now()}`;
  const merchantId = "demo_merchant";
  const amount = 0.5;

  // Step 1: create tip
  const tip = await Tip.create({
    session,
    merchantId,
    amount: amount.toString(),
    currency: "USDC",
    status: "pending",
    created_at: new Date(),
  });

  // Step 2: build payment payload
  const payload = buildPaymentPayload(session, merchantId, amount);
  (payload as any).ai_suggestion = suggestTip(amount);

  res.json({
    message: "Simulated backend tip flow",
    session,
    tip,
    payload,
  });
});

// Start server after DB init
initDB()
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Backend running on http://localhost:${PORT}`)
    )
  )
  .catch((err) => {
    console.error("Failed to start server:", err);
    process.exit(1);
  });
