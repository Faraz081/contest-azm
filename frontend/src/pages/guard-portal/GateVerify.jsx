import React, { useState } from 'react'
import api from '../../services/api'

const GateVerify = () => {
  const [code, setCode] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setResult(null)
    setLoading(true)
    try {
      const res = await api.post('/security/verify-pass', { gate_pass_code: code })
      setResult(res.data)
      setCode('')
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid or already-used code')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 className="font-heading text-2xl mb-6">Gate Verification</h2>

      <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-6 max-w-sm">
        <label className="text-sm text-muted-foreground">6-Digit Gate Pass Code</label>
        <input value={code} onChange={(e) => setCode(e.target.value)} required maxLength={6} className="w-full border border-input rounded-lg px-3 py-2 mb-3 mt-1 bg-background text-center tracking-widest text-lg" />

        {error && <p className="text-destructive text-sm mb-3">{error}</p>}
        {result && <p className="text-secondary text-sm mb-3">Visitor admitted successfully.</p>}

        <button type="submit" disabled={loading} className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-medium">
          {loading ? 'Verifying...' : 'Verify & Admit'}
        </button>
      </form>
    </div>
  )
}

export default GateVerify