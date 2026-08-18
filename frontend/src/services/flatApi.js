import api from './api'

export const createFlat = async (block_name, flat_number, occupancy_type) => {
  const res = await api.post('/admin/flat', { block_name, flat_number, occupancy_type })
  return res.data
}

export const getFlats = async () => {
  const res = await api.get('/admin/flats')
  return res.data.data
}

export const updateFlat = async (id, updates) => {
  const res = await api.patch(`/admin/flat/${id}`, updates)
  return res.data.data
}

export const deleteFlat = async (id) => {
  const res = await api.delete(`/admin/flat/${id}`)
  return res.data
}