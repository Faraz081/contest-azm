export const ALLOWED_ROLES = ['admin', 'resident', 'guard']

export const normalizeRole = (role) => {
  if (!role) return null
  const value = String(role).trim().toLowerCase()
  return ALLOWED_ROLES.includes(value) ? value : null
}

export const isAllowedRole = (role) => normalizeRole(role) !== null
