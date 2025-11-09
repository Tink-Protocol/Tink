"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Label } from "../components/ui/label"  
import { Alert, AlertDescription } from "../components/ui/alert"
import { Skeleton } from "../components/ui/skeleton"
import { CheckCircle2, Wallet, AlertCircle } from "lucide-react"
import Link from "next/link"

interface PaymentDetails {
  amount: number
  merchant: string
  session: string
}

export default function TipPaymentPage() {
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [txHash, setTxHash] = useState("")
  const [verifying, setVerifying] = useState(false)
  const [verificationResult, setVerificationResult] = useState<{ success: boolean; message: string } | null>(null)

  useEffect(() => {
    fetchPaymentDetails()
  }, [])

  const fetchPaymentDetails = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch('/api/resource')
      
      if (!response.ok) {
        throw new Error('Failed to fetch payment details')
      }
      
      const data = await response.json()
      setPaymentDetails(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyPayment = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!txHash.trim()) {
      setVerificationResult({ success: false, message: 'Please enter a transaction hash' })
      return
    }

    try {
      setVerifying(true)
      setVerificationResult(null)
      
      const response = await fetch('/api/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          txHash,
          session: paymentDetails?.session 
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setVerificationResult({ success: true, message: data.message || 'Payment verified successfully!' })
        setTxHash("")
      } else {
        setVerificationResult({ success: false, message: data.error || 'Verification failed' })
      }
    } catch (err) {
      setVerificationResult({ 
        success: false, 
        message: err instanceof Error ? err.message : 'An error occurred during verification' 
      })
    } finally {
      setVerifying(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center space-y-2 mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI Tipping Service
            </h1>
          </Link>
          <p className="text-muted-foreground">Complete your tip payment</p>
        </div>

        {loading ? (
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2 mt-2" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </CardContent>
          </Card>
        ) : error ? (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {error}
              <button onClick={fetchPaymentDetails} className="ml-4 text-blue-500">
                Retry
              </button>
            </AlertDescription>
          </Alert>
        ) : paymentDetails ? (
          <>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="h-5 w-5" />
                  Payment Details
                </CardTitle>
                <CardDescription>Review your tip payment information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                    <span className="text-sm font-medium text-muted-foreground">Amount</span>
                    <span className="text-2xl font-bold">${paymentDetails.amount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                    <span className="text-sm font-medium text-muted-foreground">Merchant</span>
                    <span className="text-lg font-semibold">{paymentDetails.merchant}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                    <span className="text-sm font-medium text-muted-foreground">Session ID</span>
                    <span className="text-sm font-mono">{paymentDetails.session}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Verify Payment</CardTitle>
                <CardDescription>Enter your transaction hash to verify the payment</CardDescription>
              </CardHeader>
              <form onSubmit={handleVerifyPayment}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="txHash">Transaction Hash</Label>
                    <input
                      id="txHash"
                      placeholder="0x..."
                      value={txHash}
                      onChange={(e) => setTxHash(e.target.value)}
                      disabled={verifying}
                    />
                  </div>

                  {verificationResult && (
                    <Alert variant={verificationResult.success ? "default" : "destructive"}>
                      {verificationResult.success ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : (
                        <AlertCircle className="h-4 w-4" />
                      )}
                      <AlertDescription>{verificationResult.message}</AlertDescription>
                    </Alert>
                  )}
                </CardContent>
                <CardFooter>
                  <button type="submit" className="w-full" disabled={verifying}>
                    {verifying ? "Verifying..." : "Verify Payment"}
                  </button>
                </CardFooter>
              </form>
            </Card>
          </>
        ) : null}
      </div>
    </div>
  )
}
