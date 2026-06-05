import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Info Section */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-lg text-white">MERN Stack Developer</h3>
            <p className="text-sm text-slate-400 max-w-xs leading-relaxed">
              Crafting production-ready full-stack applications with React, Node.js, Express, MongoDB, and modern web protocols.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="GitHub Profile"
              >
                <FaGithub className="w-5 h-5" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="LinkedIn Profile"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a 
                href="mailto:developer@example.com" 
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="Email Address"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold text-white">Navigation</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <Link to="/" className="text-slate-400 hover:text-white transition-colors">Home</Link>
              <Link to="/about" className="text-slate-400 hover:text-white transition-colors">About</Link>
              <Link to="/skills" className="text-slate-400 hover:text-white transition-colors">Skills</Link>
              <Link to="/projects" className="text-slate-400 hover:text-white transition-colors">Projects</Link>
              <Link to="/experience" className="text-slate-400 hover:text-white transition-colors">Experience</Link>
              <Link to="/contact" className="text-slate-400 hover:text-white transition-colors">Contact</Link>
            </div>
          </div>

          {/* Hire / CTA */}
          <div className="space-y-4 flex flex-col justify-between">
            <div>
              <h4 className="font-display font-semibold text-white">Have a Project?</h4>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">
                Submit your project details directly and check live development milestones.
              </p>
              <Link 
                to="/hire-me" 
                className="inline-block bg-primary-600 hover:bg-primary-700 text-white text-xs font-semibold px-4 py-2 rounded transition-all duration-300"
              >
                REQUEST WORK
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500">
          <p>© {currentYear} Developer Portfolio. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 sm:mt-0 items-center">
            <span>Built with React, Vite & Tailwind CSS</span>
            <Link 
              to="/login" 
              className="text-slate-600 hover:text-slate-400 transition-colors flex items-center space-x-1"
              aria-label="Admin Portal"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Admin</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
