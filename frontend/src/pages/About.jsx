import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Target, BookOpen, Calendar } from 'lucide-react';

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 bg-slate-50 dark:bg-darkBg"
    >
      {/* Page Title */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 dark:text-white">
          About Me
        </h2>
        <div className="w-12 h-1 bg-primary-500 mx-auto rounded-full" />
      </div>

      {/* Intro Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <h3 className="font-display font-semibold text-xl text-slate-800 dark:text-slate-100">
            Who I Am
          </h3>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base">
            I am a results-driven Full Stack Software Developer in building scalable backend web servers and smooth, performant user interfaces. With hands-on internship experience in production settings, I write clean, maintainable code following security best practices.
          </p>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base">
            My development approach centers around user experience, database normalization, and network performance. I enjoy solving complex architectural challenges, refactoring database schemas, and setting up secure, decoupled communication pipes.
          </p>
        </div>

        {/* Quick Facts Card */}
        <div className="glass-card p-6 rounded-xl space-y-6">
          <h4 className="font-display font-semibold text-slate-900 dark:text-white text-lg border-b border-slate-100 dark:border-darkBorder/40 pb-2">
            Quick Facts
          </h4>
          <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
            <li className="flex justify-between">
              <span className="font-semibold text-slate-800 dark:text-slate-100">Location:</span>
              <span>Remote / Hybrid, India</span>
            </li>
            <li className="flex justify-between">
              <span className="font-semibold text-slate-800 dark:text-slate-100">Specialization:</span>
              <span>MERN Stack (JS/TS)</span>
            </li>
            <li className="flex justify-between">
              <span className="font-semibold text-slate-800 dark:text-slate-100">Education:</span>
              <span>B.Tech in Computer Science</span>
            </li>
            <li className="flex justify-between">
              <span className="font-semibold text-slate-800 dark:text-slate-100">Availability:</span>
              <span>Open for Roles & Projects</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Journey & Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
        
        {/* Journey Card */}
        <div className="glass-card p-6 rounded-xl space-y-4">
          <div className="flex items-center space-x-3 text-primary-600 dark:text-primary-400">
            <BookOpen className="w-6 h-6" />
            <h3 className="font-display font-semibold text-lg text-slate-900 dark:text-white">
              My MERN Journey
            </h3>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            I began building websites using standard HTML, CSS, and vanilla JS, but quickly discovered the power of React for state management. Transitioning to full-stack was a natural step. By learning Node.js, Express, and MongoDB, I unlocked the ability to build complete web products from scratch, handle authorization securely, and architect RESTful APIs.
          </p>
        </div>

        {/* Career Goals */}
        <div className="glass-card p-6 rounded-xl space-y-4">
          <div className="flex items-center space-x-3 text-accent-500 dark:text-accent-400">
            <Target className="w-6 h-6" />
            <h3 className="font-display font-semibold text-lg text-slate-900 dark:text-white">
              Career Goals
            </h3>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            My goal is to grow into a Senior Full Stack Architect, contributing to high-throughput platforms. I am eager to learn and implement microservices architecture, advanced message queuing (like RabbitMQ/Kafka), and containerized deployments using Docker and Kubernetes to solve large-scale distribution challenges.
          </p>
        </div>

      </div>
    </motion.div>
  );
};

export default About;
