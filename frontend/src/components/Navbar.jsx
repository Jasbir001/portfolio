import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { Menu, X, Sun, Moon, LogOut, Code } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/skills', label: 'Skills' },
    { path: '/projects', label: 'Projects' },
    { path: '/experience', label: 'Experience' },
    { path: '/contact', label: 'Contact' },
  ];

  const activeClassName = ({ isActive }) =>
    `text-sm font-medium transition-colors ${
      isActive
        ? 'text-primary-600 dark:text-primary-400 font-semibold'
        : 'text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400'
    }`;

  const activeMobileClassName = ({ isActive }) =>
    `block py-2 px-3 rounded-md text-base font-medium transition-colors ${
      isActive
        ? 'bg-primary-50 dark:bg-primary-950/30 text-primary-600 dark:text-primary-400'
        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-darkCard/50'
    }`;

  return (
    <nav className="sticky top-0 z-40 w-full glass-navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="p-2 bg-primary-600 rounded-lg text-white">
              <Code className="w-5 h-5" />
            </div>
            <span className="font-display font-bold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300">
              DevPortfolio
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <NavLink key={link.path} to={link.path} className={activeClassName}>
                {link.label}
              </NavLink>
            ))}
            
            {isAuthenticated && (
              <NavLink to="/admin/dashboard" className={activeClassName}>
                Dashboard
              </NavLink>
            )}

            <Link
              to="/hire-me"
              className="bg-primary-600 hover:bg-primary-700 text-white text-xs px-4 py-2 rounded-md font-semibold tracking-wider transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              HIRE ME
            </Link>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-darkCard transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Logout if authenticated */}
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="p-2 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors"
                title="Logout Admin"
              >
                <LogOut className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-darkCard transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-darkCard focus:outline-none transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-darkBorder bg-white/95 dark:bg-darkBg/95 backdrop-blur-md">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={activeMobileClassName}
              >
                {link.label}
              </NavLink>
            ))}

            {isAuthenticated && (
              <NavLink
                to="/admin/dashboard"
                onClick={() => setIsOpen(false)}
                className={activeMobileClassName}
              >
                Dashboard
              </NavLink>
            )}

            <div className="pt-4 pb-2 px-3 border-t border-slate-200 dark:border-darkBorder flex flex-col space-y-2">
              <Link
                to="/hire-me"
                onClick={() => setIsOpen(false)}
                className="bg-primary-600 hover:bg-primary-700 text-white text-center py-2 rounded-md font-semibold tracking-wider transition-all duration-300"
              >
                HIRE ME
              </Link>
              {isAuthenticated && (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    handleLogout();
                  }}
                  className="flex items-center justify-center space-x-2 border border-rose-500 text-rose-500 py-2 rounded-md font-semibold transition-colors hover:bg-rose-50 dark:hover:bg-rose-950/10"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
