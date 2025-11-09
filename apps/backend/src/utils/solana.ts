import {
  Connection,
  PublicKey,
  Transaction,
  Keypair,
  TransactionInstruction,
  ParsedInstruction,
  PartiallyDecodedInstruction,
  Signer,
} from "@solana/web3.js";
import dotenv from "dotenv";

dotenv.config();

const RPC_URL = process.env.SOLANA_RPC || "https://api.devnet.solana.com";
export const connection = new Connection(RPC_URL, { commitment: "confirmed" });

// Devnet USDC mint
export const USDC_MINT = new PublicKey(
  process.env.USDC_MINT || "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU"
);

/**
 * Verify transaction: ensure recipient received at least expectedAmount of USDC
 */
export async function verifyTransaction(
  txSig: string,
  expectedAmount: number,
  recipientWallet: string
): Promise<{ ok: boolean; details?: any }> {
  try {
    if (!txSig) return { ok: false, details: "Missing txSig" };

    // Use parsed transaction for safe instruction access
    const tx = await connection.getParsedTransaction(txSig, "confirmed");
    if (!tx) return { ok: false, details: "Transaction not found (yet)" };

    const expectedAtomic = BigInt(Math.round(expectedAmount * 1_000_000));
    const post = tx.meta?.postTokenBalances ?? [];
    const pre = tx.meta?.preTokenBalances ?? [];

    let receivedAtomic = BigInt(0);

    // Check post/pre token balances first
    for (const postEntry of post) {
      const preEntry = pre.find(
        (p) => p.accountIndex === postEntry.accountIndex
      );
      const postAmt = BigInt(postEntry.uiTokenAmount.amount || "0");
      const preAmt = BigInt(preEntry?.uiTokenAmount.amount || "0");
      if (postEntry.owner === recipientWallet && postAmt > preAmt) {
        receivedAtomic += postAmt - preAmt;
      }
    }

    // Fallback: parse parsed instructions (SPL token transfer)
    if (receivedAtomic === BigInt(0) && tx.transaction.message.instructions) {
      const instructions = tx.transaction.message
        .instructions as ParsedInstruction[];
      for (const ix of instructions) {
        try {
          if (
            ix.parsed?.type === "transfer" &&
            ix.parsed.info?.destination === recipientWallet
          ) {
            receivedAtomic += expectedAtomic;
          }
        } catch {}
      }
    }

    return {
      ok: receivedAtomic >= expectedAtomic,
      details: {
        receivedAtomic: receivedAtomic.toString(),
        expectedAtomic: expectedAtomic.toString(),
      },
    };
  } catch (err) {
    console.error("verifyTransaction error:", err);
    return { ok: false, details: (err as Error).message };
  }
}

/**
 * Anchor a digest on-chain using a service keypair (Memo program)
 */
export async function anchorDigest(digest: string): Promise<string | null> {
  try {
    const serviceSecret = process.env.SERVICE_SECRET_KEY;
    if (!serviceSecret) {
      console.log("No SERVICE_SECRET_KEY; skipping anchor.");
      return null;
    }

    const arr = JSON.parse(serviceSecret) as number[];
    const keypair = Keypair.fromSecretKey(Uint8Array.from(arr));

    const memoProgramId = new PublicKey(
      "MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr"
    );
    const ix = new TransactionInstruction({
      programId: memoProgramId,
      keys: [],
      data: Buffer.from(digest),
    });

    const tx = new Transaction().add(ix);
    tx.feePayer = keypair.publicKey;
    const { blockhash } = await connection.getLatestBlockhash();
    tx.recentBlockhash = blockhash;

    // ✅ Correct: pass single signer directly
    tx.sign(keypair as Signer);

    const raw = tx.serialize();
    const sig = await connection.sendRawTransaction(raw, {
      skipPreflight: false,
    });
    await connection.confirmTransaction(sig, "confirmed");

    return sig;
  } catch (err) {
    console.error("anchorDigest error:", err);
    return null;
  }
}
