import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { getGuards, assignGuardTask } from '../../services/securityAdminApi'

const AssignTask = () => {
  const [guards, setGuards] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [assignedTo, setAssignedTo] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    getGuards().then(setGuards).catch(() => {})
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await assignGuardTask(title, description, assignedTo)
      navigate('/dashboard/security')
    } catch (err) {
      setError(err.response?.data?.message || 'Could not assign task')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 className="font-heading text-2xl mb-6">Assign Task</h2>

      <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-6 w-full max-w-none flex flex-col gap-4">
        <div className="w-full">
          <label className="text-sm text-muted-foreground">Guard</label>
          <select value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} required className="w-full border border-input rounded-lg px-3 py-2.5 mt-1 bg-background">
            <option value="">Select a guard...</option>
            {guards.map((g) => <option key={g._id} value={g._id}>{g.username}</option>)}
          </select>
        </div>
        <div className="w-full">
          <label className="text-sm text-muted-foreground">Task Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full border border-input rounded-lg px-3 py-2.5 mt-1 bg-background" placeholder="Patrol Block B perimeter" />
        </div>
        <div className="w-full">
          <label className="text-sm text-muted-foreground">Description (optional)</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} className="w-full border border-input rounded-lg px-3 py-2.5 mt-1 bg-background" />
        </div>
        {error && <p className="text-destructive text-sm">{error}</p>}
        <div className="flex justify-end pt-2">
          <button type="submit" disabled={loading} className="bg-primary text-primary-foreground px-4 py-2.5 rounded-lg font-medium min-w-[150px]">
            {loading ? 'Assigning...' : 'Assign Task'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AssignTask
