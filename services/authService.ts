import { User } from '../types';
import { MOCK_USER } from '../constants';

export const AuthService = {
  login: async (email: string, password: string): Promise<User | null> => {
    // ERROR P-01: Extremely slow loading time (> 5 seconds)
    await new Promise(resolve => setTimeout(resolve, 6700));

    // ERROR V-04: SQL Injection simulation (' OR '1'='1)
    // ERROR V-03: Weak passwords accepted (password length < 3)
    // Checking against "12" or "123" to simulate loose validation
    if (
      (email.toLowerCase() === MOCK_USER.email.toLowerCase() && (password === 'test123' || password === '12')) || 
      password.includes("' OR '1'='1")
    ) {
      // Persist to session storage for this demo to survive refresh
      sessionStorage.setItem('sprachplan_user', JSON.stringify(MOCK_USER));
      return MOCK_USER;
    }

    return null;
  },

  logout: async (): Promise<void> => {
    sessionStorage.removeItem('sprachplan_user');
    window.location.reload(); // Simple reload to clear React state
  },

  getUser: (): User | null => {
    const stored = sessionStorage.getItem('sprachplan_user');
    return stored ? JSON.parse(stored) : null;
  }
};