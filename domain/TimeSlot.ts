import { Appointment } from '@/types';

export class TimeSlot {
  constructor(
    public start: Date,
    public end: Date
  ) {}

  overlaps(appointment: Appointment): boolean {
    const aptStart = new Date(appointment.startTime);
    const aptEnd = new Date(appointment.endTime);
    
    return aptStart < this.end && aptEnd > this.start;
  }

  static generateTimeSlots(date: Date): TimeSlot[] {
    const slots: TimeSlot[] = [];
    
    for (let hour = 8; hour < 18; hour++) {
      for (let minute of [0, 30]) {
        const start = new Date(date);
        start.setHours(hour, minute, 0, 0);
        
        const end = new Date(start);
        end.setMinutes(end.getMinutes() + 30);
        
        slots.push(new TimeSlot(start, end));
      }
    }
    
    return slots;
  }
}