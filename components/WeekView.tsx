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
    startOfWeek.setDate(date.getDate() - date.getDay() + 1); // Monday

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }
    return days;
  }, [date]);

  const hours = Array.from({ length: 10 }, (_, i) => i + 8);

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Header */}
          <div className="grid grid-cols-8 border-b border-gray-300">
            <div className="p-3 font-semibold text-gray-600 border-r border-gray-300">
              Time
            </div>
            {weekDays.map((day, idx) => (
              <div
                key={idx}
                className="p-3 text-center border-r border-gray-300 last:border-r-0"
              >
                <div className="font-semibold text-gray-700">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][idx]}
                </div>
                <div className="text-sm text-gray-500">
                  {day.getMonth() + 1}/{day.getDate()}
                </div>
              </div>
            ))}
          </div>

          {/* Time rows */}
          {hours.map(hour => (
            <div key={hour} className="grid grid-cols-8 border-b border-gray-200">
              <div className="p-2 text-sm font-medium text-gray-600 border-r border-gray-200">
                {hour.toString().padStart(2, '0')}:00
              </div>
              {weekDays.map((day, dayIdx) => {
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
                    className="p-1 border-r border-gray-200 last:border-r-0 min-h-[80px]"
                  >
                    <div className="space-y-1">
                      {dayAppointments.map(apt => (
                        <div key={apt.id} className="text-xs">
                          <AppointmentCard appointment={apt} />
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