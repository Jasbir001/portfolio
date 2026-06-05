import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, FileText } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Home = () => {
  const titles = [
    'MERN Stack Developer',
    'React & Node.js Developer',
    'Full Stack Engineer',
    'Open Source Contributor',
    'Frontend-Focused MERN Developer',
    'JavaScript Developer',
    'Building Real-World Web Apps',
  ];

  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const pauseDuration = 2000;

  useEffect(() => {
    let timer;
    const currentFullTitle = titles[currentTitleIndex];

    if (isDeleting) {
      timer = setTimeout(() => {
        setDisplayText(currentFullTitle.substring(0, displayText.length - 1));
      }, deletingSpeed);
    } else {
      timer = setTimeout(() => {
        setDisplayText(currentFullTitle.substring(0, displayText.length + 1));
      }, typingSpeed);
    }

    if (!isDeleting && displayText === currentFullTitle) {
      timer = setTimeout(() => setIsDeleting(true), pauseDuration);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setCurrentTitleIndex((prevIndex) => (prevIndex + 1) % titles.length);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentTitleIndex]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-[calc(100vh-4rem)] flex items-center bg-slate-50 dark:bg-darkBg relative overflow-hidden"
    >
      {/* Visual background patterns */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl animate-pulse-slow pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10 w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          
          {/* Text Content */}
          <div className="md:col-span-7 space-y-6 text-left order-2 md:order-1">
            <span className="text-primary-600 dark:text-primary-400 font-display font-semibold tracking-wider text-sm uppercase">
              Welcome to my portfolio
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-slate-900 dark:text-white leading-tight">
              Hi, I'm a <br />
              <span className="text-gradient min-h-[1.5em] inline-block">
                {displayText}
                <span className="animate-ping">|</span>
              </span>
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg max-w-xl leading-relaxed">
              I build scalable, high-performance web applications using MongoDB, Express.js, React.js, and Node.js. Specializing in secure architectures, API integrations, and smooth user interfaces.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                to="/hire-me"
                className="glow-btn bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-all duration-300"
              >
                <span>Hire Me</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="/resume.pdf"
                download
                className="border border-slate-300 dark:border-darkBorder bg-white/50 dark:bg-darkCard/50 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-darkCard px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-colors duration-300"
              >
                <FileText className="w-4 h-4" />
                <span>Download Resume</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-6 pt-4">
              <span className="text-slate-400 dark:text-slate-500 font-display text-sm font-semibold tracking-wider uppercase">
                Find Me:
              </span>
              <div className="flex space-x-4">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-slate-100 dark:bg-darkCard text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  aria-label="GitHub Profile"
                >
                  <FaGithub className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-slate-100 dark:bg-darkCard text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <FaLinkedin className="w-5 h-5" />
                </a>
                <a
                  href="mailto:developer@example.com"
                  className="p-2 rounded-full bg-slate-100 dark:bg-darkCard text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  aria-label="Send Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Profile Image (Glow container) */}
          <div className="md:col-span-5 flex justify-center order-1 md:order-2">
            <div className="relative group">
              {/* Outer soft glowing background */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full blur opacity-40 group-hover:opacity-70 transition duration-1000 group-hover:duration-300 animate-pulse-slow"></div>
              
              {/* Inner card containing the avatar */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-4 border-white dark:border-darkBorder bg-slate-150 dark:bg-darkCard flex items-center justify-center">
                <img
                  src="/assets/profile_avatar.png"
                  alt="MERN Developer Profile"
                  className="w-full h-full object-cover transform scale-105 hover:scale-100 transition-transform duration-700"
                  onError={(e) => {
                    // Fail-safe if image loader breaks
                    e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80';
                  }}
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
};

export default Home;
