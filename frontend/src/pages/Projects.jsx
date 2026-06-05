import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, categories } from '../data/projects';
import { ExternalLink, ArrowRight, Layers } from 'lucide-react';

const Github = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 bg-slate-50 dark:bg-darkBg"
    >
      {/* Title */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 dark:text-white">
          Featured Projects
        </h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto text-sm">
          A showcase of my applications, illustrating system architecture, problem-solving, and technology choices.
        </p>
        <div className="w-12 h-1 bg-primary-500 mx-auto rounded-full" />
      </div>

      {/* Categories Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2 border-b border-slate-200 dark:border-darkBorder/40 pb-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
              activeCategory === category
                ? 'bg-primary-600 text-white shadow-md shadow-primary-500/15'
                : 'bg-white dark:bg-darkCard text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-darkBorder/40 border border-slate-200/50 dark:border-darkBorder/50'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              key={project.id}
              className="glass-card rounded-xl overflow-hidden flex flex-col h-full hover:shadow-lg border border-slate-200/50 dark:border-darkBorder/50 group"
            >
              {/* Thumbnail Container */}
              <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-darkCard">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&auto=format&fit=crop&q=80';
                  }}
                />
                <span className="absolute top-4 left-4 bg-primary-600/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">
                  {project.category}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-grow flex flex-col space-y-4 text-left">
                <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white group-hover:text-primary-500 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed flex-grow">
                  {project.shortDescription}
                </p>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="bg-slate-100 dark:bg-darkCard text-slate-600 dark:text-slate-400 text-[10px] font-medium px-2 py-0.5 rounded border border-slate-200/30 dark:border-darkBorder/30"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 4 && (
                    <span className="bg-slate-100 dark:bg-darkCard text-slate-400 text-[10px] font-semibold px-2 py-0.5 rounded">
                      +{project.techStack.length - 4} More
                    </span>
                  )}
                </div>
              </div>

              {/* Card Actions */}
              <div className="p-6 pt-0 border-t border-slate-100 dark:border-darkBorder/40 flex items-center justify-between gap-4 mt-auto">
                <Link
                  to={`/projects/${project.id}`}
                  className="w-full text-center bg-primary-600 hover:bg-primary-700 text-white text-xs font-semibold py-2.5 rounded-lg flex items-center justify-center space-x-1.5 transition-colors duration-300"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg border border-slate-200 dark:border-darkBorder text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-darkCard hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                  aria-label="GitHub Repository"
                >
                  <Github className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Projects;
