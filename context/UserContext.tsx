'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types';
import { users } from '@/data/mockData';

interface UserContextType {
  currentUser: User;
  setCurrentUser: (user: User) => void;
  canViewAllDoctors: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User>(users[0]); // Default: Front desk
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('currentUser');
    if (stored) {
      try {
        const user = JSON.parse(stored);
        setCurrentUser(user);
      } catch (e) {
        console.error('Error parsing stored user:', e);
      }
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
  }, [currentUser, mounted]);

  const canViewAllDoctors = currentUser.role === 'front-desk';

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, canViewAllDoctors }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}