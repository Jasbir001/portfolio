import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Target, BookOpen, Calendar } from 'lucide-react';

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12 space-y-12 bg-slate-50 dark:bg-darkBg"
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
            I am a Full Stack Developer focused on building practical web applications and solving real-world problems. My journey started after completing my BCA, followed by 8–9 months of professional web development training in Chandigarh, where I gained hands-on experience with modern frontend and backend technologies.
          </p>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base">
            During my training and internship, I worked on full-stack applications using the MERN stack and learned how real software development teams build, test, and deploy products. Over time, I realized that successful development is not about writing the most code—it's about understanding problems, making the right technical decisions, and delivering efficient solutions.
          </p>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base">
            Today, I actively use modern AI-assisted development tools to improve productivity, research solutions faster, and focus more on system design, business logic, and problem-solving. I enjoy transforming ideas into functional products, continuously learning new technologies, and building projects that provide real value to users.
          </p>
        </div>

        {/* Quick Facts Card */}
        <div className="glass-card p-6 rounded-xl space-y-6">
          <h4 className="font-display font-semibold text-slate-900 dark:text-white text-lg border-b border-slate-100 dark:border-darkBorder/40 pb-2">
            Quick Facts
          </h4>
          <ul className="space-y-4 text-sm text-slate-650 dark:text-slate-300">
            <li className="flex gap-4 items-start text-left">
              <span className="font-semibold text-slate-800 dark:text-slate-100 w-28 shrink-0">Location:</span>
              <span className="text-slate-600 dark:text-slate-300">Chandigarh, India</span>
            </li>
            <li className="flex gap-4 items-start text-left">
              <span className="font-semibold text-slate-800 dark:text-slate-100 w-28 shrink-0">Specialization:</span>
              <span className="text-slate-600 dark:text-slate-300">MERN Stack Development</span>
            </li>
            <li className="flex gap-4 items-start text-left">
              <span className="font-semibold text-slate-800 dark:text-slate-100 w-28 shrink-0">Education:</span>
              <span className="text-slate-650 dark:text-slate-300">Pursuing Masters of Computer Applications (MCA)</span>
            </li>
            <li className="flex gap-4 items-start text-left">
              <span className="font-semibold text-slate-800 dark:text-slate-100 w-28 shrink-0">Experience:</span>
              <span className="text-slate-650 dark:text-slate-300">Full Stack Developer Intern</span>
            </li>
            <li className="flex gap-4 items-start text-left">
              <span className="font-semibold text-slate-800 dark:text-slate-100 w-28 shrink-0">Availability:</span>
              <span className="text-slate-650 dark:text-slate-300">Open to Full-Time Roles & Projects</span>
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
            After learning HTML, CSS, JavaScript, React, Node.js, Express, and MongoDB during my training, I started building complete full-stack applications from scratch. Through internships and personal projects, I gained experience in authentication systems, REST APIs, database design, state management, and responsive user interfaces.
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Working on independent projects helped me strengthen my debugging skills, understand real development workflows, and learn how to build scalable and maintainable applications using modern development practices and AI-powered tools.
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
            I aspire to become a strong problem solver who uses technology to address real-world challenges. Rather than focusing only on writing code, I aim to understand problems deeply, design effective solutions, and build products that positively impact users and businesses.
          </p>
        </div>

      </div>
    </motion.div>
  );
};

export default About;
