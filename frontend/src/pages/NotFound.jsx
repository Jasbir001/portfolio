import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Compass } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-slate-50 dark:bg-darkBg py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-md w-full space-y-6 text-center glass-card p-8 rounded-2xl border border-slate-200/50 dark:border-darkBorder/50"
      >
        <div className="w-16 h-16 bg-primary-100 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-bounce">
          <Compass className="w-8 h-8" />
        </div>
        
        <h1 className="text-4xl font-display font-bold text-slate-900 dark:text-white">
          404 - Lost in Space
        </h1>
        
        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
          The page you are looking for doesn't exist, was moved, or has been deleted.
        </p>

        <div>
          <Link
            to="/"
            className="glow-btn inline-flex items-center justify-center space-x-2 py-3 px-6 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold text-sm transition-all duration-300"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
