import React from 'react'

const colorMap = {
  primary: 'bg-primary/10 text-primary',
  secondary: 'bg-secondary/10 text-secondary',
  destructive: 'bg-destructive/10 text-destructive',
}

const StatCard = ({ label, value, icon: Icon, color }) => {
  const colorClasses = colorMap[color] || colorMap.primary

  return (
    <div className="bg-card border border-border rounded-xl p-5 flex items-center gap-4">
      <div className={`w-11 h-11 rounded-lg flex items-center justify-center ${colorClasses}`}>
        <Icon size={22} />
      </div>
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-xl font-semibold font-mono">{value}</p>
      </div>
    </div>
  )
}

export default StatCard