'use client';

import { useState, useMemo, useEffect } from 'react';
import { doctors } from '@/data/mockData';
import { useAppointments } from '@/hooks/useAppointments';
import { useUser } from '@/context/UserContext';
import { DoctorSelector } from './DoctorSelector';
import { SearchBar } from './SearchBar';
import { DayView } from './DayView';
import { WeekView } from './WeekView';
import { ChevronLeft, ChevronRight, Calendar, CalendarDays } from 'lucide-react';

export function ScheduleView() {
  const { currentUser, canViewAllDoctors } = useUser();
  
  // Determine available doctors based on role
  const availableDoctors = useMemo(() => {
    if (canViewAllDoctors) {
      return doctors;
    }
    // Doctors can only see their own schedule
    return doctors.filter(d => d.id === currentUser.doctorId);
  }, [canViewAllDoctors, currentUser.doctorId]);

  const [selectedDoctorId, setSelectedDoctorId] = useState(
    currentUser.doctorId || availableDoctors[0]?.id || '1'
  );
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'day' | 'week'>('day');
  const [searchTerm, setSearchTerm] = useState('');

  // Update selected doctor when user role changes
  useEffect(() => {
    if (!canViewAllDoctors && currentUser.doctorId) {
      setSelectedDoctorId(currentUser.doctorId);
    }
  }, [currentUser.doctorId, canViewAllDoctors]);

  const { appointments, timeSlots } = useAppointments(
    selectedDoctorId,
    currentDate,
    viewMode,
    searchTerm
  );

  const selectedDoctor = doctors.find(d => d.id === selectedDoctorId);

  const handleDoctorChange = (doctorId: string) => {
    setSelectedDoctorId(doctorId);
    // Clear search when changing doctors for better UX
    setSearchTerm('');
  };

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (viewMode === 'day') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
    } else {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    }
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const formatDateDisplay = () => {
    if (viewMode === 'day') {
      return currentDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } else {
      const startOfWeek = new Date(currentDate);
      const dayOfWeek = startOfWeek.getDay();
      const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
      startOfWeek.setDate(startOfWeek.getDate() + diff);

      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);

      return `${startOfWeek.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      })} - ${endOfWeek.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })}`;
    }
  };

  return (
    <div className="space-y-6">
      {/* Controls Section */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-4">
        {/* Doctor Selector - only show if user can view all doctors */}
        {canViewAllDoctors && (
          <DoctorSelector
            doctors={availableDoctors}
            selectedDoctorId={selectedDoctorId}
            onSelect={handleDoctorChange}
          />
        )}

        {/* Search Bar */}
        <SearchBar
          onSearch={setSearchTerm}
          placeholder="Search by patient name, appointment type, or ID..."
        />

        {/* Date Navigation and View Toggle */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigateDate('prev')}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>

            <button
              onClick={goToToday}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors text-sm"
            >
              Today
            </button>

            <button
              onClick={() => navigateDate('next')}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>

            <div className="text-lg font-semibold text-gray-800 dark:text-gray-200 ml-2">
              {formatDateDisplay()}
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex gap-2 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
            <button
              onClick={() => setViewMode('day')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                viewMode === 'day'
                  ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span className="font-medium">Day</span>
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                viewMode === 'week'
                  ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
            >
              <CalendarDays className="w-4 h-4" />
              <span className="font-medium">Week</span>
            </button>
          </div>
        </div>

        {/* Info Banner */}
        {selectedDoctor && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-blue-900 dark:text-blue-100">
                  {selectedDoctor.name}
                </h3>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  {selectedDoctor.specialty}
                </p>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-blue-900 dark:text-blue-100">
                  {appointments.length} Appointment{appointments.length !== 1 ? 's' : ''}
                </div>
                {searchTerm && (
                  <div className="text-xs text-blue-600 dark:text-blue-400">
                    Filtered results
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Schedule Display */}
      {viewMode === 'day' ? (
        <DayView
          key={`${selectedDoctorId}-${currentDate.toISOString()}`}
          doctorId={selectedDoctorId}
          date={currentDate}
          appointments={appointments}
          timeSlots={timeSlots}
        />
      ) : (
        <WeekView
          key={`${selectedDoctorId}-${currentDate.toISOString()}`}
          doctorId={selectedDoctorId}
          date={currentDate}
          appointments={appointments}
        />
      )}

      {/* No Results Message */}
      {appointments.length === 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-12 text-center">
          <Calendar className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
            No Appointments Found
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            {searchTerm
              ? 'Try adjusting your search criteria'
              : `No appointments scheduled for ${selectedDoctor?.name} on this ${viewMode === 'day' ? 'day' : 'week'}`}
          </p>
        </div>
      )}
    </div>
  );
}