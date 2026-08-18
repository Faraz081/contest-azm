import React, { useState, useEffect } from 'react'
import { getVisitorRequests, updateVisitorRequest } from '../services/visitorRequestApi'

const VisitorRequests = () => {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [actingId, setActingId] = useState(null)

  useEffect(() => {
    loadRequests()
  }, [])

  const loadRequests = () => {
    setLoading(true)
    getVisitorRequests()
      .then(setRequests)
      .catch(() => setError('Could not load visitor requests'))
      .finally(() => setLoading(false))
  }

  const handleDecision = async (id, status) => {
    setActingId(id)
    setError('')
    try {
      await updateVisitorRequest(id, status)
      setRequests(requests.filter((r) => r._id !== id))
    } catch (err) {
      setError('Could not update request')
    } finally {
      setActingId(null)
    }
  }

  return (
    <div>
      <h2 className="font-heading text-2xl mb-6">Visitor Requests</h2>
      <p className="text-xs text-muted-foreground mb-4">Pending visitor pass requests awaiting approval.</p>

      {loading && <p className="text-muted-foreground text-sm">Loading...</p>}
      {error && <p className="text-destructive text-sm mb-4">{error}</p>}
      {!loading && requests.length === 0 && (
        <p className="text-muted-foreground text-sm">No pending requests right now.</p>
      )}

      {requests.length > 0 && (
        <div className="bg-card border border-border rounded-xl divide-y divide-border">
          {requests.map((r) => (
            <div key={r._id} className="p-4 flex justify-between items-center gap-4">
              <div>
                <p className="font-medium">{r.visitor_name}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {r.phone} {r.vehicle_number && `· ${r.vehicle_number}`}
                  {r.flat_id && ` · Block ${r.flat_id.block_name} - ${r.flat_id.flat_number}`}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Requested {new Date(r.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleDecision(r._id, 'Rejected')}
                  disabled={actingId === r._id}
                  className="text-xs border border-destructive text-destructive px-3 py-1.5 rounded-lg font-medium disabled:opacity-50"
                >
                  Reject
                </button>
                <button
                  onClick={() => handleDecision(r._id, 'Pre-Approved')}
                  disabled={actingId === r._id}
                  className="text-xs bg-primary text-primary-foreground px-3 py-1.5 rounded-lg font-medium disabled:opacity-50"
                >
                  Approve
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default VisitorRequests