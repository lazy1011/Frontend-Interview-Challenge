// data/mockData.ts

// Define types inline to avoid import issues
interface Doctor {
  id: string;
  name: string;
  specialty: string;
  workingHours: {
    start: string;
    end: string;
  };
}

interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
}

interface Appointment {
  id: string;
  doctorId: string;
  patientId: string;
  startTime: string;
  endTime: string;
  type: 'Checkup' | 'Consultation' | 'Follow-up' | 'Procedure';
  status: string;
}

export const doctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Chen',
    specialty: 'Cardiology',
    workingHours: { start: '08:00', end: '17:00' }
  },
  {
    id: '2',
    name: 'Dr. James Wilson',
    specialty: 'Orthopedics',
    workingHours: { start: '09:00', end: '18:00' }
  },
  {
    id: '3',
    name: 'Dr. Emily Brown',
    specialty: 'Pediatrics',
    workingHours: { start: '08:00', end: '16:00' }
  }
];

export const patients: Patient[] = Array.from({ length: 50 }, (_, i) => ({
  id: `P${i + 1}`,
  name: `Patient ${i + 1}`,
  dateOfBirth: '1990-01-01'
}));

const generateAppointments = (): Appointment[] => {
  const types: Array<'Checkup' | 'Consultation' | 'Follow-up' | 'Procedure'> = 
    ['Checkup', 'Consultation', 'Follow-up', 'Procedure'];
  const appointments: Appointment[] = [];
  const today = new Date();
  
  doctors.forEach(doctor => {
    for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
      const date = new Date(today);
      date.setDate(today.getDate() + dayOffset);
      
      // Generate 3-5 appointments per doctor per day
      const numAppointments = 3 + Math.floor(Math.random() * 3);
      
      for (let i = 0; i < numAppointments; i++) {
        const hour = 8 + Math.floor(Math.random() * 8);
        const minute = Math.random() > 0.5 ? 0 : 30;
        const duration = [30, 60][Math.floor(Math.random() * 2)];
        
        const start = new Date(date);
        start.setHours(hour, minute, 0, 0);
        
        const end = new Date(start);
        end.setMinutes(end.getMinutes() + duration);
        
        appointments.push({
          id: `A${appointments.length + 1}`,
          doctorId: doctor.id,
          patientId: patients[Math.floor(Math.random() * patients.length)].id,
          startTime: start.toISOString(),
          endTime: end.toISOString(),
          type: types[Math.floor(Math.random() * types.length)],
          status: 'scheduled'
        });
      }
    }
  });
  
  return appointments;
};

export const appointments = generateAppointments();