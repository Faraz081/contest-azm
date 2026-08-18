import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { createNotice } from '../../services/noticeApi'

const AddNotice = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError('')

    if (!title.trim() || !description.trim()) {
      setError('Title and description are required.')
      return
    }

    setLoading(true)

    try {
      await createNotice({
        title: title.trim(),
        description: description.trim(),
      })

      navigate('/dashboard/notices')
    } catch (err) {
      console.error('Create notice error:', err)

      setError(
        err.response?.data?.message ||
        'Could not post notice'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 className="font-heading text-2xl mb-6">
        Add Notice
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-card border border-border rounded-xl p-6 w-full flex flex-col gap-4"
      >
        <div className="w-full">
          <label className="text-sm text-muted-foreground">
            Title
          </label>

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border border-input rounded-lg px-3 py-2.5 mt-1 bg-background"
            placeholder="Water Tank Cleaning Notice"
          />
        </div>

        <div className="w-full">
          <label className="text-sm text-muted-foreground">
            Description
          </label>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={5}
            className="w-full border border-input rounded-lg px-3 py-2.5 mt-1 bg-background"
            placeholder="Enter notice details..."
          />
        </div>

        {error && (
          <p className="text-destructive text-sm">
            {error}
          </p>
        )}

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-primary-foreground px-4 py-2.5 rounded-lg font-medium min-w-[150px] disabled:opacity-60"
          >
            {loading ? 'Posting...' : 'Post Notice'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddNotice