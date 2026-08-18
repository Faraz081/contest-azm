import React, { useEffect, useState } from 'react'
import { getFacilityBookings } from '../../services/facilityApi'

const FacilityBookings = () => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadBookings = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await getFacilityBookings()
      setBookings(data || [])
    } catch (err) {
      setError(
        err.response?.data?.message || 'Could not load facility bookings'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadBookings()
  }, [])

  const formatDate = (date) => {
    if (!date) return '-'

    return new Date(date).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  }

  const getResidentName = (resident) => {
    if (!resident) return 'Unknown Resident'

    return resident.name ||
      resident.full_name ||
      resident.username ||
      resident.email ||
      'Unknown Resident'
  }

  if (loading) {
    return (
      <div>
        <h2 className="font-heading text-2xl mb-6">
          Facility Bookings
        </h2>

        <div className="bg-card border border-border rounded-xl p-6">
          Loading bookings...
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-heading text-2xl">
            Facility Bookings
          </h2>

          <p className="text-muted-foreground text-sm mt-1">
            View all facility bookings made by residents.
          </p>
        </div>

        <div className="text-sm text-muted-foreground">
          {bookings.length} booking{bookings.length !== 1 ? 's' : ''}
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 rounded-lg border border-destructive text-destructive">
          {error}
        </div>
      )}

      {bookings.length === 0 ? (
        <div className="bg-card border border-border rounded-xl p-8 text-center">
          <p className="text-muted-foreground">
            No facility bookings yet.
          </p>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border">
                <tr className="text-left">
                  <th className="px-5 py-4 font-medium">
                    Facility
                  </th>
                  <th className="px-5 py-4 font-medium">
                    Resident
                  </th>
                  <th className="px-5 py-4 font-medium">
                    Flat
                  </th>
                  <th className="px-5 py-4 font-medium">
                    Date
                  </th>
                  <th className="px-5 py-4 font-medium">
                    Time Slot
                  </th>
                  <th className="px-5 py-4 font-medium">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {bookings.map((booking) => (
                  <tr
                    key={booking._id}
                    className="border-b border-border last:border-0"
                  >
                    <td className="px-5 py-4">
                      <div className="font-medium">
                        {booking.facility_id?.name || '-'}
                      </div>

                      {booking.facility_id?.location && (
                        <div className="text-xs text-muted-foreground mt-1">
                          {booking.facility_id.location}
                        </div>
                      )}
                    </td>

                    <td className="px-5 py-4">
                      <div className="font-medium">
                        {getResidentName(booking.resident_id)}
                      </div>

                      {booking.resident_id?.email && (
                        <div className="text-xs text-muted-foreground mt-1">
                          {booking.resident_id.email}
                        </div>
                      )}
                    </td>

                    <td className="px-5 py-4">
                      {booking.resident_id?.flat_id?.flat_number ||
                        booking.resident_id?.flat_id?.number ||
                        '-'}
                    </td>

                    <td className="px-5 py-4">
                      {formatDate(booking.date)}
                    </td>

                    <td className="px-5 py-4">
                      {booking.slot || '-'}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                          booking.status === 'Confirmed'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default FacilityBookings