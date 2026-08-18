import React from 'react'
import { useSelector } from 'react-redux'
import { UserCircle, Shield, Home } from 'lucide-react'

const Profile = () => {
  const user = useSelector((state) => state.auth.user)
  const role = useSelector((state) => state.auth.role)

  return (
    <div>
      <h2 className="font-heading text-2xl mb-6">My Profile</h2>

      <div className="bg-card border border-border rounded-xl p-6 max-w-lg">
        <div className="flex items-center gap-4 pb-4 border-b border-border">
          <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center text-2xl font-semibold">
            {user?.username?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div>
            <p className="font-heading text-xl">{user?.username}</p>
            <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary capitalize">{role}</span>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <UserCircle size={18} className="text-muted-foreground" />
            <span className="text-muted-foreground">Username</span>
            <span className="ml-auto font-medium">{user?.username}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Shield size={18} className="text-muted-foreground" />
            <span className="text-muted-foreground">Role</span>
            <span className="ml-auto font-medium capitalize">{role}</span>
          </div>
          {role === 'resident' && user?.flat_id && (
            <div className="flex items-center gap-3 text-sm">
              <Home size={18} className="text-muted-foreground" />
              <span className="text-muted-foreground">Flat</span>
              <span className="ml-auto font-medium">
                Block {user.flat_id.block_name} - {user.flat_id.flat_number}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile