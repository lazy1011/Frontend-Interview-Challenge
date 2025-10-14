'use client';

import { Appointment } from '@/types';
import { TimeSlot } from '@/domain/TimeSlot';
import { AppointmentCard } from '../app/UI/AppointmentCard';

interface DayViewProps {
  doctorId: string;
  date: Date;
  appointments: Appointment[];
  timeSlots: TimeSlot[];
}

export function DayView({ appointments, timeSlots }: DayViewProps) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <div className="min-w-[300px]">
          {timeSlots.map((slot, idx) => {
            const slotAppointments = appointments.filter(apt =>
              slot.overlaps(apt)
            );
            const hour = slot.start.getHours();
            const minute = slot.start.getMinutes();
            const timeLabel = `${hour.toString().padStart(2, '0')}:${minute
              .toString()
              .padStart(2, '0')}`;

            return (
              <div
                key={idx}
                className="flex border-b border-gray-200 hover:bg-gray-50"
              >
                <div className="w-20 p-2 text-sm font-medium text-gray-600 border-r border-gray-200">
                  {timeLabel}
                </div>
                <div className="flex-1 p-1 min-h-[60px] relative">
                  {slotAppointments.map(apt => {
                    const aptStart = new Date(apt.startTime);
                    const aptEnd = new Date(apt.endTime);
                    const startMinute = aptStart.getMinutes();
                    const durationMinutes = Math.round(
                      (aptEnd.getTime() - aptStart.getTime()) / (1000 * 60)
                    );
                    const height = Math.max(durationMinutes, 30);

                    // Only render if appointment starts in this slot
                    if (
                      aptStart.getHours() === hour &&
                      startMinute === minute
                    ) {
                      return (
                        <div key={apt.id} style={{ height: `${height}px` }}>
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