import React, { useEffect, useState } from 'react';
import {
  CalendarDays,
  MapPin,
  Users,
  Clock3,
  Building2,
  CheckCircle2,
  X,
  CalendarCheck,
  Ban
} from 'lucide-react';
import api from '../../services/api';
import { showToast } from '../../utils/toast';

export default function FacilityBooking() {
  const [facilities, setFacilities] = useState([]);
  const [bookings, setBookings] = useState([]);

  const [loadingFacilities, setLoadingFacilities] = useState(true);
  const [loadingBookings, setLoadingBookings] = useState(true);

  const [selectedFacility, setSelectedFacility] = useState(null);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingSlot, setBookingSlot] = useState('');

  const [isBooking, setIsBooking] = useState(false);
  const [cancellingBooking, setCancellingBooking] = useState(null);

  useEffect(() => {
    fetchFacilities();
    fetchBookings();
  }, []);

  const fetchFacilities = async () => {
    try {
      setLoadingFacilities(true);

      const res = await api.get('/resident/facilities');

      setFacilities(res.data?.data || []);
    } catch (error) {
      showToast(
        error.response?.data?.message || 'Failed to load facilities.',
        'error'
      );
    } finally {
      setLoadingFacilities(false);
    }
  };

  const fetchBookings = async () => {
    try {
      setLoadingBookings(true);

      const res = await api.get('/resident/bookings');

      setBookings(res.data?.data || []);
    } catch (error) {
      showToast(
        error.response?.data?.message || 'Failed to load your bookings.',
        'error'
      );
    } finally {
      setLoadingBookings(false);
    }
  };

  const openBookingModal = (facility) => {
    setSelectedFacility(facility);
    setBookingDate('');
    setBookingSlot('');
  };

  const closeBookingModal = () => {
    if (isBooking) return;

    setSelectedFacility(null);
    setBookingDate('');
    setBookingSlot('');
  };

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!selectedFacility) return;

    if (!bookingDate || !bookingSlot.trim()) {
      showToast('Please select a date and enter a time slot.', 'error');
      return;
    }

    try {
      setIsBooking(true);

      await api.post('/resident/booking', {
        facility_id: selectedFacility._id,
        date: bookingDate,
        slot: bookingSlot.trim()
      });

      showToast('Facility booked successfully.', 'success');

      closeBookingModal();
      await fetchBookings();
    } catch (error) {
      showToast(
        error.response?.data?.message ||
          'Failed to book the facility.',
        'error'
      );
    } finally {
      setIsBooking(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    const confirmed = window.confirm(
      'Are you sure you want to cancel this booking?'
    );

    if (!confirmed) return;

    try {
      setCancellingBooking(bookingId);

      await api.patch(`/resident/booking/${bookingId}/cancel`);

      showToast('Booking cancelled successfully.', 'success');

      await fetchBookings();
    } catch (error) {
      showToast(
        error.response?.data?.message ||
          'Failed to cancel the booking.',
        'error'
      );
    } finally {
      setCancellingBooking(null);
    }
  };

  const formatDate = (date) => {
    if (!date) return '—';

    const parsed = new Date(date);

    if (Number.isNaN(parsed.getTime())) {
      return date;
    }

    return parsed.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  return (
    <div>
      {/* Page Heading */}
      <div className="mb-6">
        <h2 className="font-heading text-2xl text-foreground">
          Facility Booking
        </h2>

        <p className="text-sm text-muted-foreground mt-1">
          Browse available society facilities and manage your bookings.
        </p>
      </div>

      {/* Available Facilities */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-heading text-lg text-foreground">
              Available Facilities
            </h3>

            <p className="text-xs text-muted-foreground mt-0.5">
              Select a facility to reserve a date and time slot.
            </p>
          </div>
        </div>

        {loadingFacilities ? (
          <div className="bg-card border border-border rounded-xl p-8 text-center">
            <p className="text-sm text-muted-foreground">
              Loading facilities...
            </p>
          </div>
        ) : facilities.length === 0 ? (
          <div className="bg-card border border-border rounded-xl p-8 text-center">
            <Building2
              size={30}
              className="mx-auto mb-3 text-muted-foreground"
            />

            <p className="text-sm font-medium text-foreground">
              No facilities available
            </p>

            <p className="text-xs text-muted-foreground mt-1">
              There are currently no active facilities available for booking.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {facilities.map((facility) => (
              <div
                key={facility._id}
                className="bg-card border border-border rounded-xl p-5 shadow-xs hover:border-primary/40 transition"
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="w-11 h-11 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Building2 size={21} />
                  </div>

                  <span className="text-xs px-2 py-1 rounded-full bg-secondary/20 text-secondary font-medium">
                    Available
                  </span>
                </div>

                <h4 className="font-heading text-lg text-foreground">
                  {facility.name}
                </h4>

                <p className="text-xs text-muted-foreground mt-1.5 min-h-[36px]">
                  {facility.description ||
                    'No description available for this facility.'}
                </p>

                <div className="space-y-2 mt-4 text-xs">
                  {facility.location && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin size={14} className="text-primary" />
                      <span>{facility.location}</span>
                    </div>
                  )}

                  {facility.timing && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock3 size={14} className="text-primary" />
                      <span>{facility.timing}</span>
                    </div>
                  )}

                  {facility.capacity > 0 && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users size={14} className="text-primary" />
                      <span>Capacity: {facility.capacity}</span>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => openBookingModal(facility)}
                  className="w-full mt-5 bg-primary text-primary-foreground px-4 py-2.5 rounded-lg font-medium text-xs inline-flex items-center justify-center gap-2 shadow-sm transition cursor-pointer"
                >
                  <CalendarCheck size={15} />
                  Book Facility
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* My Bookings */}
      <div>
        <div className="mb-4">
          <h3 className="font-heading text-lg text-foreground">
            My Bookings
          </h3>

          <p className="text-xs text-muted-foreground mt-0.5">
            View your current and previous facility reservations.
          </p>
        </div>

        <div className="bg-card border border-border rounded-xl overflow-hidden shadow-xs">
          {loadingBookings ? (
            <div className="p-8 text-center">
              <p className="text-sm text-muted-foreground">
                Loading your bookings...
              </p>
            </div>
          ) : bookings.length === 0 ? (
            <div className="p-8 text-center">
              <CalendarDays
                size={30}
                className="mx-auto mb-3 text-muted-foreground"
              />

              <p className="text-sm font-medium text-foreground">
                No bookings yet
              </p>

              <p className="text-xs text-muted-foreground mt-1">
                Your facility reservations will appear here.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {bookings.map((booking) => {
                const facility =
                  typeof booking.facility_id === 'object'
                    ? booking.facility_id
                    : null;

                const cancelled =
                  booking.status === 'Cancelled';

                return (
                  <div
                    key={booking._id}
                    className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-muted/30 transition"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <CalendarDays size={19} />
                      </div>

                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-medium text-sm text-foreground">
                            {facility?.name || 'Facility'}
                          </p>

                          <span
                            className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                              cancelled
                                ? 'bg-muted text-muted-foreground'
                                : 'bg-secondary/20 text-secondary'
                            }`}
                          >
                            {booking.status || 'Confirmed'}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1.5 text-xs text-muted-foreground">
                          <span>
                            <strong>Date:</strong>{' '}
                            {formatDate(booking.date)}
                          </span>

                          <span>
                            <strong>Slot:</strong>{' '}
                            {booking.slot || '—'}
                          </span>

                          {facility?.location && (
                            <span>
                              <strong>Location:</strong>{' '}
                              {facility.location}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {!cancelled && (
                      <button
                        type="button"
                        disabled={cancellingBooking === booking._id}
                        onClick={() =>
                          handleCancelBooking(booking._id)
                        }
                        className="border border-destructive/40 text-destructive hover:bg-destructive/10 px-3 py-2 rounded-lg text-xs font-medium inline-flex items-center justify-center gap-1.5 transition cursor-pointer disabled:opacity-50"
                      >
                        <Ban size={14} />

                        {cancellingBooking === booking._id
                          ? 'Cancelling...'
                          : 'Cancel Booking'}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Booking Modal */}
      {selectedFacility && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-card border border-border rounded-xl max-w-md w-full p-6 shadow-xl text-foreground">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <div className="flex items-center gap-2">
                <CalendarCheck size={18} className="text-primary" />

                <div>
                  <h3 className="font-heading text-lg text-foreground">
                    Book {selectedFacility.name}
                  </h3>

                  <p className="text-xs text-muted-foreground mt-0.5">
                    Select your preferred date and time slot.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={closeBookingModal}
                disabled={isBooking}
                className="text-muted-foreground hover:text-foreground p-1 rounded-md cursor-pointer disabled:opacity-50"
              >
                <X size={18} />
              </button>
            </div>

            {/* Facility Information */}
            <div className="my-4 p-4 rounded-lg bg-muted/60 border border-border">
              <p className="font-medium text-sm text-foreground">
                {selectedFacility.name}
              </p>

              {selectedFacility.location && (
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1.5">
                  <MapPin size={13} />
                  {selectedFacility.location}
                </p>
              )}

              {selectedFacility.timing && (
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1.5">
                  <Clock3 size={13} />
                  {selectedFacility.timing}
                </p>
              )}
            </div>

            <form
              onSubmit={handleBooking}
              className="flex flex-col gap-4"
            >
              <div>
                <label
                  htmlFor="booking-date"
                  className="text-sm text-muted-foreground"
                >
                  Booking Date
                </label>

                <input
                  id="booking-date"
                  type="date"
                  min={getTodayDate()}
                  value={bookingDate}
                  onChange={(e) =>
                    setBookingDate(e.target.value)
                  }
                  className="w-full border border-input rounded-lg px-3 py-2 mt-1 bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="booking-slot"
                  className="text-sm text-muted-foreground"
                >
                  Time Slot
                </label>

                <input
                  id="booking-slot"
                  type="text"
                  value={bookingSlot}
                  onChange={(e) =>
                    setBookingSlot(e.target.value)
                  }
                  placeholder="e.g. 5:00 PM - 7:00 PM"
                  className="w-full border border-input rounded-lg px-3 py-2 mt-1 bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                  required
                />

                {selectedFacility.timing && (
                  <p className="text-[11px] text-muted-foreground mt-1">
                    Facility timing: {selectedFacility.timing}
                  </p>
                )}
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={closeBookingModal}
                  disabled={isBooking}
                  className="flex-1 py-2.5 border border-input hover:bg-accent text-foreground text-xs font-medium rounded-lg transition cursor-pointer disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isBooking}
                  className="flex-1 bg-primary text-primary-foreground py-2.5 rounded-lg font-medium text-xs inline-flex items-center justify-center gap-2 shadow-sm transition cursor-pointer disabled:opacity-50"
                >
                  {isBooking ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Booking...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={15} />
                      Confirm Booking
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}