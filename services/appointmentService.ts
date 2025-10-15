import { appointments, patients, doctors } from '@/data/mockData';
import { Appointment, Patient, Doctor } from '@/types';

export class AppointmentService {
  static getAppointmentsByDoctorAndDate(
    doctorId: string,
    date: Date
  ): Appointment[] {
    return appointments.filter(apt => {
      const aptDate = new Date(apt.startTime);
      return (
        apt.doctorId === doctorId &&
        aptDate.getFullYear() === date.getFullYear() &&
        aptDate.getMonth() === date.getMonth() &&
        aptDate.getDate() === date.getDate()
      );
    });
  }

  static getAppointmentsByDoctorAndWeek(
    doctorId: string,
    startDate: Date
  ): Appointment[] {
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 7);

    return appointments.filter(apt => {
      const aptDate = new Date(apt.startTime);
      return apt.doctorId === doctorId && aptDate >= startDate && aptDate < endDate;
    });
  }

  static searchAppointments(
    searchTerm: string,
    doctorId?: string
  ): Appointment[] {
    const lowerSearch = searchTerm.toLowerCase();
    
    return appointments.filter(apt => {
      if (doctorId && apt.doctorId !== doctorId) return false;
      
      const patient = this.getPatient(apt.patientId);
      const doctor = this.getDoctor(apt.doctorId);
      
      return (
        patient?.name.toLowerCase().includes(lowerSearch) ||
        doctor?.name.toLowerCase().includes(lowerSearch) ||
        apt.type.toLowerCase().includes(lowerSearch) ||
        apt.id.toLowerCase().includes(lowerSearch)
      );
    });
  }

  static getPatient(patientId: string): Patient | undefined {
    return patients.find(p => p.id === patientId);
  }

  static getDoctor(doctorId: string): Doctor | undefined {
    return doctors.find(d => d.id === doctorId);
  }

  static getAllAppointments(): Appointment[] {
    return appointments;
  }
}