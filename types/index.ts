export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  workingHours: {
    start: string;
    end: string;
  };
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  email?: string;
  phone?: string;
}

export interface Appointment {
  id: string;
  doctorId: string;
  patientId: string;
  startTime: string;
  endTime: string;
  type: 'Checkup' | 'Consultation' | 'Follow-up' | 'Procedure';
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
}

export type UserRole = 'front-desk' | 'doctor';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  doctorId?: string; // Only for doctor role
}