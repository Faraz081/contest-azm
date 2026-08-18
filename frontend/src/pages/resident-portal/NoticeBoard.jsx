import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import {
  Bell,
  Search,
  AlertTriangle,
  ShieldAlert,
  Wrench,
  Users,
  Clock,
  FileText,
  X,
  Pin,
  ChevronRight,
  Download,
} from 'lucide-react'
import { showToast } from '../../utils/toast'

export default function NoticeBoard() {
  const [notices, setNotices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('ALL')
  const [selectedNotice, setSelectedNotice] = useState(null)

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        setLoading(true)
        setError('')

        const res = await api.get('/resident/notices')

        console.log('Resident notices response:', res.data)

        if (res.data?.success && Array.isArray(res.data.data)) {
          setNotices(res.data.data)
        } else {
          setNotices([])
        }
      } catch (err) {
        console.error('Failed to load resident notices:', err)

        setError(
          err.response?.data?.message ||
          'Could not load notices.'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchNotices()
  }, [])

  const getCategoryBadge = () => {
    return (
      <span className="inline-flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground font-medium">
        <Bell size={12} />
        General
      </span>
    )
  }

  const filteredNotices = notices.filter((notice) => {
    const title = (notice.title || '').toLowerCase()
    const description = (notice.description || '').toLowerCase()
    const search = searchTerm.toLowerCase()

    return (
      title.includes(search) ||
      description.includes(search)
    )
  })

  return (
    <div>
      <h2 className="font-heading text-2xl text-foreground mb-6">
        Society Notice Board
      </h2>

      <div className="bg-card border border-border rounded-xl p-4 sm:p-5 mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h3 className="font-heading text-lg text-foreground">
            Official Circulars
          </h3>

          <p className="text-xs text-muted-foreground">
            Management announcements, schedules, and community bulletins
          </p>
        </div>

        <div className="relative w-full md:w-64">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />

          <input
            type="text"
            placeholder="Search circulars..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-input bg-background"
          />
        </div>
      </div>

      {loading ? (
        <div className="py-16 text-center text-muted-foreground">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2" />
          <p className="text-xs">Loading notices...</p>
        </div>
      ) : error ? (
        <div className="bg-card border border-destructive/30 rounded-xl p-10 text-center">
          <Bell
            size={24}
            className="text-destructive mx-auto mb-2"
          />

          <h4 className="font-heading text-base text-foreground">
            Unable to load notices
          </h4>

          <p className="text-xs text-muted-foreground mt-1">
            {error}
          </p>
        </div>
      ) : filteredNotices.length === 0 ? (
        <div className="bg-card border border-border rounded-xl p-12 text-center">
          <Bell
            size={24}
            className="text-muted-foreground mx-auto mb-2"
          />

          <h4 className="font-heading text-base text-foreground">
            No notices found
          </h4>

          <p className="text-xs text-muted-foreground mt-1">
            There are currently no notices available.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredNotices.map((notice) => (
            <div
              key={notice._id}
              onClick={() => setSelectedNotice(notice)}
              className="bg-card border border-border rounded-xl p-5 hover:border-primary/50 transition cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                {getCategoryBadge()}

                <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                  <Clock size={12} />

                  <span>
                    {new Date(
                      notice.createdAt
                    ).toLocaleDateString([], {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </div>
              </div>

              <h4 className="font-heading text-base text-foreground mb-2">
                {notice.title}
              </h4>

              <p className="text-xs text-muted-foreground line-clamp-3">
                {notice.description}
              </p>

              <div className="pt-3 mt-4 border-t border-border flex justify-end">
                <span className="text-primary font-medium text-xs inline-flex items-center gap-1">
                  Read Notice
                  <ChevronRight size={14} />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-card border border-border rounded-xl max-w-lg w-full p-6 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              {getCategoryBadge()}

              <button
                onClick={() => setSelectedNotice(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X size={18} />
              </button>
            </div>

            <div className="my-4">
              <h3 className="font-heading text-xl text-foreground">
                {selectedNotice.title}
              </h3>

              <div className="text-xs text-muted-foreground mt-2 pb-3 border-b border-border">
                Posted by:{' '}
                <strong className="text-foreground">
                  {selectedNotice.postedBy || 'Society Admin'}
                </strong>

                {' • '}

                {new Date(
                  selectedNotice.createdAt
                ).toLocaleDateString()}
              </div>

              <div className="mt-4 text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                {selectedNotice.description}
              </div>
            </div>

            <div className="pt-3 border-t border-border flex justify-end">
              <button
                onClick={() => setSelectedNotice(null)}
                className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium text-xs"
              >
                Close Notice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}