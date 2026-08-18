import React, { useState, useEffect } from 'react'
import { getBills, markBillPaid, togglePenalty } from '../../services/billingApi'

const PENALTY_RATE = 0.1

const BillsList = () => {
  const [bills, setBills] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    getBills().then(setBills).catch(() => {})
  }, [])

  const isOverdue = (bill) => bill.payment_status !== 'Paid' && new Date(bill.due_date) < new Date()

  const displayAmount = (bill) => {
    const base = Number(bill.amount_due)
    const penalized = isOverdue(bill) || bill.penalty_applied
    return penalized ? Math.round(base * (1 + PENALTY_RATE)) : base
  }

  const handleMarkPaid = async (id) => {
    try {
      const updated = await markBillPaid(id)
      setBills(bills.map((b) => (b._id === id ? updated : b)))
    } catch (err) {
      setError('Could not mark bill as paid')
    }
  }

  const handleTogglePenalty = async (bill) => {
    try {
      const updated = await togglePenalty(bill._id, !bill.penalty_applied)
      setBills(bills.map((b) => (b._id === bill._id ? updated : b)))
    } catch (err) {
      setError('Could not update penalty')
    }
  }

  const paidCount = bills.filter((b) => b.payment_status === 'Paid').length
  const overdueCount = bills.filter((b) => isOverdue(b)).length
  const pendingCount = bills.length - paidCount - overdueCount
  const totalCollected = bills.filter((b) => b.payment_status === 'Paid').reduce((sum, b) => sum + Number(b.amount_due), 0)

  return (
    <div>
      <h2 className="font-heading text-2xl mb-6">Billing</h2>

      <div className="mb-6">
        <h3 className="font-heading text-lg mb-3">Collection Report</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-card border border-border rounded-xl p-4">
            <p className="text-2xl font-heading">Rs. {totalCollected}</p>
            <p className="text-sm text-muted-foreground">Total Collected</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <p className="text-2xl font-heading text-secondary">{paidCount}</p>
            <p className="text-sm text-muted-foreground">Paid</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <p className="text-2xl font-heading">{pendingCount}</p>
            <p className="text-sm text-muted-foreground">Pending</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <p className="text-2xl font-heading text-destructive">{overdueCount}</p>
            <p className="text-sm text-muted-foreground">Overdue (+{PENALTY_RATE * 100}%)</p>
          </div>
        </div>
      </div>

      {error && <p className="text-destructive text-sm mb-4">{error}</p>}

      {bills.length === 0 ? (
        <p className="text-muted-foreground text-sm">No bills generated yet.</p>
      ) : (
        <div className="bg-card border border-border rounded-xl divide-y divide-border">
          {bills.map((b) => {
            const overdue = isOverdue(b)
            const penalized = overdue || b.penalty_applied
            return (
              <div key={b._id} className="p-4 flex justify-between items-center gap-4">
                <div>
                  <p className="font-medium">{b.flat_id ? `Block ${b.flat_id.block_name} - ${b.flat_id.flat_number}` : 'Unknown flat'}</p>
                  <p className="text-xs text-muted-foreground">
                    Rs. {displayAmount(b)} {penalized && <span className="text-destructive">(incl. penalty)</span>} · due {new Date(b.due_date).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`text-xs px-2 py-1 rounded-full ${b.payment_status === 'Paid' ? 'bg-secondary/20 text-secondary' : penalized ? 'bg-destructive/20 text-destructive' : 'bg-muted text-muted-foreground'}`}>
                    {b.payment_status === 'Paid' ? 'Paid' : overdue ? 'Overdue' : b.penalty_applied ? 'Penalized' : 'Pending'}
                  </span>
                  {b.payment_status !== 'Paid' && (
                    <>
                      <button onClick={() => handleTogglePenalty(b)} className="text-xs border border-destructive text-destructive px-3 py-1.5 rounded-lg font-medium">
                        {b.penalty_applied ? 'Remove Penalty' : 'Apply Penalty'}
                      </button>
                      <button onClick={() => handleMarkPaid(b._id)} className="text-xs bg-primary text-primary-foreground px-3 py-1.5 rounded-lg font-medium">
                        Mark as Paid
                      </button>
                    </>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default BillsList