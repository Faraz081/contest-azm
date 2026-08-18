import api from './api'

export const getFacilities = async () => {
  const res = await api.get('/admin/facilities')
  return res.data.data
}

export const createFacility = async (facility) => {
  const res = await api.post('/admin/facility', facility)
  return res.data.data
}

export const updateFacility = async (id, updates) => {
  const res = await api.patch(`/admin/facility/${id}`, updates)
  return res.data.data
}

export const deleteFacility = async (id) => {
  const res = await api.delete(`/admin/facility/${id}`)
  return res.data
}

export const getFacilityBookings = async () => {
  const res = await api.get('/admin/facility-bookings')
  return res.data.data
}