import api from './api'

export const getVisitorRequests = async () => {
  const res = await api.get('/admin/visitor-requests')
  return res.data.data
}

export const updateVisitorRequest = async (id, status) => {
  const res = await api.patch(`/admin/visitor-requests/${id}`, { status })
  return res.data.data
}