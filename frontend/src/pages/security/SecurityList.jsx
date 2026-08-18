import React, { useState, useEffect } from 'react'
import { getGuards, getGuardTasks } from '../../services/securityAdminApi'

const STATUS_STYLES = {
  Pending: 'bg-muted text-muted-foreground',
  'In-Progress': 'bg-primary/20 text-primary',
  Completed: 'bg-secondary/20 text-secondary',
}

const SecurityList = () => {
  const [guards, setGuards] = useState([])
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    getGuards().then(setGuards).catch(() => {})
    getGuardTasks().then(setTasks).catch(() => {})
  }, [])

  return (
    <div>
      <h2 className="font-heading text-2xl mb-6">Security</h2>

      <div className="mb-6">
        <h3 className="font-heading text-lg mb-3">Guards on Duty</h3>
        {guards.length === 0 ? (
          <p className="text-muted-foreground text-sm">No guard accounts found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {guards.map((g) => {
              const guardTasks = tasks.filter((t) => t.assigned_to?._id === g._id)
              const active = guardTasks.filter((t) => t.status !== 'Completed').length
              return (
                <div key={g._id} className="bg-card border border-border rounded-xl p-4">
                  <p className="font-medium">{g.username}</p>
                  <p className="text-xs text-muted-foreground mt-1">{active} active task{active !== 1 ? 's' : ''} · {guardTasks.length} total</p>
                </div>
              )
            })}
          </div>
        )}
      </div>

      <div>
        <h3 className="font-heading text-lg mb-3">All Tasks</h3>
        {tasks.length === 0 ? (
          <p className="text-muted-foreground text-sm">No tasks assigned yet.</p>
        ) : (
          <div className="bg-card border border-border rounded-xl divide-y divide-border">
            {tasks.map((t) => (
              <div key={t._id} className="p-4 flex justify-between items-start gap-4">
                <div>
                  <p className="font-medium">{t.title}</p>
                  {t.description && <p className="text-sm text-muted-foreground mt-1">{t.description}</p>}
                  <p className="text-xs text-muted-foreground mt-2">Assigned to {t.assigned_to?.username || 'Unknown'} · {new Date(t.createdAt).toLocaleString()}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full shrink-0 ${STATUS_STYLES[t.status] || STATUS_STYLES.Pending}`}>{t.status}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default SecurityList