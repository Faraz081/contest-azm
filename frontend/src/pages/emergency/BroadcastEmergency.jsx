import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { createEmergency } from '../../services/emergencyApi'

const TYPE_OPTIONS = ['Fire', 'Medical', 'Security', 'Maintenance', 'Other']

const BroadcastEmergency = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState('Other')
  const [location, setLocation] = useState('')
  const [contact, setContact] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await createEmergency({ title, description, type, location, contact_number: contact })
      navigate('/dashboard/emergency')
    } catch (err) {
      setError(err.response?.data?.message || 'Could not broadcast emergency')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 className="font-heading text-2xl mb-6">Broadcast Emergency</h2>

      <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-6 w-full max-w-none flex flex-col gap-4">
        <div className="w-full">
          <label className="text-sm text-muted-foreground">Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full border border-input rounded-lg px-3 py-2.5 mt-1 bg-background" placeholder="Fire in Block B" />
        </div>
        <div className="w-full">
          <label className="text-sm text-muted-foreground">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required rows={3} className="w-full border border-input rounded-lg px-3 py-2.5 mt-1 bg-background" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <div>
            <label className="text-sm text-muted-foreground">Type</label>
            <select value={type} onChange={(e) => setType(e.target.value)} className="w-full border border-input rounded-lg px-3 py-2.5 mt-1 bg-background">
              {TYPE_OPTIONS.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Location</label>
            <input value={location} onChange={(e) => setLocation(e.target.value)} className="w-full border border-input rounded-lg px-3 py-2.5 mt-1 bg-background" placeholder="Block B, 3rd floor" />
          </div>
        </div>
        <div className="w-full">
          <label className="text-sm text-muted-foreground">Contact Number</label>
          <input value={contact} onChange={(e) => setContact(e.target.value)} className="w-full border border-input rounded-lg px-3 py-2.5 mt-1 bg-background" placeholder="Security desk number" />
        </div>
        {error && <p className="text-destructive text-sm">{error}</p>}
        <div className="flex justify-end pt-2">
          <button type="submit" disabled={loading} className="bg-primary text-primary-foreground px-4 py-2.5 rounded-lg font-medium min-w-[200px]">
            {loading ? 'Broadcasting...' : 'Broadcast Emergency'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default BroadcastEmergency
