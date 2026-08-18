import React, { useState, useEffect } from 'react'
import { getEmergenciesForGuard } from '../../services/guardApi'

const SecurityAlerts = () => {
  const [alerts, setAlerts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getEmergenciesForGuard().then(setAlerts).catch(() => {}).finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <h2 className="font-heading text-2xl mb-6">Security Alerts</h2>

      {loading && <p className="text-muted-foreground text-sm">Loading...</p>}
      {!loading && alerts.length === 0 && <p className="text-muted-foreground text-sm">No active alerts.</p>}

      {alerts.length > 0 && (
        <div className="bg-card border border-border rounded-xl divide-y divide-border">
          {alerts.map((e) => (
            <div key={e._id} className="p-4">
              <div className="flex justify-between items-start">
                <p className="font-medium">{e.title} <span className="text-xs text-muted-foreground">({e.type})</span></p>
                <span className={`text-xs px-2 py-1 rounded-full ${e.status === 'Active' ? 'bg-destructive/20 text-destructive' : 'bg-muted text-muted-foreground'}`}>{e.status}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{e.description}</p>
              <p className="text-xs text-muted-foreground mt-1">{e.location} {e.contact_number && `· ${e.contact_number}`} · {new Date(e.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SecurityAlerts