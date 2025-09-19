'use client'

import { useState, useEffect } from 'react'

interface Submission {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  eventDate: string
  timestamp: string
  source: string
  ip: string
  submittedAt: string
}

interface SubmissionsData {
  submissions: Submission[]
  totalSubmissions: number
  uniqueEmails: number
  lastUpdated: string
}

export default function AdminPage() {
  const [data, setData] = useState<SubmissionsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSubmissions = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/submissions')
      const result = await response.json()
      
      if (result.success) {
        setData(result.data)
        setError(null)
      } else {
        setError(result.error || 'Failed to fetch submissions')
      }
    } catch (err) {
      setError('Network error')
    } finally {
      setLoading(false)
    }
  }

  const clearSubmissions = async () => {
    if (!confirm('Are you sure you want to clear all submissions? This cannot be undone.')) {
      return
    }

    try {
      const response = await fetch('/api/admin/submissions', {
        method: 'DELETE'
      })
      const result = await response.json()
      
      if (result.success) {
        setData(null)
        alert('All submissions cleared successfully')
      } else {
        alert('Failed to clear submissions')
      }
    } catch (err) {
      alert('Network error')
    }
  }

  useEffect(() => {
    fetchSubmissions()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-primary-dark text-white p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-montserrat font-bold mb-8">Admin Dashboard</h1>
          <div className="text-center">Loading submissions...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-primary-dark text-white p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-montserrat font-bold mb-8">Admin Dashboard</h1>
          <div className="text-red-400">Error: {error}</div>
          <button 
            onClick={fetchSubmissions}
            className="mt-4 px-4 py-2 bg-azure-blue text-white rounded-lg hover:bg-azure-blue/80"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-primary-dark text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-montserrat font-bold">Admin Dashboard</h1>
          <div className="flex gap-4">
            <button 
              onClick={fetchSubmissions}
              className="px-4 py-2 bg-azure-blue text-white rounded-lg hover:bg-azure-blue/80"
            >
              Refresh
            </button>
            <button 
              onClick={clearSubmissions}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Clear All
            </button>
          </div>
        </div>

        {data && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-azure-blue-transparent p-6 rounded-xl border border-azure-blue/20">
                <h3 className="text-lg font-montserrat font-semibold mb-2">Total Submissions</h3>
                <p className="text-3xl font-bold">{data.totalSubmissions}</p>
              </div>
              <div className="bg-orange-transparent p-6 rounded-xl border border-orange/20">
                <h3 className="text-lg font-montserrat font-semibold mb-2">Unique Emails</h3>
                <p className="text-3xl font-bold">{data.uniqueEmails}</p>
              </div>
              <div className="bg-bright-blue-transparent p-6 rounded-xl border border-bright-blue/20">
                <h3 className="text-lg font-montserrat font-semibold mb-2">Last Updated</h3>
                <p className="text-sm">{new Date(data.lastUpdated).toLocaleString()}</p>
              </div>
            </div>

            <div className="bg-azure-blue-transparent rounded-xl border border-azure-blue/20 overflow-hidden">
              <div className="p-6 border-b border-azure-blue/20">
                <h2 className="text-xl font-montserrat font-semibold">Form Submissions</h2>
              </div>
              
              {data.submissions.length === 0 ? (
                <div className="p-8 text-center text-white/70">
                  No submissions yet
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-azure-blue/10">
                      <tr>
                        <th className="p-4 text-left font-montserrat font-semibold">Name</th>
                        <th className="p-4 text-left font-montserrat font-semibold">Email</th>
                        <th className="p-4 text-left font-montserrat font-semibold">Phone</th>
                        <th className="p-4 text-left font-montserrat font-semibold">Event Date</th>
                        <th className="p-4 text-left font-montserrat font-semibold">Submitted</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.submissions.map((submission) => (
                        <tr key={submission.id} className="border-t border-azure-blue/10">
                          <td className="p-4">
                            {submission.firstName} {submission.lastName}
                          </td>
                          <td className="p-4">{submission.email}</td>
                          <td className="p-4">{submission.phone}</td>
                          <td className="p-4">{submission.eventDate}</td>
                          <td className="p-4 text-sm text-white/70">
                            {new Date(submission.submittedAt).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
