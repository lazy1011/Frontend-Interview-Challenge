'use client';

import { useMemo } from 'react';
import { Appointment } from '@/types';
import { TimeSlot } from '@/domain/TimeSlot';
import { AppointmentService } from '@/services/appointmentService';

export function useAppointments(
  doctorId: string,
  date: Date,
  viewMode: 'day' | 'week'
) {
  const appointments = useMemo(() => {
    if (viewMode === 'day') {
      return AppointmentService.getAppointmentsByDoctorAndDate(doctorId, date);
    } else {
      return AppointmentService.getAppointmentsByDoctorAndWeek(doctorId, date);
    }
  }, [doctorId, date, viewMode]);

  const timeSlots = useMemo(() => TimeSlot.generateTimeSlots(date), [date]);

  return {
    appointments,
    timeSlots,
    loading: false,
    error: null
  };
}