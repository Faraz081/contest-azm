import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { widgetConfig } from '../config/widgetConfig'
import StatCard from '../components/StatCard'
import { getResidents } from '../services/residentApi'
import { getBills } from '../services/billingApi'
import { getComplaints, getComplaintsSummary } from '../services/complaintApi'
import { getVisitorLogs } from '../services/auditApi'
import { Users, Receipt, MessageSquareWarning, UserCheck } from 'lucide-react'
import {
  PieChart, Pie, Cell, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts'

const Overview = () => {
  const user = useSelector((state) => state.auth.user)
  const role = useSelector((state) => state.auth.role)
  const [adminStats, setAdminStats] = useState(null)
  const [data, setData] = useState({ bills: [], complaints: [], visitors: [] })

  useEffect(() => {
    if (role !== 'admin') return

    Promise.all([
      getResidents().catch(() => []),
      getBills().catch(() => []),
      getComplaints().catch(() => []),
      getComplaintsSummary().catch(() => null),
      getVisitorLogs().catch(() => []),
    ]).then(([residents, bills, complaints, summary, visitors]) => {
      const unpaidBills = bills.filter(b => b.payment_status !== 'Paid').length
      const pendingComplaints = complaints.filter(c => c.status !== 'Resolved').length
      const today = new Date().toDateString()
      const visitorsToday = visitors.filter(v => new Date(v.createdAt).toDateString() === today).length

      setData({ bills, complaints, visitors })
      setAdminStats([
        { label: 'Residents', value: residents.length, icon: Users, color: 'primary' },
        { label: 'Unpaid Bills', value: unpaidBills, icon: Receipt, color: 'destructive' },
        { label: 'Open Complaints', value: summary?.open ?? pendingComplaints, icon: MessageSquareWarning, color: 'secondary' },
        { label: 'Visitors Today', value: visitorsToday, icon: UserCheck, color: 'primary' },
      ])
    })
  }, [role])

  const stats = role === 'admin' ? (adminStats || []) : (widgetConfig[role] || [])

  const paid = data.bills.filter(b => b.payment_status === 'Paid').length
  const unpaid = data.bills.length - paid
  const billingData = [
    { name: 'Paid', value: paid },
    { name: 'Pending', value: unpaid },
  ]

  const complaintData = ['Pending', 'Resolved'].map(status => ({
    name: status,
    value: data.complaints.filter(c => c.status === status || (status === 'Pending' && c.status !== 'Resolved')).length
  }))

  const visitorData = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (6 - i))
    return {
      name: date.toLocaleDateString('en', { weekday: 'short' }),
      visitors: data.visitors.filter(v => new Date(v.createdAt).toDateString() === date.toDateString()).length
    }
  })

  return (
    <div>
      <h2 className="font-heading text-2xl mb-6">Welcome, {user?.username}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(stat => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

     {role === 'admin' && (
  <div className="grid lg:grid-cols-2 gap-4 mt-6">

    <div className="bg-card border border-border rounded-xl p-5">
      <h3 className="font-semibold">Billing Overview</h3>
      <div className="h-64">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={billingData}
              dataKey="value"
              nameKey="name"
              innerRadius={65}
              outerRadius={95}
              paddingAngle={4}
            >
              <Cell fill="var(--secondary)" />
              <Cell fill="var(--primary)" />
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>

    <div className="bg-card border border-border rounded-xl p-5">
      <h3 className="font-semibold">Complaints</h3>
      <div className="h-64 mt-4">
        <ResponsiveContainer>
          <BarChart data={complaintData}>
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="value" fill="var(--primary)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>

    <div className="bg-card border border-border rounded-xl p-5">
      <h3 className="font-semibold">Visitors — Last 7 Days</h3>
      <div className="h-64 mt-4">
        <ResponsiveContainer>
          <LineChart data={visitorData}>
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="visitors"
              stroke="var(--secondary)"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>

    <div className="bg-card border border-border rounded-xl p-5">
      <h3 className="font-semibold mb-4">Quick Overview</h3>
      <div className="space-y-4 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Total Bills</span>
          <b>{data.bills.length}</b>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Paid Bills</span>
          <b className="text-secondary">{paid}</b>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Pending Bills</span>
          <b className="text-muted-foreground">{unpaid}</b>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Total Complaints</span>
          <b>{data.complaints.length}</b>
        </div>
      </div>
    </div>

  </div>
)}
    </div>
  )
}

export default Overview