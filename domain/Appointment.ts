import { Appointment as IAppointment } from '@/types';

export class AppointmentModel {
  constructor(private appointment: IAppointment) {}

  get duration(): number {
    const start = new Date(this.appointment.startTime);
    const end = new Date(this.appointment.endTime);
    return Math.round((end.getTime() - start.getTime()) / (1000 * 60));
  }

  get startDate(): Date {
    return new Date(this.appointment.startTime);
  }

  get endDate(): Date {
    return new Date(this.appointment.endTime);
  }

  isOnDate(date: Date): boolean {
    const aptDate = this.startDate;
    return (
      aptDate.getFullYear() === date.getFullYear() &&
      aptDate.getMonth() === date.getMonth() &&
      aptDate.getDate() === date.getDate()
    );
  }
}