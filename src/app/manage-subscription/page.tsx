"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { ArrowPathIcon, CheckCircleIcon } from "@heroicons/react/24/solid"

export default function ManageSubscription() {
  const searchParams = useSearchParams()
  const subscriptionId = searchParams.get("id")

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!subscriptionId) {
    return (
      <div className="max-w-md mx-auto my-16 p-6 bg-white rounded-md shadow-md">
        <h1 className="text-2xl font-bold mb-4">Subscription Management</h1>
        <p className="text-red-500">No subscription ID provided. Please use the link from your email.</p>
      </div>
    )
  }

  const handleCancelSubscription = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/cancel-subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ subscriptionId }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to cancel subscription")
      }

      setSuccess(true)
    } catch (err: any) {
      setError(err.message || "An error occurred while canceling your subscription")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto my-16 p-6 bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Manage Your Monthly Donation</h1>

      {success ? (
        <div className="text-center py-6">
          <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Subscription Cancelled</h2>
          <p className="mb-4">Your monthly donation has been successfully cancelled.</p>
          <p className="text-sm text-gray-600">Thank you for your support. We hope to see you again in the future!</p>
        </div>
      ) : (
        <>
          <p className="mb-6">
            You can cancel your monthly donation at any time. Your support has been greatly appreciated.
          </p>

          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

          <button
            onClick={handleCancelSubscription}
            disabled={loading}
            className="w-full bg-red-500 text-white py-3 px-6 rounded-sm hover:bg-red-600 transition-all duration-200 disabled:opacity-50"
          >
            {loading ? (
              <div className="flex justify-center items-center">
                <ArrowPathIcon className="h-4 w-4 animate-spin mr-2" />
                Processing...
              </div>
            ) : (
              "Cancel Monthly Donation"
            )}
          </button>

          <p className="mt-4 text-sm text-gray-600">
            If you have any questions or need assistance, please contact our support team.
          </p>
        </>
      )}
    </div>
  )
}
