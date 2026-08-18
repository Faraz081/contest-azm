import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getPolls, updatePoll, votePoll } from '../../services/pollApi'

const PollsList = () => {
  const role = useSelector((state) => state.auth.role)

  const [polls, setPolls] = useState([])
  const [error, setError] = useState('')
  const [votedIds, setVotedIds] = useState([])

  useEffect(() => {
    getPolls(role)
      .then(setPolls)
      .catch((err) => {
        setError(
          err.response?.data?.message || 'Could not load polls'
        )
      })
  }, [role])

  const handleClose = async (id) => {
    try {
      const updated = await updatePoll(id, { status: 'Closed' })

      setPolls((prev) =>
        prev.map((p) => (p._id === id ? updated : p))
      )
    } catch (err) {
      setError(
        err.response?.data?.message || 'Could not close poll'
      )
    }
  }

  const handleVote = async (pollId, optionId) => {
    setError('')

    try {
      await votePoll(pollId, optionId)

      const updated = await getPolls(role)
      setPolls(updated)

      setVotedIds((prev) => [...prev, pollId])
    } catch (err) {
      setError(
        err.response?.data?.message || 'Could not submit vote'
      )
    }
  }

  return (
    <div>
      <h2 className="font-heading text-2xl mb-6">
        Polls
      </h2>

      {error && (
        <p className="text-destructive text-sm mb-4">
          {error}
        </p>
      )}

      {polls.length === 0 ? (
        <p className="text-muted-foreground text-sm">
          No polls available.
        </p>
      ) : (
        <div className="space-y-3">
          {polls.map((p) => {
            const totalVotes = p.options.reduce(
              (sum, o) => sum + o.votes,
              0
            )

            const hasVoted = votedIds.includes(p._id)

            return (
              <div
                key={p._id}
                className="bg-card border border-border rounded-xl p-4"
              >
                <div className="flex justify-between items-start">
                  <p className="font-medium">
                    {p.question}
                  </p>

                  <span
                    className={`text-xs px-2 py-1 rounded-full shrink-0 ${
                      p.status === 'Active'
                        ? 'bg-secondary/20 text-secondary'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {p.status}
                  </span>
                </div>

                <div className="mt-3 space-y-2">
                  {p.options.map((o) => {
                    const pct =
                      totalVotes > 0
                        ? Math.round(
                            (o.votes / totalVotes) * 100
                          )
                        : 0

                    return (
                      <div key={o._id} className="text-sm">
                        {role !== 'admin' &&
                        p.status === 'Active' &&
                        !hasVoted ? (
                          <button
                            onClick={() =>
                              handleVote(p._id, o._id)
                            }
                            className="w-full text-left border border-input rounded-lg px-3 py-2 hover:bg-muted transition-colors"
                          >
                            {o.option_text}
                          </button>
                        ) : (
                          <>
                            <div className="flex justify-between mb-1">
                              <span>{o.option_text}</span>

                              <span className="text-muted-foreground">
                                {o.votes} votes · {pct}%
                              </span>
                            </div>

                            <div className="w-full bg-muted rounded-full h-2">
                              <div
                                className="bg-primary h-2 rounded-full"
                                style={{
                                  width: `${pct}%`
                                }}
                              />
                            </div>
                          </>
                        )}
                      </div>
                    )
                  })}
                </div>

                {role === 'admin' &&
                  p.status === 'Active' && (
                    <button
                      onClick={() => handleClose(p._id)}
                      className="text-xs border border-destructive text-destructive px-3 py-1.5 rounded-lg font-medium mt-3"
                    >
                      Close Poll
                    </button>
                  )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default PollsList