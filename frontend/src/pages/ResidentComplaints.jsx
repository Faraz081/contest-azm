import React, { useState } from 'react'
import api from '../services/api'

const CATEGORY_OPTIONS = ['Plumbing', 'Electrical', 'Security', 'Cleanliness', 'Noise', 'Other']

const ResidentComplaints = () => {
  const [category, setCategory] = useState('Other')
  const [description, setDescription] = useState('')
  const [photo, setPhoto] = useState(null)
  const [submitted, setSubmitted] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('category', category)
      formData.append('description', description)
      if (photo) formData.append('photo', photo)

      const res = await api.post('/resident/complaints', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      setSubmitted([res.data.data, ...submitted])
      setDescription('')
      setPhoto(null)
    } catch (err) {
      setError(err.response?.data?.message || 'Could not submit complaint')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 className="font-heading text-2xl mb-6">Complaints</h2>

      <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-6 mb-6 max-w-lg flex flex-col gap-3">
        <div>
          <label className="text-sm text-muted-foreground">Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full border border-input rounded-lg px-3 py-2 mt-1 bg-background">
            {CATEGORY_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="text-sm text-muted-foreground">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required rows={3} className="w-full border border-input rounded-lg px-3 py-2 mt-1 bg-background" />
        </div>
        <div>
          <label className="text-sm text-muted-foreground">Photo (optional)</label>
          <input type="file" accept="image/*" onChange={(e) => setPhoto(e.target.files[0])} className="w-full text-sm mt-1" />
        </div>

        {error && <p className="text-destructive text-sm">{error}</p>}

        <button type="submit" disabled={loading} className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium self-start">
          {loading ? 'Submitting...' : 'Submit Complaint'}
        </button>
      </form>

      {submitted.length > 0 && (
        <div className="bg-card border border-border rounded-xl divide-y divide-border">
          {submitted.map((c) => (
            <div key={c._id} className="p-4">
              <p className="font-medium">{c.category}</p>
              <p className="text-sm text-muted-foreground mt-1">{c.description}</p>
              <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground mt-2 inline-block">{c.status}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ResidentComplaints