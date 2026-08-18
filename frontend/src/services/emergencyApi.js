import api from './api'

export const getEmergencies = async () => {
  const res = await api.get('/admin/emergencies')
  return res.data.data
}

export const createEmergency = async (data) => {
  const res = await api.post('/admin/emergency', data)
  return res.data.data
}

export const updateEmergency = async (id, updates) => {
  const res = await api.patch(`/admin/emergency/${id}`, updates)
  return res.data.data
}

export const getResidentEmergencies = async () => {
  const res = await api.get('/resident/emergencies')
  return res.data.data
}