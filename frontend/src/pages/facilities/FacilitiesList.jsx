import React, { useState, useEffect } from 'react'
import { getFacilities, updateFacility, deleteFacility } from '../../services/facilityApi'

const STATUS_OPTIONS = ['Active', 'Maintenance', 'Closed']

const FacilitiesList = () => {
  const [facilities, setFacilities] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    getFacilities().then(setFacilities).catch(() => {})
  }, [])

  const handleStatusChange = async (id, status) => {
    try {
      const updated = await updateFacility(id, { status })
      setFacilities(facilities.map((f) => (f._id === id ? updated : f)))
    } catch (err) {
      setError('Could not update facility')
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this facility?')) return
    try {
      await deleteFacility(id)
      setFacilities(facilities.filter((f) => f._id !== id))
    } catch (err) {
      setError('Could not delete facility')
    }
  }

  return (
    <div>
      <h2 className="font-heading text-2xl mb-6">Facilities</h2>

      {error && <p className="text-destructive text-sm mb-4">{error}</p>}

      {facilities.length === 0 ? (
        <p className="text-muted-foreground text-sm">No facilities added yet.</p>
      ) : (
        <div className="bg-card border border-border rounded-xl divide-y divide-border">
          {facilities.map((f) => (
            <div key={f._id} className="p-4 flex justify-between items-start gap-4">
              <div>
                <p className="font-medium">{f.name}</p>
                {f.description && <p className="text-sm text-muted-foreground mt-1">{f.description}</p>}
                <p className="text-xs text-muted-foreground mt-2">
                  {f.location && `${f.location} · `}{f.timing && `${f.timing} · `}Capacity: {f.capacity}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <select value={f.status} onChange={(e) => handleStatusChange(f._id, e.target.value)} className="border border-input rounded-lg px-2 py-1.5 text-xs bg-background">
                  {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <button onClick={() => handleDelete(f._id)} className="text-xs border border-destructive text-destructive px-3 py-1.5 rounded-lg font-medium">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default FacilitiesList