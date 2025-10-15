'use client';

import { useState } from 'react';
import { ScheduleView } from '@/components/ScheduleView';
import { UserRoleSelector } from '@/components/UserRoleSelector';
import { ThemeToggle } from '@/components/ThemeToggle';
import { 
  Calendar, 
  Clock, 
  Users, 
  CheckCircle, 
  Shield,
  Sparkles,
  Activity
} from 'lucide-react';

function LandingPage({ onEnter }: { onEnter: () => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Theme Toggle in corner */}
        <div className="absolute top-6 right-6 z-10">
          <ThemeToggle />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-2xl shadow-xl">
                <Calendar className="w-16 h-16 text-white" />
              </div>
            </div>

            <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 dark:text-white mb-6">
              MediSchedule <span className="text-blue-600 dark:text-blue-400">Pro</span>
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300 mb-4 max-w-2xl mx-auto">
              Advanced Healthcare Appointment Management System
            </p>

            <p className="text-lg text-gray-500 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
              Streamline your medical practice with intelligent scheduling, real-time updates,
              and comprehensive appointment tracking. Built for modern healthcare professionals.
            </p>

            <button
              onClick={onEnter}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              <Sparkles className="w-5 h-5" />
              Launch Application
            </button>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Powerful Features for Healthcare Teams
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-blue-100 dark:bg-blue-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Multi-View Scheduling
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Switch between daily and weekly views for optimal schedule management. Perfect for both quick checks and long-term planning.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-green-100 dark:bg-green-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Activity className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Real-Time Indicator
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Red line shows current time in day view, helping you track ongoing and upcoming appointments at a glance.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-purple-100 dark:bg-purple-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Smart Search & Filter
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Instantly find appointments by patient name, appointment type, or ID. Lightning-fast results as you type.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-orange-100 dark:bg-orange-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Role-Based Access
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Front desk staff view all doctors' schedules. Doctors see only their own appointments. Secure and efficient.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-pink-100 dark:bg-pink-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-pink-600 dark:text-pink-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Color-Coded Types
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Checkups, consultations, follow-ups, and procedures each have distinct colors for instant visual recognition.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-indigo-100 dark:bg-indigo-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <CheckCircle className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Dark Mode Support
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Easy on the eyes with full dark mode support. Toggle between light and dark themes instantly.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">100+</div>
              <div className="text-blue-100">Daily Appointments</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">3</div>
              <div className="text-blue-100">Specialties</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">50+</div>
              <div className="text-blue-100">Active Patients</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-blue-100">System Uptime</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Ready to Transform Your Practice?
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Join modern healthcare facilities using MediSchedule Pro
        </p>
        <button
          onClick={onEnter}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
        >
          Get Started Now
        </button>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2024 MediSchedule Pro. Built with ❤️ for Healthcare Professionals.
          </p>
        </div>
      </footer>
    </div>
  );
}

function MainApp() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2 rounded-lg">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  MediSchedule Pro
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Advanced Appointment Management
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <UserRoleSelector />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ScheduleView />
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 mt-12 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            © 2024 MediSchedule Pro. Professional Healthcare Scheduling System.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function Home() {
  const [showSchedule, setShowSchedule] = useState(false);

  return showSchedule ? <MainApp /> : <LandingPage onEnter={() => setShowSchedule(true)} />;
}