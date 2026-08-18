import api from './api'

export const getVisitorLogs = async () => {
  const res = await api.get('/admin/visitor-logs')
  return res.data.data
}