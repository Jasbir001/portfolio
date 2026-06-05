import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Server, Wrench, ShieldCheck } from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Frontend Development',
      icon: <Layout className="w-5 h-5 text-primary-500" />,
      skills: [
        { name: 'React.js', level: 'Expert', percent: 90 },
        { name: 'JavaScript (ES6+)', level: 'Expert', percent: 92 },
        { name: 'HTML5 / CSS3', level: 'Expert', percent: 95 },
        { name: 'Tailwind CSS', level: 'Expert', percent: 95 },
      ]
    },
    {
      title: 'Backend & Database',
      icon: <Server className="w-5 h-5 text-accent-500" />,
      skills: [
        { name: 'Node.js', level: 'Advanced', percent: 85 },
        { name: 'Express.js', level: 'Advanced', percent: 88 },
        { name: 'MongoDB', level: 'Advanced', percent: 85 },
        { name: 'PostgreSQL', level: 'Intermediate', percent: 75 },
      ]
    },
    {
      title: 'Tools & Ecosystem',
      icon: <Wrench className="w-5 h-5 text-amber-500" />,
      skills: [
        { name: 'Git & GitHub', level: 'Advanced', percent: 88 },
        { name: 'Postman', level: 'Advanced', percent: 85 },
        { name: 'Cursor / VS Code', level: 'Expert', percent: 90 },
        { name: 'GitHub Copilot / AI Tooling', level: 'Advanced', percent: 80 },
        { name: 'Antigravity (AI Coding)', level: 'Advanced', percent: 82 },
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 bg-slate-50 dark:bg-darkBg"
    >
      {/* Title */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 dark:text-white">
          Skills & Tech Stack
        </h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto text-sm">
          A collection of my core technologies, development frameworks, and workflows.
        </p>
        <div className="w-12 h-1 bg-primary-500 mx-auto rounded-full" />
      </div>

      {/* Grid Container */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {skillCategories.map((category, index) => (
          <motion.div 
            key={index}
            variants={itemVariants}
            className="glass-card p-6 rounded-2xl flex flex-col h-full hover:shadow-md hover:border-slate-300 dark:hover:border-darkBorder transition-all duration-300"
          >
            {/* Header */}
            <div className="flex items-center space-x-3 mb-6 pb-3 border-b border-slate-100 dark:border-darkBorder/40">
              {category.icon}
              <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                {category.title}
              </h3>
            </div>

            {/* Skills List */}
            <div className="space-y-5 flex-grow">
              {category.skills.map((skill, sIndex) => (
                <div key={sIndex} className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-medium text-slate-800 dark:text-slate-200">
                      {skill.name}
                    </span>
                    <span className="text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wider">
                      {skill.level}
                    </span>
                  </div>
                  
                  {/* Progress Bar Container */}
                  <div className="w-full h-2 bg-slate-100 dark:bg-darkCard rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.percent}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="h-full rounded-full bg-gradient-to-r from-primary-500 to-accent-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Philosophy banner */}
      <div className="glass-card p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 border-l-4 border-l-primary-500 max-w-4xl mx-auto">
        <div className="flex items-center space-x-3">
          <ShieldCheck className="w-6 h-6 text-primary-500 flex-shrink-0" />
          <div className="text-left">
            <h4 className="font-display font-bold text-slate-900 dark:text-white text-sm">
              Code Quality & Work Ethics
            </h4>
            <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">
              I follow clean coding principles, modular component architecture, and comprehensive endpoint testing.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Skills;
