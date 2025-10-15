'use client';

import { Appointment } from '@/types';
import { AppointmentService } from '@/services/appointmentService';
import { Clock, User } from 'lucide-react';

const appointmentColors = {
  Checkup: 'bg-blue-500 dark:bg-blue-600',
  Consultation: 'bg-green-500 dark:bg-green-600',
  'Follow-up': 'bg-orange-500 dark:bg-orange-600',
  Procedure: 'bg-purple-500 dark:bg-purple-600'
};

interface AppointmentCardProps {
  appointment: Appointment;
  compact?: boolean;
}

export function AppointmentCard({ appointment, compact = false }: AppointmentCardProps) {
  const patient = AppointmentService.getPatient(appointment.patientId);
  const start = new Date(appointment.startTime);
  const end = new Date(appointment.endTime);
  const duration = Math.round((end.getTime() - start.getTime()) / (1000 * 60));

  if (compact) {
    return (
      <div
        className={`${appointmentColors[appointment.type]} text-white p-1.5 rounded text-xs h-full cursor-pointer hover:opacity-90 transition-opacity`}
        title={`${patient?.name} - ${appointment.type}`}
      >
        <div className="font-semibold truncate">{patient?.name}</div>
        <div className="opacity-90 truncate">{appointment.type}</div>
      </div>
    );
  }

  return (
    <div
      className={`${appointmentColors[appointment.type]} text-white p-3 rounded-lg shadow-md h-full cursor-pointer hover:shadow-lg transition-all`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4" />
          <div className="font-semibold truncate">{patient?.name}</div>
        </div>
        <div className="text-xs opacity-75">{appointment.id}</div>
      </div>
      
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-sm opacity-90">
          <Clock className="w-3 h-3" />
          <span>{duration} minutes</span>
        </div>
        <div className="text-sm font-medium">{appointment.type}</div>
        {appointment.notes && (
          <div className="text-xs opacity-75 italic mt-2">{appointment.notes}</div>
        )}
      </div>
    </div>
  );
}