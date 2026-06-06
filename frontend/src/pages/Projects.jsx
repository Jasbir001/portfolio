import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/projects';
import { ArrowRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

const Projects = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12 space-y-10 bg-slate-50 dark:bg-darkBg"
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

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {projects.map((project) => (
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
                  href={project.githubUrl || "https://github.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg border border-slate-200 dark:border-darkBorder text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-darkCard hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                  aria-label="GitHub Repository"
                >
                  <FaGithub className="w-4 h-4" />
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
