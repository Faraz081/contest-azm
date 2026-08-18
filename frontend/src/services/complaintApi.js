import api from './api'

export const getComplaints = async () => {
  const res = await api.get('/admin/complaints')
  return res.data.data
}

export const getComplaintsSummary = async () => {
  const res = await api.get('/admin/complaints/summary')
  return res.data.data
}

export const updateComplaintStatus = async (id, status) => {
  const res = await api.patch(`/admin/complaints/${id}`, { status })
  return res.data
}

export const getMaintenancePersonnel = async () => {
  const res = await api.get('/admin/maintenance')
  return res.data.data
}

export const assignComplaint = async (id, assigned_to) => {
  const res = await api.patch(`/admin/complaints/${id}/assign`, { assigned_to })
  return res.data
}

export const resolveComplaint = async (id, resolution_notes) => {
  const res = await api.patch(`/admin/complaints/${id}/resolve`, { resolution_notes })
  return res.data
}