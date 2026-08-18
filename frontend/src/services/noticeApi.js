import api from './api'

export const getNotices = async () => {
  const res = await api.get('/admin/notices')
  return res.data.data
}

export const createNotice = async (data) => {
  const res = await api.post('/admin/notice', data)
  return res.data.data
}

export const getResidentNotices = async () => {
  const res = await api.get('/resident/notices')
  return res.data.data
}