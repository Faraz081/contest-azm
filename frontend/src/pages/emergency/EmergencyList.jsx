import React, { useState, useEffect } from 'react'
import { getEmergencies, updateEmergency } from '../../services/emergencyApi'

const EmergencyList = () => {
  const [emergencies, setEmergencies] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    getEmergencies().then(setEmergencies).catch(() => {})
  }, [])

  const handleResolve = async (id) => {
    try {
      const updated = await updateEmergency(id, { status: 'Resolved' })
      setEmergencies(emergencies.map((e) => (e._id === id ? updated : e)))
    } catch (err) {
      setError('Could not update emergency')
    }
  }

  return (
    <div>
      <h2 className="font-heading text-2xl mb-6">Emergency Alerts</h2>

      {error && <p className="text-destructive text-sm mb-4">{error}</p>}

      {emergencies.length === 0 ? (
        <p className="text-muted-foreground text-sm">No emergencies broadcast yet.</p>
      ) : (
        <div className="bg-card border border-border rounded-xl divide-y divide-border">
          {emergencies.map((e) => (
            <div key={e._id} className="p-4 flex justify-between items-start gap-4">
              <div>
                <p className="font-medium">{e.title} <span className="text-xs text-muted-foreground">({e.type})</span></p>
                <p className="text-sm text-muted-foreground mt-1">{e.description}</p>
                <p className="text-xs text-muted-foreground mt-1">{e.location} {e.contact_number && `· ${e.contact_number}`} · {new Date(e.createdAt).toLocaleString()}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className={`text-xs px-2 py-1 rounded-full ${e.status === 'Active' ? 'bg-destructive/20 text-destructive' : 'bg-muted text-muted-foreground'}`}>{e.status}</span>
                {e.status === 'Active' && (
                  <button onClick={() => handleResolve(e._id)} className="text-xs bg-primary text-primary-foreground px-3 py-1.5 rounded-lg font-medium">Mark Resolved</button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default EmergencyList