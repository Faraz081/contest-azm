import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { createFacility } from '../../services/facilityApi'

const AddFacility = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [timing, setTiming] = useState('')
  const [capacity, setCapacity] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await createFacility({ name, description, location, timing, capacity: Number(capacity) || 0 })
      navigate('/dashboard/facilities')
    } catch (err) {
      setError(err.response?.data?.message || 'Could not add facility')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 className="font-heading text-2xl mb-6">Add Facility</h2>

      <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-6 w-full max-w-none flex flex-col gap-4">
        <div className="w-full">
          <label className="text-sm text-muted-foreground">Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} required className="w-full border border-input rounded-lg px-3 py-2.5 mt-1 bg-background" placeholder="Clubhouse" />
        </div>
        <div className="w-full">
          <label className="text-sm text-muted-foreground">Description</label>
          <input value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border border-input rounded-lg px-3 py-2.5 mt-1 bg-background" placeholder="Indoor lounge with games" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <div>
            <label className="text-sm text-muted-foreground">Location</label>
            <input value={location} onChange={(e) => setLocation(e.target.value)} className="w-full border border-input rounded-lg px-3 py-2.5 mt-1 bg-background" placeholder="Block A Ground Floor" />
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Timing</label>
            <input value={timing} onChange={(e) => setTiming(e.target.value)} className="w-full border border-input rounded-lg px-3 py-2.5 mt-1 bg-background" placeholder="6 AM - 10 PM" />
          </div>
        </div>
        <div className="w-full">
          <label className="text-sm text-muted-foreground">Capacity</label>
          <input type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)} className="w-full border border-input rounded-lg px-3 py-2.5 mt-1 bg-background" placeholder="20" />
        </div>
        {error && <p className="text-destructive text-sm">{error}</p>}
        <div className="flex justify-end pt-2">
          <button type="submit" disabled={loading} className="bg-primary text-primary-foreground px-4 py-2.5 rounded-lg font-medium min-w-[150px]">
            {loading ? 'Adding...' : 'Add Facility'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddFacility
