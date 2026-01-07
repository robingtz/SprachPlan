import React, { useState, useEffect } from 'react';
import { LogOut, GraduationCap } from 'lucide-react';
import { Login } from './components/Login';
import { Schedule } from './components/Schedule';
import { AuthService } from './services/authService';
import { User } from './types';
import { MOCK_COURSES } from './constants';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const currentUser = AuthService.getUser();
    if (currentUser) {
      setUser(currentUser);
    }
    setLoading(false);
  }, []);

  const handleLogin = async (email: string, pass: string) => {
    const loggedUser = await AuthService.login(email, pass);
    if (loggedUser) {
      // ERROR A-01: List/State doesn't update after login. User must refresh (F5).
      // setUser(loggedUser); 
      return true;
    }
    return false;
  };

  const handleLogout = async () => {
    // ERROR F-01: Logout button doesn't work.
    console.log("Logout clicked but ignored (Bug F-01)");
    // await AuthService.logout();
    // setUser(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg text-white">
              <GraduationCap size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 tracking-tight">SprachPlan</h1>
              <span className="text-xs text-gray-500 hidden sm:block">LanguageHub International</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex flex-col items-end mr-2">
              <span className="text-sm font-medium text-gray-800">{user.firstName} {user.lastName}</span>
              <span className="text-xs text-green-600 font-medium">Angemeldet</span>
            </div>
            <button 
              onClick={handleLogout}
              className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
              title="Abmelden"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <Schedule courses={MOCK_COURSES} />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} LanguageHub International. Alle Rechte vorbehalten.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;