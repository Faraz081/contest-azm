import React, { useState, useEffect } from 'react'
import { getVisitorLogs } from '../services/auditApi'

const AuditLogs = () => {
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getVisitorLogs().then(setLogs).catch(() => {}).finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <h2 className="font-heading text-2xl mb-6">Audit Logs</h2>
      <p className="text-xs text-muted-foreground mb-4">Full visitor entry/exit history across all gates.</p>

      {loading && <p className="text-muted-foreground text-sm">Loading...</p>}
      {!loading && logs.length === 0 && <p className="text-muted-foreground text-sm">No visitor records yet.</p>}

      {logs.length > 0 && (
        <div className="bg-card border border-border rounded-xl divide-y divide-border">
          {logs.map((v) => (
            <div key={v._id} className="p-4 flex justify-between items-center">
              <div>
                <p className="font-medium">{v.visitor_name}</p>
                <p className="text-xs text-muted-foreground">
                  {v.phone} {v.vehicle_number && `· ${v.vehicle_number}`}
                  {v.flat_id && ` · Block ${v.flat_id.block_name} - ${v.flat_id.flat_number}`}
                </p>
              </div>
              <div className="text-right">
                <span className={`text-xs px-2 py-1 rounded-full ${v.status === 'Entered' ? 'bg-secondary/20 text-secondary' : v.status === 'Exited' ? 'bg-muted text-muted-foreground' : 'bg-primary/20 text-primary'}`}>
                  {v.status}
                </span>
                {v.entry_timestamp && <p className="text-xs text-muted-foreground mt-1">{new Date(v.entry_timestamp).toLocaleString()}</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AuditLogs