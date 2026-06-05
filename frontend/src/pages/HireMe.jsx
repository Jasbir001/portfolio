import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Briefcase, AlertCircle, CheckCircle2, DollarSign, Calendar } from 'lucide-react';

const HireMe = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    companyName: '',
    projectTitle: '',
    projectDescription: '',
    budget: '',
    expectedDeadline: '',
    projectType: 'Web Application',
    additionalNotes: ''
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ success: null, message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ success: null, message: '' });

    // Client-side validations
    const { fullName, email, projectTitle, projectDescription, budget, expectedDeadline, projectType } = formData;
    if (!fullName.trim() || !email.trim() || !projectTitle.trim() || !projectDescription.trim() || !budget.trim() || !expectedDeadline.trim() || !projectType.trim()) {
      setStatus({ success: false, message: 'Please fill in all required fields.' });
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus({ success: false, message: 'Please enter a valid email address.' });
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post('/requests', formData);
      if (res.data.success) {
        setStatus({
          success: true,
          message: 'Project request submitted successfully! An auto-confirmation email has been sent to you, and I will be in touch shortly.'
        });
        setFormData({
          fullName: '',
          email: '',
          companyName: '',
          projectTitle: '',
          projectDescription: '',
          budget: '',
          expectedDeadline: '',
          projectType: 'Web Application',
          additionalNotes: ''
        });
      }
    } catch (error) {
      console.error(error);
      setStatus({
        success: false,
        message: error.response?.data?.message || 'Failed to submit project request. Please check your connection and try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  const projectTypes = [
    'Web Application',
    'SaaS Dashboard',
    'Mobile Application API',
    'Database Architecture',
    'E-commerce Platform',
    'Other'
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 bg-slate-50 dark:bg-darkBg text-left"
    >
      {/* Title */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 dark:text-white">
          Hire Me / Request Work
        </h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto text-sm">
          Submit your project requirements directly. An automated timeline tracking ticket will be registered, and updates will be sent via email.
        </p>
        <div className="w-12 h-1 bg-primary-500 mx-auto rounded-full" />
      </div>

      <div className="glass-card p-6 sm:p-8 rounded-2xl space-y-8 max-w-3xl mx-auto">
        <div className="flex items-center space-x-3 text-primary-600 border-b border-slate-100 dark:border-darkBorder/40 pb-4">
          <Briefcase className="w-6 h-6" />
          <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">
            Project Specification Form
          </h3>
        </div>

        {status.message && (
          <div 
            className={`p-4 rounded-lg flex items-start space-x-3 text-sm leading-relaxed ${
              status.success 
                ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-900/50' 
                : 'bg-rose-50 dark:bg-rose-950/20 text-rose-800 dark:text-rose-300 border border-rose-200/50 dark:border-rose-900/50'
            }`}
          >
            {status.success ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
            )}
            <span>{status.message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Client Details Section */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-xs text-slate-400 uppercase tracking-wider">
              1. Contact Information
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label htmlFor="fullName" className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-darkBorder bg-slate-50 dark:bg-darkCard text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-primary-500 focus:bg-white dark:focus:bg-darkCard transition-all duration-300"
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label htmlFor="email" className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="john@example.com"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-darkBorder bg-slate-50 dark:bg-darkCard text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-primary-500 focus:bg-white dark:focus:bg-darkCard transition-all duration-300"
                />
              </div>
            </div>

            {/* Company Name */}
            <div className="space-y-1.5">
              <label htmlFor="companyName" className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Company Name (Optional)
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Acme Corp"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-darkBorder bg-slate-50 dark:bg-darkCard text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-primary-500 focus:bg-white dark:focus:bg-darkCard transition-all duration-300"
              />
            </div>
          </div>

          {/* Project Details Section */}
          <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-darkBorder/40">
            <h4 className="font-display font-bold text-xs text-slate-400 uppercase tracking-wider">
              2. Project Description
            </h4>

            {/* Project Title */}
            <div className="space-y-1.5">
              <label htmlFor="projectTitle" className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Project Title / Brief Concept *
              </label>
              <input
                type="text"
                id="projectTitle"
                name="projectTitle"
                value={formData.projectTitle}
                onChange={handleChange}
                required
                placeholder="E.g. E-Commerce API integration or SaaS Telemetry Panel"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-darkBorder bg-slate-50 dark:bg-darkCard text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-primary-500 focus:bg-white dark:focus:bg-darkCard transition-all duration-300"
              />
            </div>

            {/* Project Type & Budget & Deadline Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              {/* Project Type */}
              <div className="space-y-1.5">
                <label htmlFor="projectType" className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Project Type *
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-200 dark:border-darkBorder bg-slate-50 dark:bg-darkCard text-sm text-slate-850 dark:text-slate-100 focus:outline-none focus:border-primary-500 transition-all duration-300"
                >
                  {projectTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Budget */}
              <div className="space-y-1.5">
                <label htmlFor="budget" className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center space-x-1">
                  <DollarSign className="w-3 h-3 text-slate-400" />
                  <span>Est. Budget ($/INR) *</span>
                </label>
                <input
                  type="text"
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  required
                  placeholder="e.g. $2,000 or Open"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-darkBorder bg-slate-50 dark:bg-darkCard text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-primary-500 focus:bg-white dark:focus:bg-darkCard transition-all duration-300"
                />
              </div>

              {/* Deadline */}
              <div className="space-y-1.5">
                <label htmlFor="expectedDeadline" className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center space-x-1">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  <span>Est. Deadline *</span>
                </label>
                <input
                  type="text"
                  id="expectedDeadline"
                  name="expectedDeadline"
                  value={formData.expectedDeadline}
                  onChange={handleChange}
                  required
                  placeholder="e.g. 1 Month or Q3 2026"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-darkBorder bg-slate-50 dark:bg-darkCard text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-primary-500 focus:bg-white dark:focus:bg-darkCard transition-all duration-300"
                />
              </div>

            </div>

            {/* Project Description */}
            <div className="space-y-1.5">
              <label htmlFor="projectDescription" className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Project Description / Full Scope Details *
              </label>
              <textarea
                id="projectDescription"
                name="projectDescription"
                value={formData.projectDescription}
                onChange={handleChange}
                required
                rows="5"
                placeholder="Please describe what the project involves, the problems it solves, target users, and key workflows..."
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-darkBorder bg-slate-50 dark:bg-darkCard text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-primary-500 focus:bg-white dark:focus:bg-darkCard transition-all duration-300 resize-none"
              />
            </div>

            {/* Additional Notes */}
            <div className="space-y-1.5">
              <label htmlFor="additionalNotes" className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Additional Notes or Tech Stack Preferences
              </label>
              <textarea
                id="additionalNotes"
                name="additionalNotes"
                value={formData.additionalNotes}
                onChange={handleChange}
                rows="3"
                placeholder="Any special design benchmarks, pre-existing assets, or custom packages you would like to mention..."
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-darkBorder bg-slate-50 dark:bg-darkCard text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-primary-500 focus:bg-white dark:focus:bg-darkCard transition-all duration-300 resize-none"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full glow-btn py-3.5 px-4 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all duration-300 disabled:opacity-50"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <span>Submit Project Request</span>
            )}
          </button>

        </form>
      </div>
    </motion.div>
  );
};

export default HireMe;
