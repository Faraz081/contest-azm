import React, { useState, useEffect } from 'react'
import { getActiveVisitors } from '../../services/guardApi'

const VisitorLogsGuard = () => {
  const [visitors, setVisitors] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getActiveVisitors().then(setVisitors).catch(() => {}).finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <h2 className="font-heading text-2xl mb-6">Visitor Logs</h2>
      <p className="text-xs text-muted-foreground mb-4">Visitors currently inside the premises.</p>

      {loading && <p className="text-muted-foreground text-sm">Loading...</p>}
      {!loading && visitors.length === 0 && <p className="text-muted-foreground text-sm">No visitors currently inside.</p>}

      {visitors.length > 0 && (
        <div className="bg-card border border-border rounded-xl divide-y divide-border">
          {visitors.map((v) => (
            <div key={v._id} className="p-4 flex justify-between items-center">
              <div>
                <p className="font-medium">{v.visitor_name}</p>
                <p className="text-xs text-muted-foreground">
                  {v.phone} {v.vehicle_number && `· ${v.vehicle_number}`}
                  {v.flat_id && ` · Block ${v.flat_id.block_name} - ${v.flat_id.flat_number}`}
                </p>
              </div>
              <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary">
                {v.entry_timestamp && new Date(v.entry_timestamp).toLocaleTimeString()}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default VisitorLogsGuard