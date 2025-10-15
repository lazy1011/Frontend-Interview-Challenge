'use client';

import { User as UserIcon, Users } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { users } from '@/data/mockData';

export function UserRoleSelector() {
  const { currentUser, setCurrentUser } = useUser();

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
        {currentUser.role === 'front-desk' ? (
          <Users className="w-4 h-4" />
        ) : (
          <UserIcon className="w-4 h-4" />
        )}
        <span className="font-medium">Role:</span>
      </div>
      <select
        value={currentUser.id}
        onChange={(e) => {
          const user = users.find(u => u.id === e.target.value);
          if (user) setCurrentUser(user);
        }}
        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                   bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                   transition-colors"
      >
        {users.map(user => (
          <option key={user.id} value={user.id}>
            {user.name} ({user.role === 'front-desk' ? 'Front Desk' : 'Doctor'})
          </option>
        ))}
      </select>
    </div>
  );
}