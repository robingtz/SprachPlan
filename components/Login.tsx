import React, { useState } from 'react';
import { User, Lock, Mail, AlertCircle } from 'lucide-react';
import { Button } from './Button';

interface LoginProps {
  onLogin: (email: string, pass: string) => Promise<boolean>;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const success = await onLogin(email, password);
      if (!success) {
        setError('Login fehlgeschlagen. Bitte überprüfen Sie Ihre Daten.');
      }
    } catch (err) {
      setError('Ein Fehler ist aufgetreten.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    alert("Hinweis: In dieser Demo-Version ist kein echter Passwort-Reset möglich. Bitte nutzen Sie 'test123' als Passwort.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
            <User size={32} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">SprachPlan</h1>
          <p className="text-gray-500 mt-2">Willkommen bei LanguageHub International</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 flex items-start text-red-700 text-sm rounded-r">
            <AlertCircle size={18} className="mr-2 mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
              E-Mail Adresse
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Mail size={18} />
              </div>
              {/* ERROR V-02: type="text" allows invalid emails */}
              {/* ERROR V-01: 'required' attribute removed */}
              <input
                id="email"
                type="text" 
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="max.mustermann@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
              Passwort
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Lock size={18} />
              </div>
              {/* ERROR V-01: 'required' attribute removed */}
              <input
                id="password"
                type="password"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-end mt-2">
              <button 
                type="button" 
                onClick={handleForgotPassword}
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
              >
                Passwort vergessen?
              </button>
            </div>
          </div>

          <Button 
            type="submit" 
            fullWidth 
            disabled={isLoading}
            className="h-11 text-lg shadow-lg shadow-blue-500/30"
          >
            {isLoading ? 'Wird angemeldet...' : 'Anmelden'}
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} LanguageHub International
        </div>
      </div>
    </div>
  );
};