'use client';

import { Appointment } from '@/types';
import { TimeSlot } from '@/domain/TimeSlot';
import { AppointmentCard } from '../app/UI/AppointmentCard';
import { CurrentTimeIndicator } from './CurrentTimeIndicator';

interface DayViewProps {
  doctorId: string;
  date: Date;
  appointments: Appointment[];
  timeSlots: TimeSlot[];
}

export function DayView({ date, appointments, timeSlots }: DayViewProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <div className="min-w-[300px] relative">
          <CurrentTimeIndicator date={date} />
          
          {timeSlots.map((slot, idx) => {
            const slotAppointments = appointments.filter(apt => slot.overlaps(apt));
            const hour = slot.start.getHours();
            const minute = slot.start.getMinutes();
            const timeLabel = `${hour.toString().padStart(2, '0')}:${minute
              .toString()
              .padStart(2, '0')}`;

            return (
              <div
                key={idx}
                className="flex border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <div className="w-20 p-3 text-sm font-medium text-gray-600 dark:text-gray-400 border-r border-gray-200 dark:border-gray-700 flex-shrink-0">
                  {timeLabel}
                </div>
                <div className="flex-1 p-2 min-h-[60px] relative">
                  {slotAppointments.map(apt => {
                    const aptStart = new Date(apt.startTime);
                    const aptEnd = new Date(apt.endTime);
                    const startMinute = aptStart.getMinutes();
                    const durationMinutes = Math.round(
                      (aptEnd.getTime() - aptStart.getTime()) / (1000 * 60)
                    );
                    const height = Math.max(durationMinutes, 30);

                    if (aptStart.getHours() === hour && startMinute === minute) {
                      return (
                        <div key={apt.id} style={{ height: `${height}px` }} className="mb-1">
                          <AppointmentCard appointment={apt} />
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}