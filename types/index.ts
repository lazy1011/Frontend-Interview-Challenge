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
}

export interface Appointment {
  id: string;
  doctorId: string;
  patientId: string;
  startTime: string;
  endTime: string;
  type: 'Checkup' | 'Consultation' | 'Follow-up' | 'Procedure';
  status: string;
}