"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Alert, AlertDescription } from "../../components/ui/alert"
import { Skeleton } from "../../components/ui/skeleton"
import { Badge } from "../../components/ui/badge"
import { TipSplitCalculator } from "../../components/tipsplitcalculator"
import { Store, DollarSign, Hash, AlertCircle, CheckCircle2, Clock } from "lucide-react"
import Link from "next/link"

interface Tip {
  id: string
  amount: number
  status: string
  txHash: string | null
  timestamp: string
}

export default function MerchantDashboard() {
  const params = useParams()
  const merchantId = params.merchantId as string
  const [tips, setTips] = useState<Tip[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchTips()
  }, [merchantId])

  const fetchTips = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch(`/api/merchant/${merchantId}/tips`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch tips')
      }
      
      const data = await response.json()
      setTips(data.tips || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'verified':
      case 'completed':
        return <CheckCircle2 className="h-4 w-4" />
      case 'pending':
        return <Clock className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status.toLowerCase()) {
      case 'verified':
      case 'completed':
        return 'default'
      case 'pending':
        return 'secondary'
      default:
        return 'outline'
    }
  }

  const totalTips = tips.reduce((sum, tip) => sum + tip.amount, 0)
  const verifiedTips = tips.filter(t => t.status.toLowerCase() === 'verified' || t.status.toLowerCase() === 'completed')

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-block">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Merchant Dashboard
            </h1>
          </Link>
          <p className="text-muted-foreground">Manage your tips and payments</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Store className="h-5 w-5" />
              Merchant: {merchantId}
            </CardTitle>
            <CardDescription>View and manage all tips for this merchant</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 rounded-lg">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-1">
                  <DollarSign className="h-4 w-4" />
                  <span className="text-sm font-medium">Total Tips</span>
                </div>
                <p className="text-3xl font-bold">${totalTips.toFixed(2)}</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 rounded-lg">
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400 mb-1">
                  <CheckCircle2 className="h-4 w-4" />
                  <span className="text-sm font-medium">Verified</span>
                </div>
                <p className="text-3xl font-bold">{verifiedTips.length}</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20 rounded-lg">
                <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 mb-1">
                  <Hash className="h-4 w-4" />
                  <span className="text-sm font-medium">Total Tips</span>
                </div>
                <p className="text-3xl font-bold">{tips.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Tips</CardTitle>
              <CardDescription>All tip transactions for this merchant</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="p-4 border rounded-lg space-y-2">
                      <Skeleton className="h-4 w-1/4" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                  ))}
                </div>
              ) : error ? (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    {error}
                    <button onClick={fetchTips} className="ml-4 text-blue-500">
                      Retry
                    </button>
                  </AlertDescription>
                </Alert>
              ) : tips.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <DollarSign className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No tips yet</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[500px] overflow-y-auto">
                  {tips.map((tip) => (
                    <div
                      key={tip.id}
                      className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-semibold text-lg">${tip.amount.toFixed(2)}</p>
                          <p className="text-xs text-muted-foreground">ID: {tip.id}</p>
                        </div>
                        <Badge variant={getStatusVariant(tip.status)} className="flex items-center gap-1">
                          {getStatusIcon(tip.status)}
                          {tip.status}
                        </Badge>
                      </div>
                      {tip.txHash ? (
                        <div className="mt-2">
                          <p className="text-xs text-muted-foreground mb-1">Transaction Hash:</p>
                          <p className="text-xs font-mono bg-muted p-2 rounded break-all">
                            {tip.txHash}
                          </p>
                        </div>
                      ) : (
                        <p className="text-xs text-muted-foreground mt-2">No transaction hash</p>
                      )}
                      {tip.timestamp && (
                        <p className="text-xs text-muted-foreground mt-2">
                          {new Date(tip.timestamp).toLocaleString()}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <TipSplitCalculator merchantId={merchantId} />
        </div>
      </div>
    </div>
  )
}
