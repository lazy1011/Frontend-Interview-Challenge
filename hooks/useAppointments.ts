'use client';

import { useMemo } from 'react';
import { TimeSlot } from '@/domain/TimeSlot';
import { AppointmentService } from '@/services/appointmentService';

export function useAppointments(
  doctorId: string,
  date: Date,
  viewMode: 'day' | 'week',
  searchTerm?: string
) {
  const appointments = useMemo(() => {
    let apts;
    
    if (viewMode === 'day') {
      apts = AppointmentService.getAppointmentsByDoctorAndDate(doctorId, date);
    } else {
      apts = AppointmentService.getAppointmentsByDoctorAndWeek(doctorId, date);
    }

    // Apply search filter if provided
    if (searchTerm && searchTerm.trim()) {
      const lowerSearch = searchTerm.toLowerCase();
      apts = apts.filter(apt => {
        const patient = AppointmentService.getPatient(apt.patientId);
        return (
          patient?.name.toLowerCase().includes(lowerSearch) ||
          apt.type.toLowerCase().includes(lowerSearch) ||
          apt.id.toLowerCase().includes(lowerSearch)
        );
      });
    }

    return apts;
  }, [doctorId, date, viewMode, searchTerm]);

  const timeSlots = useMemo(() => TimeSlot.generateTimeSlots(date), [date]);

  return {
    appointments,
    timeSlots,
    loading: false,
    error: null
  };
}