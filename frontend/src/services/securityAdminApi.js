import api from './api'

export const getGuards = async () => {
  const res = await api.get('/admin/guards')
  return res.data.data
}

export const getGuardTasks = async () => {
  const res = await api.get('/admin/guard-tasks')
  return res.data.data
}

export const assignGuardTask = async (title, description, assigned_to) => {
  const res = await api.post('/admin/guard-task', { title, description, assigned_to })
  return res.data.data
}