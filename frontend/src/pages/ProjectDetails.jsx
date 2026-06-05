import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { projects } from '../data/projects';
import { 
  ArrowLeft, ExternalLink, Play, 
  HelpCircle, Lightbulb, ChevronLeft, ChevronRight, Cpu, Sparkles 
} from 'lucide-react';

const Github = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const ProjectDetails = () => {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  const [currentSlide, setCurrentSlide] = useState(0);

  if (!project) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Project Not Found</h2>
        <Link to="/projects" className="text-primary-500 font-semibold hover:underline flex items-center space-x-1">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Projects</span>
        </Link>
      </div>
    );
  }

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % project.screenshots.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + project.screenshots.length) % project.screenshots.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 bg-slate-50 dark:bg-darkBg text-left"
    >
      {/* Back button */}
      <div>
        <Link 
          to="/projects" 
          className="inline-flex items-center space-x-2 text-slate-500 hover:text-primary-600 dark:hover:text-primary-400 text-sm font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Projects</span>
        </Link>
      </div>

      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200 dark:border-darkBorder/40 pb-6">
        <div className="space-y-2">
          <span className="bg-primary-100 dark:bg-primary-950/40 text-primary-700 dark:text-primary-400 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded">
            {project.category}
          </span>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 dark:text-white">
            {project.title}
          </h1>
        </div>
        
        {/* Call to Actions */}
        <div className="flex space-x-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 border border-slate-300 dark:border-darkBorder bg-white/50 dark:bg-darkCard/50 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-darkCard px-4 py-2.5 rounded-lg text-xs font-semibold transition-all duration-300"
          >
            <Github className="w-4 h-4" />
            <span>Repository</span>
          </a>
          <a
            href="https://google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="glow-btn flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2.5 rounded-lg text-xs font-semibold transition-all duration-300"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Live Demo</span>
          </a>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: Media & Descriptions */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Carousel */}
          <div className="space-y-2">
            <h3 className="font-display font-semibold text-slate-900 dark:text-white text-lg">
              Project Gallery
            </h3>
            <div className="relative group aspect-video bg-slate-100 dark:bg-darkCard rounded-xl overflow-hidden border border-slate-200/50 dark:border-darkBorder/50">
              <img
                src={project.screenshots[currentSlide]}
                alt={`${project.title} screenshot ${currentSlide + 1}`}
                className="w-full h-full object-cover transition-all duration-300"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=700&auto=format&fit=crop&q=80';
                }}
              />
              
              {/* Carousel Controls */}
              <button 
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/40 hover:bg-slate-900/70 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/40 hover:bg-slate-900/70 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Index Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-1.5 z-10">
                {project.screenshots.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      currentSlide === i ? 'bg-primary-500 scale-110' : 'bg-white/50 hover:bg-white/80'
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-slate-900 dark:text-white text-lg">
              Project Description
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed whitespace-pre-line">
              {project.fullDescription}
            </p>
          </div>

          {/* Key Features */}
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-slate-900 dark:text-white text-lg">
              Key Features & Capabilities
            </h3>
            <ul className="space-y-3">
              {project.features.map((feature, i) => (
                <li key={i} className="flex items-start space-x-3 text-sm text-slate-600 dark:text-slate-300">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary-100 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400 flex items-center justify-center font-bold text-xs mt-0.5">
                    {i + 1}
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Architecture Overview */}
          <div className="glass-card p-6 rounded-xl space-y-4">
            <div className="flex items-center space-x-2 text-primary-500">
              <Cpu className="w-5 h-5" />
              <h3 className="font-display font-bold text-slate-900 dark:text-white text-base">
                System Architecture
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {project.architecture}
            </p>
          </div>

          {/* Video Demonstration Embedded */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-slate-800 dark:text-slate-200">
              <Play className="w-5 h-5 text-rose-500" />
              <h3 className="font-display font-semibold text-lg">
                Video Walkthrough
              </h3>
            </div>
            <div className="aspect-video w-full rounded-xl overflow-hidden border border-slate-200/50 dark:border-darkBorder/50">
              <iframe
                title={`${project.title} Video walkthrough`}
                src={project.videoDemo}
                className="w-full h-full"
                allowFullScreen
              />
            </div>
          </div>

        </div>

        {/* Right Side: Tech Stack, Challenges, Learnings, Use Case */}
        <div className="space-y-8">
          
          {/* Tech Stack List */}
          <div className="glass-card p-6 rounded-xl space-y-4">
            <h4 className="font-display font-bold text-slate-900 dark:text-white text-sm border-b border-slate-100 dark:border-darkBorder/40 pb-2">
              Technologies Used
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="bg-slate-100 dark:bg-darkCard text-slate-700 dark:text-slate-300 text-xs px-2.5 py-1 rounded border border-slate-200/30 dark:border-darkBorder/30"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Real World Use Case */}
          <div className="glass-card p-6 rounded-xl space-y-3">
            <div className="flex items-center space-x-2 text-emerald-500">
              <Sparkles className="w-4 h-4" />
              <h4 className="font-display font-bold text-slate-900 dark:text-white text-sm">
                Target Use Case
              </h4>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {project.useCase}
            </p>
          </div>

          {/* Challenges Faced */}
          <div className="glass-card p-6 rounded-xl space-y-3">
            <div className="flex items-center space-x-2 text-rose-500">
              <HelpCircle className="w-4 h-4" />
              <h4 className="font-display font-bold text-slate-900 dark:text-white text-sm">
                Challenges Faced
              </h4>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {project.challenges}
            </p>
          </div>

          {/* Learning Outcomes */}
          <div className="glass-card p-6 rounded-xl space-y-3">
            <div className="flex items-center space-x-2 text-amber-500">
              <Lightbulb className="w-4 h-4" />
              <h4 className="font-display font-bold text-slate-900 dark:text-white text-sm">
                Key Learning Outcomes
              </h4>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {project.learningOutcomes}
            </p>
          </div>

        </div>

      </div>
    </motion.div>
  );
};

export default ProjectDetails;
