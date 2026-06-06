import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Mail, Phone, MapPin, Send, AlertCircle, CheckCircle2 } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
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
    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      setStatus({ success: false, message: 'Please fill in all fields.' });
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus({ success: false, message: 'Please enter a valid email address.' });
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post('/requests/contact', formData);
      if (res.data.success) {
        setStatus({ success: true, message: 'Message sent successfully! I will get back to you shortly.' });
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } catch (error) {
      console.error(error);
      setStatus({
        success: false,
        message: error.response?.data?.message || 'Something went wrong. Please try again later.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12 space-y-12 bg-slate-50 dark:bg-darkBg text-left"
    >
      {/* Title */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 dark:text-white">
          Contact Me
        </h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto text-sm">
          Have an inquiry, feedback, or a quick question? Drop me a line directly.
        </p>
        <div className="w-12 h-1 bg-primary-500 mx-auto rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Contact Information Cards */}
        <div className="md:col-span-5 space-y-6">
          <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">
            Get In Touch
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Feel free to email or call for full-time job openings, contract consultations, or collaborative inquiries.
          </p>

          <div className="space-y-4 pt-2">
            {/* Email */}
            <div className="flex items-center space-x-4 p-4 rounded-xl glass-card">
              <div className="p-3 bg-primary-100 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400 rounded-lg">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email Address</h4>
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200">jasbir.nexbyte@gmail.com</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center space-x-4 p-4 rounded-xl glass-card">
              <div className="p-3 bg-accent-100 dark:bg-accent-950/40 text-accent-600 dark:text-accent-400 rounded-lg">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Phone number</h4>
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200">+91 74949 96995</p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center space-x-4 p-4 rounded-xl glass-card">
              <div className="p-3 bg-amber-100 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 rounded-lg">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Office Location</h4>
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200">📍Chandigarh, India</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form Card */}
        <div className="md:col-span-7">
          <div className="glass-card p-6 rounded-2xl space-y-6">
            <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">
              Send Message
            </h3>

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

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Rohan Sharma"
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-darkBorder bg-slate-50 dark:bg-darkCard text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-primary-500 focus:bg-white dark:focus:bg-darkCard transition-all duration-300"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="rohan@example.com"
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-darkBorder bg-slate-50 dark:bg-darkCard text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-primary-500 focus:bg-white dark:focus:bg-darkCard transition-all duration-300"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-1.5">
                <label htmlFor="subject" className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Discussion regarding project..."
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-darkBorder bg-slate-50 dark:bg-darkCard text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-primary-500 focus:bg-white dark:focus:bg-darkCard transition-all duration-300"
                />
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label htmlFor="message" className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Message Details
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  placeholder="Hey, I would like to query about..."
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-darkBorder bg-slate-50 dark:bg-darkCard text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-primary-500 focus:bg-white dark:focus:bg-darkCard transition-all duration-300 resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full glow-btn py-3 px-4 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all duration-300 disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default Contact;
