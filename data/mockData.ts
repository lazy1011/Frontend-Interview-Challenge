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

// Uniform patient names from Patient 1 to Patient 50
export const patients: Patient[] = Array.from({ length: 50 }, (_, i) => ({
  id: `P${i + 1}`,
  name: `Patient ${i + 1}`,
  dateOfBirth: '1990-01-01',
  email: `patient${i + 1}@email.com`,
  phone: `555-${String(i + 101).padStart(4, '0')}`
}));

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
          patientId: patients[Math.floor(Math.random() * patients.length)].id,
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