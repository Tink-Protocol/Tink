import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// --- Types ---
interface Tip {
  session: string;
  merchantId: string;
  amount: string;
  currency: string;
  status: "pending" | "confirmed" | "failed";
  tx_hash?: string;
  created_at: string;
}

// --- In-memory storage ---
const tips: Record<string, Tip> = {}; // key = session

// --- Utilities ---
function generateReceiptId(session: string) {
  return `r_${session}`;
}

function generateDigest(obj: any) {
  return crypto.createHash("sha256").update(JSON.stringify(obj)).digest("hex");
}

// --- Endpoints ---

// Health check
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ status: "ok" });
});

// GET /api/resource
app.get("/api/resource", (req: Request, res: Response) => {
  const session = (req.query.session as string) || `demo_${Date.now()}`;
  const merchantId = (req.query.merchantId as string) || "demo_merchant";

  const amount = "2.50"; // can be dynamic later
  const currency = "USDC";
  const paymentPayload = {
    code: 402,
    message: "Payment required to view receipt",
    payment: {
      amount,
      currency,
      network: "solana-devnet",
      pay_to: "FKe...walletAddress",
      memo: `tip:${merchantId}:${session}`,
      expires_at: new Date(Date.now() + 3600 * 1000).toISOString(),
    },
    session,
  };

  tips[session] = {
    session,
    merchantId,
    amount,
    currency,
    status: "pending",
    created_at: new Date().toISOString(),
  };

  res.status(402).json(paymentPayload);
});

// POST /api/verify
app.post("/api/verify", (req: Request, res: Response) => {
  const { session, tx_hash } = req.body as {
    session?: string;
    tx_hash?: string;
  };

  if (!session || !tx_hash) {
    return res.status(400).json({ error: "Missing session or tx_hash" });
  }

  const tip = tips[session];
  if (!tip) {
    return res.status(404).json({ error: "Tip session not found" });
  }

  tip.status = "confirmed";
  tip.tx_hash = tx_hash;

  res.json({ status: "confirmed", receipt_id: generateReceiptId(session) });
});

// GET /api/merchant/:id/tips
app.get("/api/merchant/:id/tips", (req: Request, res: Response) => {
  const merchantId = req.params.id;
  const merchantTips = Object.values(tips).filter(
    (t) => t.merchantId === merchantId
  );

  res.json({ tips: merchantTips });
});

// GET /api/merchant/:id/split?total=xx
app.get("/api/merchant/:id/split", (req: Request, res: Response) => {
  const total = parseFloat(req.query.total as string) || 0;

  // Example split: FOH 60%, BOH 30%, Bar 10%
  const split = {
    FOH: +(total * 0.6).toFixed(2),
    BOH: +(total * 0.3).toFixed(2),
    Bar: +(total * 0.1).toFixed(2),
  };

  const digest = generateDigest(split);

  res.json({ total, split, digest });
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
