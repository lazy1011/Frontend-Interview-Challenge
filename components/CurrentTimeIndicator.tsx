'use client';

import { useEffect, useState } from 'react';

interface CurrentTimeIndicatorProps {
  date: Date;
}

export function CurrentTimeIndicator({ date }: CurrentTimeIndicatorProps) {
  const [position, setPosition] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const now = new Date();
    const viewDate = new Date(date);

    // Check if the indicator should be shown (same day)
    if (
      now.getDate() === viewDate.getDate() &&
      now.getMonth() === viewDate.getMonth() &&
      now.getFullYear() === viewDate.getFullYear()
    ) {
      const hours = now.getHours();
      const minutes = now.getMinutes();

      // Only show if within working hours (8 AM - 6 PM)
      if (hours >= 8 && hours < 18) {
        // Calculate position (each hour = ~80px, each 30min slot = 60px)
        const hoursSinceStart = hours - 8;
        const minuteOffset = (minutes / 60) * 120; // 120px per hour (2 slots of 60px)
        const totalOffset = (hoursSinceStart * 120) + minuteOffset;
        setPosition(totalOffset);
      } else {
        setPosition(null);
      }
    } else {
      setPosition(null);
    }
  }, [date, currentTime]);

  if (position === null) return null;

  return (
    <div
      className="absolute left-0 right-0 z-10 pointer-events-none"
      style={{ top: `${position}px` }}
    >
      <div className="flex items-center">
        <div className="w-3 h-3 bg-red-500 rounded-full shadow-lg" />
        <div className="flex-1 h-0.5 bg-red-500 shadow-lg" />
        <span className="ml-2 text-xs font-semibold text-red-500 bg-white dark:bg-gray-800 px-2 py-0.5 rounded shadow">
          {currentTime.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
          })}
        </span>
      </div>
    </div>
  );
}