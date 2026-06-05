import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Server, Sparkles, ShieldCheck, Network } from 'lucide-react';
import { TbBrandVscode } from 'react-icons/tb';
import {
  SiReact,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiTailwindcss,
  SiBootstrap,
  SiTypescript,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiGit,
  SiGithub,
  SiPostman,
  SiVercel,
  SiRender,
  SiOpenai,
  SiGithubcopilot
} from 'react-icons/si';

// Premium & Clean Tech Icons Mapping
const techIcons = {
  'React.js': <SiReact className="w-5 h-5 text-[#61DAFB]" />,
  'Next.js': <SiNextdotjs className="w-5 h-5 text-slate-800 dark:text-white" />,
  'TypeScript': <SiTypescript className="w-5 h-5 text-[#3178C6]" />,
  'JavaScript (ES6+)': <SiJavascript className="w-5 h-5 text-[#F7DF1E]" />,
  'HTML5': <SiHtml5 className="w-5 h-5 text-[#E34F26]" />,
  'CSS3': <SiCss className="w-5 h-5 text-[#1572B6]" />,
  'Tailwind CSS': <SiTailwindcss className="w-5 h-5 text-[#38BDF8]" />,
  'Bootstrap': <SiBootstrap className="w-5 h-5 text-[#7952B3]" />,
  'Node.js': <SiNodedotjs className="w-5 h-5 text-[#339933]" />,
  'Express.js': <SiExpress className="w-5 h-5 text-slate-800 dark:text-slate-200" />,
  'MongoDB': <SiMongodb className="w-5 h-5 text-[#47A248]" />,
  'PostgreSQL': <SiPostgresql className="w-5 h-5 text-[#336791]" />,
  'REST APIs': <Network className="w-5 h-5 text-[#14B8A6]" />,
  'Git': <SiGit className="w-5 h-5 text-[#F05032]" />,
  'GitHub': <SiGithub className="w-5 h-5 text-slate-800 dark:text-slate-200" />,
  'Postman': <SiPostman className="w-5 h-5 text-[#FF6C37]" />,
  'VS Code': <TbBrandVscode className="w-5 h-5 text-[#007ACC]" />,
  'Vercel': <SiVercel className="w-5 h-5 text-slate-800 dark:text-white" />,
  'Render': <SiRender className="w-5 h-5 text-[#46E3B7]" />,
  'ChatGPT': <SiOpenai className="w-5 h-5 text-[#10A37F]" />,
  'Copilot': <SiGithubcopilot className="w-5 h-5 text-[#6366F1]" />,
};

const Skills = () => {
  const skillCategories = [
    {
      title: 'Frontend Development',
      icon: <Layout className="w-5 h-5 text-primary-500 dark:text-primary-400" />,
      skills: ['React.js', 'Next.js', 'TypeScript', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap']
    },
    {
      title: 'Backend & Database',
      icon: <Server className="w-5 h-5 text-accent-500 dark:text-accent-400" />,
      skills: ['Node.js', 'Express.js', 'MongoDB', 'PostgreSQL', 'REST APIs']
    },
    {
      title: 'Tools & Deployment',
      icon: <Sparkles className="w-5 h-5 text-purple-500 dark:text-purple-400" />,
      skills: ['Git', 'GitHub', 'Postman', 'VS Code', 'Vercel', 'Render', 'ChatGPT', 'Copilot']
    }
  ];

  const focusSkills = ['React.js', 'Next.js', 'TypeScript', 'Node.js', 'MongoDB'];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { type: 'spring', stiffness: 100, damping: 15 } 
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16 bg-slate-50 dark:bg-darkBg relative overflow-hidden"
    >
      {/* Background Blobs for SaaS Aesthetic */}
      <div className="absolute -z-10 w-96 h-96 rounded-full bg-primary-500/5 blur-3xl opacity-60 -top-12 -left-12 pointer-events-none" />
      <div className="absolute -z-10 w-96 h-96 rounded-full bg-accent-500/5 blur-3xl opacity-60 bottom-0 -right-12 pointer-events-none" />

      {/* Header Section */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
          Skills & Technology Stack
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-base sm:text-lg leading-relaxed font-normal">
          Technologies, frameworks, tools, and workflows I use to build modern web applications.
        </p>
        <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-full mt-4" />
      </div>

      {/* 3-Card Grid */}
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
            className="glass-card p-8 rounded-3xl flex flex-col h-full hover:shadow-xl hover:shadow-primary-500/5 hover:-translate-y-1.5 transition-all duration-300 border border-slate-200/50 dark:border-darkBorder/50 group"
          >
            {/* Card Header */}
            <div className="flex items-center space-x-3.5 mb-8 pb-4 border-b border-slate-100 dark:border-darkBorder/30">
              <div className="p-3 rounded-2xl bg-slate-100 dark:bg-darkBg/60 text-slate-800 dark:text-slate-200 group-hover:bg-primary-500/10 group-hover:text-primary-500 transition-colors duration-300 flex items-center justify-center">
                {category.icon}
              </div>
              <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">
                {category.title}
              </h3>
            </div>

            {/* Badges Container */}
            <div className="flex flex-wrap gap-2.5 flex-grow content-start">
              {category.skills.map((skill, sIndex) => (
                <motion.div
                  key={sIndex}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-semibold tracking-wide border cursor-default select-none transition-all duration-300 bg-white hover:bg-slate-100 dark:bg-darkCard dark:hover:bg-darkBorder/30 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-darkBorder"
                >
                  <span className="flex-shrink-0">{techIcons[skill]}</span>
                  <span>{skill}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Current Tech Focus */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="max-w-4xl mx-auto pt-12 text-center relative"
      >
        <div className="absolute -z-10 w-80 h-80 rounded-full bg-primary-500/5 blur-3xl opacity-55 left-1/2 -translate-x-1/2 -top-10 pointer-events-none" />

        <div className="space-y-3 mb-10">
          <h3 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
            Current Tech Focus
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
            Key technologies and advanced patterns I am actively specializing in.
          </p>
        </div>

        {/* Larger Glowing Badges */}
        <div className="flex flex-wrap justify-center gap-4">
          {focusSkills.map((skill, index) => (
            <motion.div
              key={index}
              whileHover={{
                scale: 1.06,
                y: -3,
                boxShadow: '0 10px 30px -5px rgba(139, 92, 246, 0.15)',
              }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center space-x-3 px-6 py-3.5 rounded-2xl text-sm font-bold tracking-wide border bg-white dark:bg-darkCard border-slate-200 dark:border-darkBorder shadow-sm hover:border-primary-500 dark:hover:border-primary-400 hover:text-primary-500 transition-all duration-300 cursor-default select-none group"
            >
              <span className="flex-shrink-0 transform group-hover:rotate-12 transition-transform duration-300">
                {techIcons[skill]}
              </span>
              <span className="text-slate-800 dark:text-slate-200 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                {skill}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Code Quality Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="glass-card p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-5 border-l-4 border-l-primary-500 max-w-4xl mx-auto shadow-md"
      >
        <div className="flex items-center space-x-4">
          <div className="p-2.5 rounded-xl bg-primary-500/10 text-primary-500 dark:bg-primary-500/20">
            <ShieldCheck className="w-6 h-6 flex-shrink-0" />
          </div>
          <div className="text-left space-y-0.5">
            <h4 className="font-display font-bold text-slate-900 dark:text-white text-base">
              Code Quality & Work Ethics
            </h4>
            <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm">
              I follow clean coding principles, modular component architecture, and comprehensive endpoint testing.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Skills;
