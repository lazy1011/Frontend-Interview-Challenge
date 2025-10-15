'use client';

import { Doctor } from '@/types';
import { Clock, Stethoscope } from 'lucide-react';

interface DoctorSelectorProps {
  doctors: Doctor[];
  selectedDoctorId: string;
  onSelect: (id: string) => void;
}

export function DoctorSelector({
  doctors,
  selectedDoctorId,
  onSelect
}: DoctorSelectorProps) {
  const selectedDoctor = doctors.find(d => d.id === selectedDoctorId);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
        <Stethoscope className="w-4 h-4" />
        <span>Select Doctor</span>
      </div>
      <select
        value={selectedDoctorId}
        onChange={(e) => onSelect(e.target.value)}
        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                   bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                   transition-colors shadow-sm"
      >
        {doctors.map(doctor => (
          <option key={doctor.id} value={doctor.id}>
            {doctor.name} - {doctor.specialty}
          </option>
        ))}
      </select>
      {selectedDoctor && (
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 px-1">
          <Clock className="w-4 h-4" />
          <span>
            Working Hours: {selectedDoctor.workingHours.start} - {selectedDoctor.workingHours.end}
          </span>
        </div>
      )}
    </div>
  );
}