import React from 'react';
import { motion } from 'framer-motion';
import { experience } from '../data/experience';
import { Briefcase, Calendar, MapPin, Award, CheckCircle } from 'lucide-react';

const Experience = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 bg-slate-50 dark:bg-darkBg text-left"
    >
      {/* Title */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 dark:text-white">
          Internship & Work Experience
        </h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto text-sm">
          A history of my professional internship engagements and team-driven development contributions.
        </p>
        <div className="w-12 h-1 bg-primary-500 mx-auto rounded-full" />
      </div>

      {/* Timeline Layout */}
      <div className="relative border-l-2 border-slate-200 dark:border-darkBorder ml-4 md:ml-6 space-y-10 py-4">
        {experience.map((item, index) => (
          <div key={item.id} className="relative pl-8 sm:pl-10">
            {/* Icon marker */}
            <span className="absolute -left-[17px] top-1.5 p-1.5 rounded-full bg-primary-600 border-4 border-white dark:border-darkBg text-white z-10 shadow-md">
              <Briefcase className="w-4 h-4" />
            </span>

            {/* Content card */}
            <div className="glass-card p-6 rounded-xl hover:shadow-md transition-all duration-300 space-y-6">
              
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-darkBorder/40 pb-4">
                <div className="space-y-1">
                  <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white leading-tight">
                    {item.role}
                  </h3>
                  <p className="text-sm font-semibold text-primary-600 dark:text-primary-400">
                    {item.company}
                  </p>
                </div>
                
                {/* Meta Tags */}
                <div className="flex flex-wrap gap-3 text-xs text-slate-500 dark:text-slate-400">
                  <span className="flex items-center space-x-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{item.duration}</span>
                  </span>
                  <span className="flex items-center space-x-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{item.location}</span>
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                {item.description}
              </p>

              {/* Responsibilities list */}
              <div className="space-y-3">
                <h4 className="font-display font-bold text-xs text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                  Responsibilities & Contributions
                </h4>
                <ul className="space-y-2">
                  {item.responsibilities.map((resp, rIdx) => (
                    <li key={rIdx} className="flex items-start space-x-2.5 text-sm text-slate-500 dark:text-slate-400">
                      <CheckCircle className="w-4 h-4 text-primary-500 flex-shrink-0 mt-0.5" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Key Achievements */}
              <div className="space-y-3">
                <h4 className="font-display font-bold text-xs text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center space-x-1.5">
                  <Award className="w-4 h-4 text-amber-500" />
                  <span>Key Achievements</span>
                </h4>
                <ul className="space-y-2">
                  {item.achievements.map((ach, aIdx) => (
                    <li key={aIdx} className="flex items-start space-x-2.5 text-sm text-slate-600 dark:text-slate-300 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0 mt-2" />
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies tags */}
              <div className="space-y-3 pt-2">
                <h4 className="font-display font-bold text-xs text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                  Technologies Utilized
                </h4>
                <div className="flex flex-wrap gap-2">
                  {item.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="bg-slate-100 dark:bg-darkCard text-slate-700 dark:text-slate-300 text-xs px-2.5 py-1 rounded border border-slate-200/30 dark:border-darkBorder/30 font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Experience;
