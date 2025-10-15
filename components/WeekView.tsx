'use client';

import { useMemo } from 'react';
import { Appointment } from '@/types';
import { AppointmentCard } from '../app/UI/AppointmentCard';

interface WeekViewProps {
  doctorId: string;
  date: Date;
  appointments: Appointment[];
}

export function WeekView({ date, appointments }: WeekViewProps) {
  const weekDays = useMemo(() => {
    const days = [];
    const startOfWeek = new Date(date);
    // Get Monday of the week
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1);
    startOfWeek.setDate(diff);

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }
    return days;
  }, [date]);

  const hours = Array.from({ length: 10 }, (_, i) => i + 8);

  const isToday = (day: Date) => {
    const today = new Date();
    return (
      day.getDate() === today.getDate() &&
      day.getMonth() === today.getMonth() &&
      day.getFullYear() === today.getFullYear()
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <div className="min-w-[1000px]">
          {/* Header */}
          <div className="grid grid-cols-8 border-b-2 border-gray-300 dark:border-gray-600 sticky top-0 bg-white dark:bg-gray-800 z-10">
            <div className="p-4 font-semibold text-gray-700 dark:text-gray-300 border-r border-gray-300 dark:border-gray-600">
              Time
            </div>
            {weekDays.map((day, idx) => {
              const today = isToday(day);
              return (
                <div
                  key={idx}
                  className={`p-4 text-center border-r border-gray-300 dark:border-gray-600 last:border-r-0 
                             ${today ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
                >
                  <div className={`font-semibold ${today ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}`}>
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][idx]}
                  </div>
                  <div className={`text-sm mt-1 ${today ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'text-gray-500 dark:text-gray-400'}`}>
                    {day.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Time rows */}
          {hours.map(hour => (
            <div key={hour} className="grid grid-cols-8 border-b border-gray-200 dark:border-gray-700">
              <div className="p-3 text-sm font-medium text-gray-600 dark:text-gray-400 border-r border-gray-200 dark:border-gray-700">
                {hour.toString().padStart(2, '0')}:00
              </div>
              {weekDays.map((day, dayIdx) => {
                const today = isToday(day);
                const dayAppointments = appointments.filter(apt => {
                  const aptDate = new Date(apt.startTime);
                  return (
                    aptDate.getFullYear() === day.getFullYear() &&
                    aptDate.getMonth() === day.getMonth() &&
                    aptDate.getDate() === day.getDate() &&
                    aptDate.getHours() === hour
                  );
                });

                return (
                  <div
                    key={dayIdx}
                    className={`p-2 border-r border-gray-200 dark:border-gray-700 last:border-r-0 min-h-[100px]
                               ${today ? 'bg-blue-50/30 dark:bg-blue-900/10' : ''}`}
                  >
                    <div className="space-y-2">
                      {dayAppointments.map(apt => (
                        <div key={apt.id}>
                          <AppointmentCard appointment={apt} compact />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}