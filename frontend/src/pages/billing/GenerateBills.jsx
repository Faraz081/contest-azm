import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { generateBills } from '../../services/billingApi'

const GenerateBills = () => {
  const [amount, setAmount] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await generateBills(amount, dueDate)
      navigate('/dashboard/billing')
    } catch (err) {
      setError(err.response?.data?.message || 'Could not generate bills')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 className="font-heading text-2xl mb-6">Generate Bills</h2>

      <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-6 w-full max-w-none flex flex-col gap-4">
        <div className="w-full">
          <label className="text-sm text-muted-foreground">Amount Due (per flat)</label>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required className="w-full border border-input rounded-lg px-3 py-2.5 mt-1 bg-background" placeholder="2500" />
        </div>
        <div className="w-full">
          <label className="text-sm text-muted-foreground">Due Date</label>
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required className="w-full border border-input rounded-lg px-3 py-2.5 mt-1 bg-background" />
        </div>
        {error && <p className="text-destructive text-sm">{error}</p>}
        <div className="flex justify-end pt-2">
          <button type="submit" disabled={loading} className="bg-primary text-primary-foreground px-4 py-2.5 rounded-lg font-medium min-w-[220px]">
            {loading ? 'Generating...' : 'Generate Bills for All Flats'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default GenerateBills
