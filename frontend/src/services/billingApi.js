import api from './api'

export const generateBills = async (amount_due, due_date) => {
  const res = await api.post('/admin/bills', { amount_due, due_date })
  return res.data
}

export const getBills = async () => {
  const res = await api.get('/admin/bills')
  return res.data.data
}

export const markBillPaid = async (id) => {
  const res = await api.patch(`/admin/bills/${id}/pay`)
  return res.data.data
}

export const togglePenalty = async (id, applied) => {
  const res = await api.patch(`/admin/bills/${id}/penalty`, { penalty_applied: applied })
  return res.data.data
}