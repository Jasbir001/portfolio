import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Lock, User, AlertCircle } from 'lucide-react';

const Login = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If already authenticated, go directly to dashboard
    if (isAuthenticated) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    if (!usernameOrEmail.trim() || !password.trim()) {
      setError('Please fill in all fields.');
      setSubmitting(false);
      return;
    }

    const res = await login(usernameOrEmail, password);
    if (res.success) {
      navigate('/admin/dashboard');
    } else {
      setError(res.message);
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-slate-50 dark:bg-darkBg py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-md w-full space-y-8 glass-card p-8 rounded-2xl border border-slate-200/50 dark:border-darkBorder/50 text-left"
      >
        <div>
          <div className="w-12 h-12 bg-primary-100 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-center text-2xl font-display font-bold text-slate-900 dark:text-white">
            Admin Access Portal
          </h2>
          <p className="mt-2 text-center text-xs text-slate-500 dark:text-slate-400">
            Secure sign-in for portfolio and work telemetry dashboard.
          </p>
        </div>

        {error && (
          <div className="p-3 bg-rose-50 dark:bg-rose-950/20 text-rose-800 dark:text-rose-300 border border-rose-200/50 dark:border-rose-900/50 rounded-lg flex items-start space-x-2 text-sm">
            <AlertCircle className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md space-y-4">
            {/* Username or Email */}
            <div className="space-y-1.5">
              <label htmlFor="usernameOrEmail" className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Username or Email
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                  <User className="w-4 h-4" />
                </span>
                <input
                  id="usernameOrEmail"
                  name="usernameOrEmail"
                  type="text"
                  required
                  value={usernameOrEmail}
                  onChange={(e) => setUsernameOrEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 dark:border-darkBorder bg-slate-50 dark:bg-darkCard text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-primary-500 focus:bg-white dark:focus:bg-darkCard transition-all duration-300"
                  placeholder="admin or admin@example.com"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label htmlFor="password" className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Access Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 dark:border-darkBorder bg-slate-50 dark:bg-darkCard text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-primary-500 focus:bg-white dark:focus:bg-darkCard transition-all duration-300"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full glow-btn flex justify-center py-3 px-4 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold text-sm transition-all duration-300 disabled:opacity-50"
            >
              {submitting ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <span>Authenticate Access</span>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
