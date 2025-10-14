'use client';

import { Doctor } from '@/types';
import { Clock } from 'lucide-react';

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
    <div className="space-y-2">
      <select
        value={selectedDoctorId}
        onChange={(e) => onSelect(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        {doctors.map(doctor => (
          <option key={doctor.id} value={doctor.id}>
            {doctor.name} - {doctor.specialty}
          </option>
        ))}
      </select>
      {selectedDoctor && (
        <div className="text-sm text-gray-600 px-1">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>
              Working Hours: {selectedDoctor.workingHours.start} -{' '}
              {selectedDoctor.workingHours.end}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}