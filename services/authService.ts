import { User } from '../types';

const API_BASE = '/api';

export const AuthService = {
  login: async (email: string, password: string): Promise<User | null> => {
    // ERROR P-01: Extremely slow loading time (> 5 seconds)
    // TEMPORARILY DISABLED FOR TESTING
    // await new Promise(resolve => setTimeout(resolve, 6700));
    
    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Important for session cookies
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        return null;
      }

      const user = await response.json();
      // Store user in sessionStorage for quick access
      sessionStorage.setItem('sprachplan_user', JSON.stringify(user));
      return user;
    } catch (error) {
      console.error('Login error:', error);
      return null;
    }
  },

  logout: async (): Promise<void> => {
    try {
      await fetch(`${API_BASE}/auth/logout`, {
        method: 'POST',
        credentials: 'include'
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
    
    sessionStorage.removeItem('sprachplan_user');
    window.location.reload();
  },

  getUser: (): User | null => {
    const stored = sessionStorage.getItem('sprachplan_user');
    return stored ? JSON.parse(stored) : null;
  },

  // Check if user is authenticated via backend
  checkAuth: async (): Promise<User | null> => {
    try {
      const response = await fetch(`${API_BASE}/auth/me`, {
        credentials: 'include'
      });

      if (!response.ok) {
        sessionStorage.removeItem('sprachplan_user');
        return null;
      }

      const user = await response.json();
      sessionStorage.setItem('sprachplan_user', JSON.stringify(user));
      return user;
    } catch (error) {
      console.error('Auth check error:', error);
      return null;
    }
  }
};