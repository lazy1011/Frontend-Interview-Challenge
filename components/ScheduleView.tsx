'use client';

import { useState } from 'react';
import { doctors } from '@/data/mockData';
import { useAppointments } from '@/hooks/useAppointments';
import { DoctorSelector } from './DoctorSelector';
import { DayView } from './DayView';
import { WeekView } from './WeekView';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

export function ScheduleView() {
  const [selectedDoctorId, setSelectedDoctorId] = useState(doctors[0].id);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'day' | 'week'>('day');

  const { appointments, timeSlots } = useAppointments(
    selectedDoctorId,
    currentDate,
    viewMode
  );

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (viewMode === 'day') {
      newDate.setDate(currentDate.getDate() + (direction === 'next' ? 1 : -1));
    } else {
      newDate.setDate(currentDate.getDate() + (direction === 'next' ? 7 : -7));
    }
    setCurrentDate(newDate);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              Hospital Appointment Scheduler
            </h1>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('day')}
                className={`px-4 py-2 rounded-lg font-medium ${
                  viewMode === 'day'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Day View
              </button>
              <button
                onClick={() => setViewMode('week')}
                className={`px-4 py-2 rounded-lg font-medium ${
                  viewMode === 'week'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Week View
              </button>
            </div>
          </div>

          <DoctorSelector
            doctors={doctors}
            selectedDoctorId={selectedDoctorId}
            onSelect={setSelectedDoctorId}
          />

          {/* Date Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigateDate('prev')}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="text-center">
              <div className="font-semibold text-lg">
                {viewMode === 'day'
                  ? currentDate.toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })
                  : `Week of ${currentDate.toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}`}
              </div>
            </div>
            <button
              onClick={() => navigateDate('next')}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Legend */}
        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span>Checkup</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span>Consultation</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-orange-500 rounded"></div>
            <span>Follow-up</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-purple-500 rounded"></div>
            <span>Procedure</span>
          </div>
        </div>

        {/* Calendar Views */}
        {viewMode === 'day' ? (
          <DayView
            doctorId={selectedDoctorId}
            date={currentDate}
            appointments={appointments}
            timeSlots={timeSlots}
          />
        ) : (
          <WeekView
            doctorId={selectedDoctorId}
            date={currentDate}
            appointments={appointments}
          />
        )}

        {/* Empty State */}
        {appointments.length === 0 && (
          <div className="bg-white rounded-lg shadow p-12 text-center text-gray-500">
            <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>
              No appointments scheduled for this{' '}
              {viewMode === 'day' ? 'day' : 'week'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}