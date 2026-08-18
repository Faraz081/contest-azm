import React, { useState, useEffect } from 'react'
import { logWalkIn } from '../../services/guardApi'
import { getFlats } from '../../services/flatApi'

const VisitorEntry = () => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [vehicle, setVehicle] = useState('')
  const [flatId, setFlatId] = useState('')
  const [flats, setFlats] = useState([])
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getFlats().then(setFlats).catch(() => {})
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      await logWalkIn(name, phone, vehicle, flatId)

      setSuccess('Visitor entry logged successfully.')

      setName('')
      setPhone('')
      setVehicle('')
      setFlatId('')
    } catch (err) {
      setError(
        err.response?.data?.message || 'Could not log entry'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 className="font-heading text-2xl mb-6">
        Visitor Entry
      </h2>

      <p className="text-xs text-muted-foreground mb-4">
        Log a walk-in visitor without a pre-approved pass.
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-card border border-border rounded-xl p-6 w-full flex flex-col gap-3"
      >
        <div>
          <label className="text-sm text-muted-foreground">
            Visitor Name
          </label>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border border-input rounded-lg px-3 py-2 mt-1 bg-background"
          />
        </div>

        <div>
          <label className="text-sm text-muted-foreground">
            Phone
          </label>

          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full border border-input rounded-lg px-3 py-2 mt-1 bg-background"
          />
        </div>

        <div>
          <label className="text-sm text-muted-foreground">
            Vehicle Number (optional)
          </label>

          <input
            value={vehicle}
            onChange={(e) => setVehicle(e.target.value)}
            className="w-full border border-input rounded-lg px-3 py-2 mt-1 bg-background"
          />
        </div>

        <div>
          <label className="text-sm text-muted-foreground">
            Visiting Flat
          </label>

          <select
            value={flatId}
            onChange={(e) => setFlatId(e.target.value)}
            required
            className="w-full border border-input rounded-lg px-3 py-2 mt-1 bg-background"
          >
            <option value="">Select a flat...</option>

            {flats.map((f) => (
              <option key={f._id} value={f._id}>
                Block {f.block_name} - {f.flat_number}
              </option>
            ))}
          </select>
        </div>

        {error && (
          <p className="text-destructive text-sm">
            {error}
          </p>
        )}

        {success && (
          <p className="text-secondary text-sm">
            {success}
          </p>
        )}

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium"
          >
            {loading ? 'Logging...' : 'Log Entry'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default VisitorEntry