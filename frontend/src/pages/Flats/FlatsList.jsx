import React, { useState, useEffect } from 'react'
import { getFlats, updateFlat, deleteFlat } from '../../services/flatApi'

const FlatsList = () => {
  const [flats, setFlats] = useState([])
  const [error, setError] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editOccupancy, setEditOccupancy] = useState('Owner')

  useEffect(() => {
    getFlats().then(setFlats).catch(() => {})
  }, [])

  const startEdit = (f) => {
    setEditingId(f._id)
    setEditOccupancy(f.occupancy_type)
  }

  const saveEdit = async (id) => {
    try {
      const updated = await updateFlat(id, { occupancy_type: editOccupancy })
      setFlats(flats.map((f) => (f._id === id ? updated : f)))
      setEditingId(null)
    } catch (err) {
      setError('Could not update flat')
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this flat? This cannot be undone.')) return
    try {
      await deleteFlat(id)
      setFlats(flats.filter((f) => f._id !== id))
    } catch (err) {
      setError(err.response?.data?.message || 'Could not delete flat')
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-2xl">Flats & Occupancy</h2>
        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">{flats.length} Flats</span>
      </div>

      {error && <p className="text-destructive text-sm mb-4">{error}</p>}

      {flats.length === 0 ? (
        <p className="text-muted-foreground text-sm">No flats added yet.</p>
      ) : (
        <div className="bg-card border border-border rounded-xl divide-y divide-border">
          {flats.map((f) => (
            <div key={f._id} className="p-4 flex justify-between items-center gap-4">
              <span className="font-medium">Block {f.block_name} - {f.flat_number}</span>

              {editingId === f._id ? (
                <div className="flex items-center gap-2">
                  <select value={editOccupancy} onChange={(e) => setEditOccupancy(e.target.value)} className="border border-input rounded-lg px-2 py-1.5 text-xs bg-background">
                    <option value="Owner">Owner</option>
                    <option value="Tenant">Tenant</option>
                  </select>
                  <button onClick={() => saveEdit(f._id)} className="text-xs bg-primary text-primary-foreground px-3 py-1.5 rounded-lg font-medium">Save</button>
                  <button onClick={() => setEditingId(null)} className="text-xs text-muted-foreground px-2">Cancel</button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">{f.occupancy_type}</span>
                  <button onClick={() => startEdit(f)} className="text-xs border border-input px-3 py-1.5 rounded-lg font-medium">Edit</button>
                  <button onClick={() => handleDelete(f._id)} className="text-xs border border-destructive text-destructive px-3 py-1.5 rounded-lg font-medium">Delete</button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default FlatsList