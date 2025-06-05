import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import MicrosoftLogo from '../../public/assets/icons/microsoft-ar21.svg';
import { MailIcon } from 'lucide-react';
import Header from '@/components/Header';

const Login = () => {
  const [username, setUsername] = useState('admin@usc.edu.au');
  const [password, setPassword] = useState('admin@usc.edu.au');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      if (username === 'admin@usc.edu.au' && password === 'admin@usc.edu.au') {
        login();
        setTimeout(() => navigate('/'), 0);
      } else {
        alert('Invalid credentials');
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleMicrosoftLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      login();
      navigate('/');
    }, 1500);
  };

  return (
    <>
      <Header />

      {/* Login Body */}
      <div className="relative flex items-center justify-center min-h-screen pt-20">
        {/* Background */}
        <div className="fixed inset-0 overflow-hidden z-0">
          <img
            src="/assets/images/usc_image.jpg"
            alt="University background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
        </div>


        {/* Card */}
        <div className="relative z-10 w-full max-w-sm px-6 py-8 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-white/20 mx-4">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-1">Welcome Back</h1>
            <p className="text-sm text-gray-600">University Dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-xs font-medium text-gray-700 mb-1">
                UniSC ID
              </label>
              <input
                id="username"
                type="text"
                placeholder="Your university ID"
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-xs font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Your password"
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-3 w-3 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-1.5 text-gray-700">
                  Remember me
                </label>
              </div>

              <a href="#" className="text-indigo-600 hover:text-indigo-500">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
            >
              {isLoading ? (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : 'Sign In'}
            </button>
          </form>

          {/* Microsoft Sign-In */}
          <div className="mt-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-4">
              <button
                onClick={handleMicrosoftLogin}
                disabled={isLoading}
                className={`w-full inline-flex justify-center items-center py-2 px-4 rounded-lg shadow-sm text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
              >
                <img src={MicrosoftLogo} alt="Microsoft Logo" className="w-16 h-8 mr-2" />
              </button>
            </div>
          </div>

          <div className="mt-6 text-center text-xs text-gray-500">
            <p>
              Need access?{' '}
              <a href="#" className="text-indigo-600 hover:text-indigo-500">
                Contact IT
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
