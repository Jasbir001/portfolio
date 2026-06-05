import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Mail, Building, Briefcase, DollarSign, Calendar, 
  Layers, Clock, MessageSquare, PlusCircle, AlertCircle, CheckCircle2 
} from 'lucide-react';
import { RequestDetailsSkeleton } from '../components/Skeletons';

const RequestDetails = () => {
  const { id } = useParams();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [statusError, setStatusError] = useState('');
  const [noteError, setNoteError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Form states
  const [status, setStatus] = useState('');
  const [statusNote, setStatusNote] = useState('');
  const [adminNote, setAdminNote] = useState('');

  const navigate = useNavigate();

  const fetchRequestDetails = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/requests/${id}`);
      if (res.data.success) {
        const data = res.data.data;
        setRequest(data);
        setStatus(data.status);
      }
    } catch (err) {
      console.error(err);
      setStatusError('Failed to retrieve request details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequestDetails();
  }, [id]);

  const handleStatusUpdate = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    setStatusError('');
    setSuccessMsg('');

    try {
      const res = await axios.patch(`/requests/${id}/status`, {
        status,
        note: statusNote.trim() || undefined
      });

      if (res.data.success) {
        setRequest(res.data.data);
        setSuccessMsg(`Status updated to "${status}" and client notified.`);
        setStatusNote('');
      }
    } catch (err) {
      console.error(err);
      setStatusError(err.response?.data?.message || 'Failed to update status.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!adminNote.trim()) return;

    setActionLoading(true);
    setNoteError('');
    setSuccessMsg('');

    try {
      const res = await axios.post(`/requests/${id}/notes`, {
        note: adminNote.trim()
      });

      if (res.data.success) {
        setRequest(res.data.data);
        setSuccessMsg('Admin note added and client notified via email.');
        setAdminNote('');
      }
    } catch (err) {
      console.error(err);
      setNoteError(err.response?.data?.message || 'Failed to add admin note.');
    } finally {
      setActionLoading(false);
    }
  };

  const getStatusColor = (reqStatus) => {
    switch (reqStatus) {
      case 'New': return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-800/30';
      case 'Reviewing': return 'bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-950/20 dark:text-cyan-400 dark:border-cyan-800/30';
      case 'Discussion': return 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/20 dark:text-purple-400 dark:border-purple-800/30';
      case 'Accepted': return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-800/30';
      case 'Rejected': return 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/20 dark:text-rose-400 dark:border-rose-800/30';
      case 'In Progress': return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-800/30';
      case 'Completed': return 'bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/20 dark:text-teal-400 dark:border-teal-800/30';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  if (loading) return <RequestDetailsSkeleton />;

  if (!request) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Proposal Request Not Found</h2>
        <Link to="/admin/dashboard" className="text-primary-500 font-semibold hover:underline flex items-center space-x-1">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Link>
      </div>
    );
  }

  const statusOptions = ['New', 'Reviewing', 'Discussion', 'Accepted', 'Rejected', 'In Progress', 'Completed'];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left bg-slate-50 dark:bg-darkBg min-h-screen"
    >
      {/* Back button */}
      <div>
        <Link 
          to="/admin/dashboard" 
          className="inline-flex items-center space-x-2 text-slate-500 hover:text-primary-600 dark:hover:text-primary-400 text-sm font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Link>
      </div>

      {successMsg && (
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-900/50 rounded-xl flex items-start space-x-3 text-sm">
          <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Request details & timeline */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* General Request specifications */}
          <div className="glass-card p-6 rounded-2xl border border-slate-200/50 dark:border-darkBorder/50 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b border-slate-100 dark:border-darkBorder/40 pb-4">
              <div>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStatusColor(request.status)}`}>
                  {request.status}
                </span>
                <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white mt-2">
                  {request.projectTitle}
                </h2>
              </div>
              <div className="text-right text-xs text-slate-400">
                Submitted on: {new Date(request.createdAt).toLocaleString()}
              </div>
            </div>

            {/* Client Bio Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Client Full Name</div>
                <div className="font-semibold text-slate-800 dark:text-slate-200">{request.fullName}</div>
              </div>
              <div className="space-y-1">
                <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Email Address</div>
                <a href={`mailto:${request.email}`} className="font-semibold text-primary-600 dark:text-primary-400 hover:underline flex items-center space-x-1">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span>{request.email}</span>
                </a>
              </div>
              {request.companyName && (
                <div className="space-y-1">
                  <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Company name</div>
                  <div className="font-semibold text-slate-800 dark:text-slate-200 flex items-center space-x-1">
                    <Building className="w-4 h-4 text-slate-400" />
                    <span>{request.companyName}</span>
                  </div>
                </div>
              )}
              <div className="space-y-1">
                <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Project Category</div>
                <div className="font-semibold text-slate-800 dark:text-slate-200 flex items-center space-x-1">
                  <Layers className="w-4 h-4 text-slate-400" />
                  <span>{request.projectType}</span>
                </div>
              </div>
            </div>

            {/* Project Specs */}
            <div className="grid grid-cols-2 gap-4 bg-slate-100 dark:bg-darkCard/50 p-4 rounded-xl border border-slate-200/20 text-sm">
              <div className="space-y-0.5">
                <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Est. Budget</div>
                <div className="font-bold text-slate-800 dark:text-slate-100 flex items-center space-x-1">
                  <DollarSign className="w-4 h-4 text-slate-500" />
                  <span>{request.budget}</span>
                </div>
              </div>
              <div className="space-y-0.5">
                <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Est. Deadline</div>
                <div className="font-bold text-slate-800 dark:text-slate-100 flex items-center space-x-1">
                  <Calendar className="w-4 h-4 text-slate-500" />
                  <span>{request.expectedDeadline}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="font-display font-bold text-slate-800 dark:text-slate-200 text-sm">
                Project Scope Details
              </h3>
              <p className="bg-slate-100/50 dark:bg-darkCard/30 p-4 rounded-lg text-slate-600 dark:text-slate-350 text-sm whitespace-pre-wrap leading-relaxed border border-slate-200/20">
                {request.projectDescription}
              </p>
            </div>

            {/* Additional Notes */}
            {request.additionalNotes && (
              <div className="space-y-2">
                <h3 className="font-display font-bold text-slate-800 dark:text-slate-200 text-sm">
                  Additional Notes
                </h3>
                <p className="bg-slate-100/50 dark:bg-darkCard/30 p-4 rounded-lg text-slate-500 dark:text-slate-400 text-xs whitespace-pre-wrap leading-relaxed border border-slate-200/20">
                  {request.additionalNotes}
                </p>
              </div>
            )}
          </div>

          {/* Timeline History */}
          <div className="glass-card p-6 rounded-2xl border border-slate-200/50 dark:border-darkBorder/50 shadow-sm space-y-6">
            <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white border-b border-slate-100 dark:border-darkBorder/40 pb-3">
              Proposal Ticket Timeline
            </h3>
            
            <div className="relative border-l border-slate-200 dark:border-darkBorder ml-2.5 space-y-6 py-2 text-sm">
              {request.history.map((hist, idx) => (
                <div key={idx} className="relative pl-6">
                  {/* Timeline bullet */}
                  <span className="absolute -left-[5.5px] top-1.5 w-2.5 h-2.5 rounded-full bg-primary-500 border border-white dark:border-darkBg shadow" />
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold text-slate-800 dark:text-slate-250">
                        {hist.status} Stage
                      </span>
                      <span className="text-[10px] text-slate-400 flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{new Date(hist.updatedAt).toLocaleString()}</span>
                      </span>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">
                      {hist.note}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right: Actions sidebar */}
        <div className="space-y-8">
          
          {/* Status Change Card */}
          <div className="glass-card p-6 rounded-2xl border border-slate-200/50 dark:border-darkBorder/50 shadow-sm space-y-4">
            <h4 className="font-display font-bold text-slate-900 dark:text-white text-sm border-b border-slate-100 dark:border-darkBorder/40 pb-2 flex items-center space-x-1.5">
              <Clock className="w-4 h-4 text-primary-500" />
              <span>Modify Request Status</span>
            </h4>
            
            {statusError && (
              <div className="p-2.5 bg-rose-50 dark:bg-rose-950/20 text-rose-800 dark:text-rose-300 border border-rose-200/30 rounded-lg flex items-start space-x-1.5 text-xs">
                <AlertCircle className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                <span>{statusError}</span>
              </div>
            )}

            <form onSubmit={handleStatusUpdate} className="space-y-3">
              <div className="space-y-1">
                <label htmlFor="status" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Pipeline Status
                </label>
                <select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-darkBorder bg-slate-50 dark:bg-darkCard text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:border-primary-500"
                >
                  {statusOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              {/* Status Note input */}
              <div className="space-y-1">
                <label htmlFor="statusNote" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Notification Note (Optional)
                </label>
                <textarea
                  id="statusNote"
                  rows="2"
                  value={statusNote}
                  onChange={(e) => setStatusNote(e.target.value)}
                  placeholder="Explain why the status changed (this is sent to the client)..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-darkBorder bg-slate-50 dark:bg-darkCard text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-primary-500 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={actionLoading}
                className="w-full py-2 px-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-xs font-semibold transition-all disabled:opacity-50"
              >
                {actionLoading ? 'Updating...' : 'Update Status'}
              </button>
            </form>
          </div>

          {/* Add Notes Card */}
          <div className="glass-card p-6 rounded-2xl border border-slate-200/50 dark:border-darkBorder/50 shadow-sm space-y-4">
            <h4 className="font-display font-bold text-slate-900 dark:text-white text-sm border-b border-slate-100 dark:border-darkBorder/40 pb-2 flex items-center space-x-1.5">
              <MessageSquare className="w-4 h-4 text-emerald-500" />
              <span>Send Admin Message</span>
            </h4>

            {noteError && (
              <div className="p-2.5 bg-rose-50 dark:bg-rose-950/20 text-rose-800 dark:text-rose-300 border border-rose-200/30 rounded-lg flex items-start space-x-1.5 text-xs">
                <AlertCircle className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                <span>{noteError}</span>
              </div>
            )}

            <form onSubmit={handleAddNote} className="space-y-3">
              <div className="space-y-1">
                <label htmlFor="adminNote" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Message Content
                </label>
                <textarea
                  id="adminNote"
                  rows="4"
                  required
                  value={adminNote}
                  onChange={(e) => setAdminNote(e.target.value)}
                  placeholder="Write a message to the client. Submitting this will automatically email them directly..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-darkBorder bg-slate-50 dark:bg-darkCard text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-primary-500 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={actionLoading || !adminNote.trim()}
                className="w-full py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold transition-all disabled:opacity-50"
              >
                {actionLoading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

        </div>

      </div>
    </motion.div>
  );
};

export default RequestDetails;
