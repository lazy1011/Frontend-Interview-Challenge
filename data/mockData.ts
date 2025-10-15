import { Doctor, Patient, Appointment, User } from '@/types';

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

export const patients: Patient[] = [
  { id: 'P1', name: 'John Smith', dateOfBirth: '1985-03-15', email: 'john.smith@email.com', phone: '555-0101' },
  { id: 'P2', name: 'Emma Johnson', dateOfBirth: '1990-07-22', email: 'emma.j@email.com', phone: '555-0102' },
  { id: 'P3', name: 'Michael Brown', dateOfBirth: '1978-11-30', email: 'mbrown@email.com', phone: '555-0103' },
  { id: 'P4', name: 'Sophia Davis', dateOfBirth: '1995-02-14', email: 'sophia.d@email.com', phone: '555-0104' },
  { id: 'P5', name: 'James Wilson', dateOfBirth: '1982-09-08', email: 'jwilson@email.com', phone: '555-0105' },
  { id: 'P6', name: 'Olivia Martinez', dateOfBirth: '1988-05-19', email: 'olivia.m@email.com', phone: '555-0106' },
  { id: 'P7', name: 'William Anderson', dateOfBirth: '1975-12-03', email: 'wanderson@email.com', phone: '555-0107' },
  { id: 'P8', name: 'Ava Taylor', dateOfBirth: '1992-08-27', email: 'ava.t@email.com', phone: '555-0108' },
  { id: 'P9', name: 'Liam Thomas', dateOfBirth: '1987-04-11', email: 'liam.t@email.com', phone: '555-0109' },
  { id: 'P10', name: 'Isabella Moore', dateOfBirth: '1993-10-25', email: 'isabella.m@email.com', phone: '555-0110' },
  ...Array.from({ length: 40 }, (_, i) => ({
    id: `P${i + 11}`,
    name: `Patient ${i + 11}`,
    dateOfBirth: '1990-01-01',
    email: `patient${i + 11}@email.com`,
    phone: `555-${String(i + 111).padStart(4, '0')}`
  }))
];

const generateAppointments = (): Appointment[] => {
  const types: Array<'Checkup' | 'Consultation' | 'Follow-up' | 'Procedure'> = 
    ['Checkup', 'Consultation', 'Follow-up', 'Procedure'];
  const appointments: Appointment[] = [];
  const today = new Date();
  
  // Start from Monday of current week
  const monday = new Date(today);
  monday.setDate(today.getDate() - today.getDay() + 1);
  
  doctors.forEach(doctor => {
    // Generate appointments for each day of the week
    for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + dayOffset);
      
      // Generate 4-6 appointments per doctor per day
      const numAppointments = 4 + Math.floor(Math.random() * 3);
      const usedTimes = new Set<string>();
      
      for (let i = 0; i < numAppointments; i++) {
        let hour, minute, timeKey;
        let attempts = 0;
        
        // Find an available time slot
        do {
          hour = 8 + Math.floor(Math.random() * 9); // 8 AM to 4 PM
          minute = Math.random() > 0.5 ? 0 : 30;
          timeKey = `${hour}-${minute}`;
          attempts++;
        } while (usedTimes.has(timeKey) && attempts < 20);
        
        if (attempts >= 20) continue; // Skip if no slot found
        
        usedTimes.add(timeKey);
        
        const duration = Math.random() > 0.5 ? 30 : 60;
        
        const start = new Date(date);
        start.setHours(hour, minute, 0, 0);
        
        const end = new Date(start);
        end.setMinutes(end.getMinutes() + duration);
        
        appointments.push({
          id: `A${appointments.length + 1}`,
          doctorId: doctor.id,
          patientId: patients[Math.floor(Math.random() * Math.min(20, patients.length))].id,
          startTime: start.toISOString(),
          endTime: end.toISOString(),
          type: types[Math.floor(Math.random() * types.length)],
          status: 'scheduled',
          notes: Math.random() > 0.7 ? 'Follow-up required' : undefined
        });
      }
    }
  });
  
  return appointments.sort((a, b) => 
    new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
  );
};

export const appointments = generateAppointments();

// Mock users for role-based access
export const users: User[] = [
  {
    id: 'U1',
    name: 'Admin User',
    role: 'front-desk'
  },
  {
    id: 'U2',
    name: 'Dr. Sarah Chen',
    role: 'doctor',
    doctorId: '1'
  },
  {
    id: 'U3',
    name: 'Dr. James Wilson',
    role: 'doctor',
    doctorId: '2'
  },
  {
    id: 'U4',
    name: 'Dr. Emily Brown',
    role: 'doctor',
    doctorId: '3'
  }
];