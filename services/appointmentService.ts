import { appointments, patients } from '@/data/mockData';
import { Appointment, Patient } from '@/types';

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

  static getPatient(patientId: string): Patient | undefined {
    return patients.find(p => p.id === patientId);
  }

  static getAllAppointments(): Appointment[] {
    return appointments;
  }
}