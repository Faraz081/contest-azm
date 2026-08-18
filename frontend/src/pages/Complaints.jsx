import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { CheckCircle2 } from 'lucide-react'
import ResidentComplaints from './ResidentComplaints'
import {
  getComplaints,
  getComplaintsSummary,
  updateComplaintStatus,
  resolveComplaint
} from '../services/complaintApi'

const STATUS_OPTIONS = ['Pending', 'In-Progress', 'Resolved']

const getSlaBadge = (complaint) => {
  if (complaint.status === 'Resolved') {
    if (!complaint.resolved_at || !complaint.sla_deadline) {
      return {
        label: 'Resolved',
        tone: 'secondary'
      }
    }

    return new Date(complaint.resolved_at) <= new Date(complaint.sla_deadline)
      ? {
          label: 'Resolved Within SLA',
          tone: 'primary'
        }
      : {
          label: 'Resolved After SLA',
          tone: 'destructive'
        }
  }

  if (!complaint.sla_deadline) {
    return {
      label: 'No SLA Set',
      tone: 'secondary'
    }
  }

  const deadline = new Date(complaint.sla_deadline)
  const remaining = deadline.getTime() - Date.now()

  if (remaining <= 0) {
    return {
      label: 'SLA Breached',
      tone: 'destructive'
    }
  }

  if (remaining <= 6 * 60 * 60 * 1000) {
    return {
      label: 'Due Soon',
      tone: 'secondary'
    }
  }

  return {
    label: 'Within SLA',
    tone: 'primary'
  }
}

const Complaints = () => {
  const role = useSelector((state) => state.auth.role)

  const [complaints, setComplaints] = useState([])
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [complaintList, summaryData] = await Promise.all([
          getComplaints(),
          getComplaintsSummary()
        ])

        setComplaints(complaintList)
        setSummary(summaryData)
      } catch (err) {
        setError('Could not load complaints')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleStatusChange = async (id, status) => {
    try {
      await updateComplaintStatus(id, status)

      setComplaints((current) =>
        current.map((c) =>
          c._id === id
            ? {
                ...c,
                status
              }
            : c
        )
      )
    } catch (err) {
      setError('Could not update status')
    }
  }

  const handleResolve = async (id) => {
    try {
      const result = await resolveComplaint(
        id,
        'Resolved by admin dashboard'
      )

      setComplaints((current) =>
        current.map((c) =>
          c._id === id
            ? result.data
            : c
        )
      )
    } catch (err) {
      setError(
        err.message || 'Could not resolve complaint'
      )
    }
  }

  const summaryCards = summary
  ? [
      { label: 'Total', value: summary.total },
      { label: 'Open', value: summary.open },
      { label: 'In Progress', value: summary.inProgress },
      { label: 'Resolved', value: summary.resolved },
      { label: 'SLA Breached', value: summary.slaBreached },
      { label: 'Due Soon', value: summary.dueSoon }
    ]
  : []

  if (role !== 'admin') {
    return <ResidentComplaints />
  }

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h2 className="font-heading text-2xl">
          Helpdesk & Complaints
        </h2>
      </div>

      {summaryCards.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-7 gap-3">
          {summaryCards.map((item) => (
            <div
              key={item.label}
              className="bg-card border border-border rounded-xl p-3"
            >
              <div className="text-xs text-muted-foreground uppercase tracking-wide font-mono">
                {item.label}
              </div>

              <div className="mt-2 text-2xl font-semibold">
                {item.value}
              </div>
            </div>
          ))}
        </div>
      )}

      {loading && (
        <p className="text-muted-foreground text-sm">
          Loading...
        </p>
      )}

      {error && (
        <p className="text-destructive text-sm mb-4">
          {error}
        </p>
      )}

      {!loading && complaints.length === 0 && (
        <p className="text-muted-foreground text-sm">
          No complaints submitted yet.
        </p>
      )}

      {complaints.length > 0 && (
        <div className="space-y-4">

          {complaints.map((complaint) => {
            const slaState = getSlaBadge(complaint)

            return (
              <div
                key={complaint._id}
                className="bg-card border border-border rounded-2xl p-5"
              >

                <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-4">

                  <div className="space-y-3 flex-1">

                    <div className="flex flex-wrap items-center gap-2">

                      <span className="text-xs uppercase tracking-wide font-mono text-muted-foreground">
                        {complaint.category}
                      </span>

                      <span
                        className={`inline-flex items-center rounded-full px-2 py-1 text-[11px] font-medium ${
                          slaState.tone === 'primary'
                            ? 'bg-primary/10 text-primary'
                            : slaState.tone === 'destructive'
                            ? 'bg-destructive/10 text-destructive'
                            : 'bg-secondary/10 text-secondary'
                        }`}
                      >
                        {slaState.label}
                      </span>

                    </div>

                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                      {complaint.description}
                    </p>

                    <div className="grid gap-3 md:grid-cols-3 text-sm">

                      <div>
                        <p className="text-xs font-mono uppercase tracking-wide text-muted-foreground">
                          Resident
                        </p>

                        <p className="mt-1 font-medium">
                          {complaint.resident_id?.username ||
                            'Unknown resident'}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-mono uppercase tracking-wide text-muted-foreground">
                          Flat
                        </p>

                        <p className="mt-1 font-medium">
                          {complaint.resident_id?.flat_id
                            ? `Block ${complaint.resident_id.flat_id.block_name} / ${complaint.resident_id.flat_id.flat_number}`
                            : 'Not linked'}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-mono uppercase tracking-wide text-muted-foreground">
                          Created
                        </p>

                        <p className="mt-1 font-medium">
                          {new Date(
                            complaint.createdAt
                          ).toLocaleString()}
                        </p>
                      </div>

                    </div>

                    {complaint.photo_url && (
                      <a
                        href={complaint.photo_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-primary underline underline-offset-2"
                      >
                        View attached photo
                      </a>
                    )}

                  </div>

                  <div className="w-full xl:max-w-sm space-y-3">

                    <div>
                      <label className="text-xs font-mono uppercase tracking-wide text-muted-foreground">
                        Status
                      </label>

                      <select
                        value={complaint.status}
                        onChange={(e) =>
                          handleStatusChange(
                            complaint._id,
                            e.target.value
                          )
                        }
                        className="mt-1 w-full border border-input rounded-lg px-3 py-2 bg-background"
                      >
                        {STATUS_OPTIONS.map((status) => (
                          <option
                            key={status}
                            value={status}
                          >
                            {status}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex justify-end pt-2">

                      <button
                        type="button"
                        onClick={() =>
                          handleResolve(complaint._id)
                        }
                        className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
                      >
                        <CheckCircle2
                          className="mr-2"
                          size={16}
                        />

                        Mark Resolved
                      </button>

                    </div>

                  </div>

                </div>
              </div>
            )
          })}

        </div>
      )}

    </div>
  )
}

export default Complaints