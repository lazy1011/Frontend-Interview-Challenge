import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-gray-900">
          Hospital Appointment System
        </h1>
        <p className="text-gray-600">
          Internal scheduling system for medical staff
        </p>
        <Link
          href="/schedule"
          className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          View Schedules
        </Link>
      </div>
    </div>
  );
}