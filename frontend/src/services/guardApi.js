import api from './api'

export const logWalkIn = async (visitor_name, phone, vehicle_number, flat_id) => {
  const res = await api.post('/security/walk-in', { visitor_name, phone, vehicle_number, flat_id })
  return res.data
}

export const getActiveVisitors = async () => {
  const res = await api.get('/security/active-visitors')
  return res.data.data
}

export const getEmergenciesForGuard = async () => {
  const res = await api.get('/security/emergencies')
  return res.data.data
}