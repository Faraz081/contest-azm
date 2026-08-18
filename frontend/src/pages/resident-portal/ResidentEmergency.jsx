import React, { useEffect, useState } from 'react'
import { getResidentEmergencies } from '../../services/emergencyApi'

const ResidentEmergency = () => {
  const [emergencies, setEmergencies] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    getResidentEmergencies()
      .then(setEmergencies)
      .catch((err) => {
        setError(
          err.response?.data?.message ||
          'Could not load emergency alerts'
        )
      })
  }, [])

  return (
    <div>
      <h2 className="font-heading text-2xl mb-6">
        Emergency Alerts
      </h2>

      {error && (
        <p className="text-destructive text-sm mb-4">
          {error}
        </p>
      )}

      {emergencies.length === 0 ? (
        <div className="bg-card border border-border rounded-xl p-6">
          <p className="text-muted-foreground">
            No active emergency alerts.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {emergencies.map((emergency) => (
            <div
              key={emergency._id}
              className="bg-card border border-border rounded-xl p-5"
            >
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h3 className="font-medium text-lg">
                    {emergency.title}
                  </h3>

                  <p className="text-sm text-muted-foreground mt-2">
                    {emergency.description}
                  </p>
                </div>

                <span className="text-xs px-2.5 py-1 rounded-full bg-destructive/20 text-destructive">
                  {emergency.type}
                </span>
              </div>

              {emergency.location && (
                <p className="text-sm mt-4">
                  <strong>Location:</strong> {emergency.location}
                </p>
              )}

              {emergency.contact_number && (
                <p className="text-sm mt-1">
                  <strong>Contact:</strong> {emergency.contact_number}
                </p>
              )}

              <p className="text-xs text-muted-foreground mt-3">
                {new Date(emergency.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ResidentEmergency