import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { onboardResident, getResidents } from '../../services/residentApi'
import { getFlats } from '../../services/flatApi'

const AddResident = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [flatId, setFlatId] = useState('')
  const [flats, setFlats] = useState([])
  const [residents, setResidents] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    getFlats().then(setFlats).catch(() => {})
    getResidents().then(setResidents).catch(() => {})
  }, [])

  const occupiedFlats = residents.map((r) => r.flat_id?._id)
  const availableFlats = flats.filter((f) => !occupiedFlats.includes(f._id))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await onboardResident(username, password, flatId)
      navigate('/dashboard/residents')
    } catch (err) {
      setError(err.response?.data?.message || 'Could not onboard resident')
    } finally {
      setLoading(false)
    }
  }

  return (
  <div>
  <h2 className="font-heading text-2xl font-semibold mb-1">
    Add Resident
  </h2>

  <p className="text-sm text-muted-foreground mb-6">
    Onboard a new resident and link them to a flat
  </p>

  <form
    onSubmit={handleSubmit}
    className="bg-card border border-border rounded-2xl p-6 w-full max-w-none flex flex-col gap-4 shadow-sm"
  >
    <div className="w-full">
      <label className="text-sm text-muted-foreground">Username</label>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        className="w-full border border-input rounded-lg px-3 py-2.5 mt-1 bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
      />
    </div>

    <div className="w-full">
      <label className="text-sm text-muted-foreground">Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full border border-input rounded-lg px-3 py-2.5 mt-1 bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
      />
    </div>

    <div className="w-full">
      <label className="text-sm text-muted-foreground">Flat</label>
      <select
        value={flatId}
        onChange={(e) => setFlatId(e.target.value)}
        required
        className="w-full border border-input rounded-lg px-3 py-2.5 mt-1 bg-background"
      >
        <option value="">Select a flat...</option>

        {availableFlats.map((f) => (
          <option key={f._id} value={f._id}>
            Block {f.block_name} - {f.flat_number}
          </option>
        ))}
      </select>

      {availableFlats.length === 0 && (
        <p className="text-xs text-muted-foreground mt-1">
          No available flats.
        </p>
      )}
    </div>

    {error && (
      <p className="text-destructive text-sm">
        {error}
      </p>
    )}

    <div className="flex justify-end pt-2">
      <button
        type="submit"
        disabled={loading}
        className="bg-primary text-primary-foreground px-4 py-2.5 rounded-lg font-medium hover:opacity-90 transition min-w-[180px]"
      >
        {loading ? 'Onboarding...' : 'Onboard Resident'}
      </button>
    </div>
  </form>
</div>
  )
}

export default AddResident
