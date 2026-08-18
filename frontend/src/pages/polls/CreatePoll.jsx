import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { createPoll } from '../../services/pollApi'

const CreatePoll = () => {
  const [question, setQuestion] = useState('')
  const [options, setOptions] = useState(['', ''])
  const [expiresAt, setExpiresAt] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const updateOption = (i, value) => {
    const copy = [...options]
    copy[i] = value
    setOptions(copy)
  }

  const addOption = () => setOptions([...options, ''])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    const cleanOptions = options.map((o) => o.trim()).filter(Boolean)
    if (cleanOptions.length < 2) {
      setError('At least 2 options are required.')
      return
    }
    setLoading(true)
    try {
      await createPoll(question, cleanOptions, expiresAt)
      navigate('/dashboard/polls')
    } catch (err) {
      setError(err.response?.data?.message || 'Could not create poll')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 className="font-heading text-2xl mb-6">Create Poll</h2>

      <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-6 w-full max-w-none flex flex-col gap-4">
        <div className="w-full">
          <label className="text-sm text-muted-foreground">Question</label>
          <input value={question} onChange={(e) => setQuestion(e.target.value)} required className="w-full border border-input rounded-lg px-3 py-2.5 mt-1 bg-background" placeholder="Should we install a new gym?" />
        </div>
        <div className="w-full space-y-2">
          <label className="text-sm text-muted-foreground">Options</label>
          {options.map((opt, i) => (
            <input key={i} value={opt} onChange={(e) => updateOption(i, e.target.value)} className="w-full border border-input rounded-lg px-3 py-2.5 mt-1 bg-background" placeholder={`Option ${i + 1}`} />
          ))}
          <button type="button" onClick={addOption} className="text-xs text-primary mt-2">+ Add another option</button>
        </div>
        <div className="w-full">
          <label className="text-sm text-muted-foreground">Expires On (optional)</label>
          <input type="date" value={expiresAt} onChange={(e) => setExpiresAt(e.target.value)} className="w-full border border-input rounded-lg px-3 py-2.5 mt-1 bg-background" />
        </div>
        {error && <p className="text-destructive text-sm">{error}</p>}
        <div className="flex justify-end pt-2">
          <button type="submit" disabled={loading} className="bg-primary text-primary-foreground px-4 py-2.5 rounded-lg font-medium min-w-[150px]">
            {loading ? 'Creating...' : 'Create Poll'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreatePoll
