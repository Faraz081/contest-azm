import api from './api'

export const onboardResident = async (username, password, flat_id) => {
  const res = await api.post('/admin/resident', { username, password, flat_id })
  return res.data
}

export const getResidents = async () => {
  const res = await api.get('/admin/residents')
  return res.data.data
}

export const updateResident = async (id, updates) => {
  const res = await api.patch(`/admin/resident/${id}`, updates)
  return res.data.data
}

export const deleteResident = async (id) => {
  const res = await api.delete(`/admin/resident/${id}`)
  return res.data
}