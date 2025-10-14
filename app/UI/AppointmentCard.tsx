'use client';

import { Appointment } from '@/types';
import { AppointmentService } from '@/services/appointmentService';

const appointmentColors = {
  Checkup: 'bg-blue-500',
  Consultation: 'bg-green-500',
  'Follow-up': 'bg-orange-500',
  Procedure: 'bg-purple-500'
};

interface AppointmentCardProps {
  appointment: Appointment;
}

export function AppointmentCard({ appointment }: AppointmentCardProps) {
  const patient = AppointmentService.getPatient(appointment.patientId);
  const start = new Date(appointment.startTime);
  const end = new Date(appointment.endTime);
  const duration = Math.round((end.getTime() - start.getTime()) / (1000 * 60));

  return (
    <div
      className={`${appointmentColors[appointment.type]} text-white p-2 rounded text-xs h-full`}
    >
      <div className="font-semibold truncate">{patient?.name}</div>
      <div className="opacity-90">{appointment.type}</div>
      <div className="opacity-75">{duration} min</div>
    </div>
  );
}