import React, { useState, useEffect } from 'react'
import { getResidents, updateResident, deleteResident } from '../../services/residentApi'
import { getFlats } from '../../services/flatApi'

const ResidentsList = () => {
  const [residents, setResidents] = useState([])
  const [flats, setFlats] = useState([])
  const [error, setError] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editFlatId, setEditFlatId] = useState('')

  useEffect(() => {
    getFlats().then(setFlats).catch(() => {})
    getResidents().then(setResidents).catch(() => {})
  }, [])

  const occupiedFlats = residents.map((r) => r.flat_id?._id)

  const startEdit = (r) => {
    setEditingId(r._id)
    setEditFlatId(r.flat_id?._id || '')
    setError('')
  }

  const saveEdit = async (id) => {
    try {
      await updateResident(id, { flat_id: editFlatId })
      setResidents(await getResidents())
      setEditingId(null)
      setError('')
    } catch (err) {
      setError(err.response?.data?.message || 'Could not update resident')
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Offboard this resident? This cannot be undone.')) return
    try {
      await deleteResident(id)
      setResidents(residents.filter((r) => r._id !== id))
    } catch (err) {
      setError(err.response?.data?.message || 'Could not offboard resident')
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-heading text-2xl font-semibold">Residents</h2>
          <p className="text-sm text-muted-foreground">Manage residents and flat assignments</p>
        </div>
        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
          {residents.length} Residents
        </span>
      </div>

      {error && <p className="text-destructive text-sm mb-4">{error}</p>}

      {residents.length === 0 ? (
        <p className="text-muted-foreground text-sm">No residents onboarded yet.</p>
      ) : (
        <div className="space-y-3">
          {residents.map((r) => (
            <div key={r._id} className="bg-card border border-border rounded-xl p-4 flex items-center justify-between gap-4 hover:shadow-sm transition">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold">
                  {r.username?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-medium">{r.username}</p>
                  <p className="text-sm text-muted-foreground">
                    {r.flat_id ? `Block ${r.flat_id.block_name} - ${r.flat_id.flat_number}` : 'No flat linked'}
                  </p>
                </div>
              </div>

              {editingId === r._id ? (
                <div className="flex gap-2">
                  <select value={editFlatId} onChange={(e) => setEditFlatId(e.target.value)} className="border border-input rounded-lg px-2 py-1.5 text-xs bg-background">
                    {flats
                      .filter((f) => !occupiedFlats.includes(f._id) || f._id === r.flat_id?._id)
                      .map((f) => (
                        <option key={f._id} value={f._id}>Block {f.block_name} - {f.flat_number}</option>
                      ))}
                  </select>
                  <button onClick={() => saveEdit(r._id)} className="text-xs bg-primary text-primary-foreground px-3 rounded-lg">Save</button>
                  <button onClick={() => { setEditingId(null); setError('') }} className="text-xs text-muted-foreground px-2">Cancel</button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <button onClick={() => startEdit(r)} className="text-xs border border-input px-3 py-1.5 rounded-lg hover:bg-muted">Reassign</button>
                  <button onClick={() => handleDelete(r._id)} className="text-xs border border-destructive text-destructive px-3 py-1.5 rounded-lg hover:bg-destructive/10">Offboard</button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ResidentsList