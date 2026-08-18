import React, { useEffect, useState } from 'react'
import { getResidentNotices } from '../../services/noticeApi'

const ResidentNotices = () => {
  const [notices, setNotices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadNotices = async () => {
      try {
        const data = await getResidentNotices()
        setNotices(data || [])
      } catch (err) {
        setError(
          err.response?.data?.message || 'Could not load notices'
        )
      } finally {
        setLoading(false)
      }
    }

    loadNotices()
  }, [])

  if (loading) {
    return (
      <div>
        <h2 className="font-heading text-2xl mb-6">
          Notices
        </h2>

        <div className="bg-card border border-border rounded-xl p-6">
          Loading notices...
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="font-heading text-2xl">
          Notices
        </h2>

        <p className="text-sm text-muted-foreground mt-1">
          Important announcements from society management.
        </p>
      </div>

      {error && (
        <div className="mb-4 p-4 rounded-lg border border-destructive text-destructive">
          {error}
        </div>
      )}

      {notices.length === 0 ? (
        <div className="bg-card border border-border rounded-xl p-8 text-center">
          <p className="text-muted-foreground">
            No notices available.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {notices.map((notice) => (
            <div
              key={notice._id}
              className="bg-card border border-border rounded-xl p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-heading text-lg font-semibold">
                    {notice.title}
                  </h3>

                  <p className="text-sm text-muted-foreground mt-2 whitespace-pre-wrap">
                    {notice.message || notice.description}
                  </p>

                  <div className="flex flex-wrap gap-3 mt-4 text-xs text-muted-foreground">
                    <span>
                      Posted:{' '}
                      {new Date(notice.createdAt).toLocaleString()}
                    </span>

                    {(notice.created_by?.username || notice.postedBy) && (
                      <span>
                        By: {notice.created_by?.username || notice.postedBy}
                      </span>
                    )}
                  </div>
                </div>

                <span
                  className={`text-xs px-2.5 py-1 rounded-full shrink-0 ${
                    notice.priority === 'High'
                      ? 'bg-destructive/10 text-destructive'
                      : notice.priority === 'Medium'
                      ? 'bg-secondary/10 text-secondary'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {notice.priority || 'Normal'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ResidentNotices
