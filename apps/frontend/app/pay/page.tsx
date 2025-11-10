"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Transaction, SystemProgram, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, CheckCircle2, AlertCircle, Wallet } from "lucide-react";

function PayPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { publicKey, sendTransaction, connected } = useWallet();
  const { connection } = useConnection();
  
  const [amount, setAmount] = useState<number>(0);
  const [payTo, setPayTo] = useState<string>("");
  const [memo, setMemo] = useState<string>("");
  const [session, setSession] = useState<string>("");
  const [merchantId, setMerchantId] = useState<string>("");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setAmount(parseFloat(searchParams.get("amount") || "0"));
    setPayTo(searchParams.get("pay_to") || "");
    setMemo(searchParams.get("memo") || "");
    setSession(searchParams.get("session") || "");
    setMerchantId(searchParams.get("merchantId") || "");
  }, [searchParams]);

  const handlePayment = async () => {
    if (!publicKey || !connected) {
      setError("Please connect your wallet first");
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      // Create a simple transaction (sending SOL for demo purposes)
      // In production, this would transfer USDC tokens
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey(payTo),
          lamports: Math.floor(amount * LAMPORTS_PER_SOL / 1000) // Convert to small amount for demo
        })
      );

      // Get recent blockhash
      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = publicKey;

      // Send transaction
      const signature = await sendTransaction(transaction, connection);
      
      // Wait for confirmation
      await connection.confirmTransaction(signature, "confirmed");

      // Verify with backend
      const verifyResponse = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session,
          tx_hash: signature
        })
      });

      const verifyData = await verifyResponse.json();

      if (verifyData.status === "confirmed") {
        // Redirect to receipt
        router.push(`/receipt?session=${session}&merchantId=${merchantId}&tx_hash=${signature}`);
      } else {
        setError("Transaction verification failed");
      }
    } catch (err: any) {
      console.error("Payment error:", err);
      setError(err.message || "Payment failed. Please try again.");
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Complete Payment
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Connect your wallet and confirm the transaction
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Payment Summary</CardTitle>
            <CardDescription>Review your tip details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between py-3 border-b">
              <span className="text-gray-600 dark:text-gray-400">Tip Amount</span>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                ${amount.toFixed(2)} USDC
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600 dark:text-gray-400">Recipient</span>
              <span className="text-sm font-mono text-gray-900 dark:text-white">
                {payTo.slice(0, 4)}...{payTo.slice(-4)}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600 dark:text-gray-400">Network</span>
              <span className="text-sm text-gray-900 dark:text-white">Solana Devnet</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600 dark:text-gray-400">Memo</span>
              <span className="text-sm font-mono text-gray-900 dark:text-white">{memo}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="w-5 h-5" />
              Wallet Connection
            </CardTitle>
            <CardDescription>Connect your Phantom wallet to continue</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center">
              <WalletMultiButton className="!bg-purple-600 hover:!bg-purple-700" />
            </div>

            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-red-900 dark:text-red-300">Error</p>
                  <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
                </div>
              </div>
            )}

            {connected && (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-green-900 dark:text-green-300">Wallet Connected</p>
                  <p className="text-sm text-green-700 dark:text-green-400 font-mono">
                    {publicKey?.toBase58().slice(0, 8)}...{publicKey?.toBase58().slice(-8)}
                  </p>
                </div>
              </div>
            )}

            <Button
              className="w-full h-12 text-lg"
              size="lg"
              disabled={!connected || processing || amount <= 0}
              onClick={handlePayment}
            >
              {processing ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Processing Payment...
                </>
              ) : (
                `Pay $${amount.toFixed(2)} USDC`
              )}
            </Button>

            <p className="text-xs text-center text-gray-500 dark:text-gray-400">
              By confirming this payment, you agree to send the tip amount to the merchant.
              This transaction is recorded on the Solana blockchain.
            </p>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <Button variant="ghost" onClick={() => router.back()}>
            ← Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function PayPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    }>
      <PayPageContent />
    </Suspense>
  );
}

