import api from './api'

export const getPolls = async (role) => {
  const endpoint = role === 'admin'
    ? '/admin/polls'
    : '/polls'

  const res = await api.get(endpoint)
  return res.data.data
}

export const createPoll = async (question, options, expires_at) => {
  const res = await api.post('/admin/poll', {
    question,
    options,
    expires_at: expires_at || null
  })

  return res.data.data
}

export const updatePoll = async (id, updates) => {
  const res = await api.patch(`/admin/poll/${id}`, updates)
  return res.data.data
}

export const votePoll = async (id, option_id) => {
  const res = await api.post(`/polls/${id}/vote`, {
    option_id
  })

  return res.data
}