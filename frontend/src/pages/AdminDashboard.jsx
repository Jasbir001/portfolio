import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { 
  Search, Filter, Layers, DollarSign, Calendar, ChevronRight, 
  FileSpreadsheet, MessageSquare, Trash2, Mail, User, Clock 
} from 'lucide-react';
import { DashboardSkeleton } from '../components/Skeletons';

const AdminDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Search & Filter state
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Tabs state for dual dashboard view
  const [activeTab, setActiveTab] = useState('proposals'); // 'proposals' or 'messages'
  const [messages, setMessages] = useState([]);
  const [messagesLoading, setMessagesLoading] = useState(false);

  const navigate = useNavigate();

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get('/requests', {
        params: { search, status, page, limit: 8 }
      });
      if (response.data.success) {
        setRequests(response.data.data);
        setStats(response.data.stats || {});
        setTotalPages(response.data.pagination?.pages || 1);
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to fetch dashboard data. Make sure MongoDB is running.');
    } finally {
      setLoading(false);
    }
  };

  const fetchContactMessages = async () => {
    try {
      setMessagesLoading(true);
      setError('');
      const response = await axios.get('/requests/messages');
      if (response.data.success) {
        setMessages(response.data.data);
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to fetch contact messages.');
    } finally {
      setMessagesLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'messages') {
      fetchContactMessages();
    } else {
      fetchDashboardData();
    }
  }, [activeTab, search, status, page]);

  const handleDeleteMessage = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;
    try {
      setError('');
      const response = await axios.delete(`/requests/messages/${id}`);
      if (response.data.success) {
        setMessages(prev => prev.filter(msg => msg._id !== id));
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to delete contact message.');
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
      default: return 'bg-slate-50 text-slate-700 border-slate-200 dark:bg-darkCard dark:text-slate-400 dark:border-darkBorder';
    }
  };

  if (loading && page === 1 && !requests.length) {
    return <DashboardSkeleton />;
  }

  const statCards = [
    { label: 'Total Inquiries', count: stats.Total || 0, color: 'text-slate-900 dark:text-white border-slate-200' },
    { label: 'New Briefs', count: stats.New || 0, color: 'text-blue-600 dark:text-blue-400 border-blue-200/50' },
    { label: 'In Discussions', count: stats.Discussion || 0, color: 'text-purple-600 dark:text-purple-400 border-purple-200/50' },
    { label: 'Under Progress', count: stats['In Progress'] || 0, color: 'text-amber-600 dark:text-amber-400 border-amber-200/50' }
  ];

  const filterOptions = ['All', 'New', 'Reviewing', 'Discussion', 'Accepted', 'Rejected', 'In Progress', 'Completed'];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left bg-slate-50 dark:bg-darkBg min-h-[80vh]"
    >
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 dark:border-darkBorder/40 pb-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-white">
            Workspace Dashboard
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Monitor client project proposals, direct messages, and pipeline metrics.
          </p>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-rose-50 dark:bg-rose-950/20 text-rose-800 dark:text-rose-300 border border-rose-200/50 dark:border-rose-900/50 rounded-xl">
          <p className="text-sm font-semibold">{error}</p>
          <p className="text-xs mt-1">Please ensure your Node/Express server is active and the MongoDB database daemon is running.</p>
        </div>
      )}

      {/* Stats Counter Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, idx) => (
          <div key={idx} className="glass-card p-6 rounded-xl border border-slate-200/50 dark:border-darkBorder/50 flex flex-col justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{card.label}</span>
            <span className={`text-3xl font-display font-bold mt-2 ${card.color}`}>{card.count}</span>
          </div>
        ))}
      </div>

      {/* Tabs Header Selector */}
      <div className="flex border-b border-slate-200 dark:border-darkBorder/40 pb-px">
        <button
          onClick={() => setActiveTab('proposals')}
          className={`pb-4 px-6 font-display font-bold text-sm border-b-2 transition-all duration-300 flex items-center space-x-2 ${
            activeTab === 'proposals'
              ? 'border-primary-500 text-primary-600 dark:text-primary-400'
              : 'border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-250'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Project Proposals</span>
        </button>
        <button
          onClick={() => setActiveTab('messages')}
          className={`pb-4 px-6 font-display font-bold text-sm border-b-2 transition-all duration-300 flex items-center space-x-2 ${
            activeTab === 'messages'
              ? 'border-primary-500 text-primary-600 dark:text-primary-400'
              : 'border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-250'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Contact Messages</span>
        </button>
      </div>

      {activeTab === 'proposals' ? (
        <>
          {/* Filters & Actions Bar */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-80">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder="Search name, email, company..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 dark:border-darkBorder bg-white dark:bg-darkCard text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-primary-500 focus:bg-white transition-all duration-300 shadow-sm"
              />
            </div>

            {/* Filter Dropdown */}
            <div className="flex items-center space-x-2 w-full md:w-auto justify-end">
              <Filter className="w-4 h-4 text-slate-400" />
              <select
                value={status}
                onChange={(e) => { setStatus(e.target.value); setPage(1); }}
                className="px-3 py-2 rounded-lg border border-slate-200 dark:border-darkBorder bg-white dark:bg-darkCard text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:border-primary-500 shadow-sm"
              >
                {filterOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt} Requests</option>
                ))}
              </select>
            </div>
          </div>

          {/* Inquiries Table list */}
          <div className="glass-card rounded-xl overflow-hidden border border-slate-200/50 dark:border-darkBorder/50 shadow-sm animate-fadeIn">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 dark:divide-darkBorder/40">
                <thead className="bg-slate-100 dark:bg-darkCard/50 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-left">
                  <tr>
                    <th className="px-6 py-4">Client Detail</th>
                    <th className="px-6 py-4">Project Scope</th>
                    <th className="px-6 py-4">Est. Proposal</th>
                    <th className="px-6 py-4 text-center">Status</th>
                    <th className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-darkBorder/20 text-sm">
                  {requests.length > 0 ? (
                    requests.map((req) => (
                      <tr 
                        key={req._id} 
                        className="hover:bg-slate-100/50 dark:hover:bg-darkCard/30 transition-colors cursor-pointer group"
                        onClick={() => navigate(`/admin/request/${req._id}`)}
                      >
                        <td className="px-6 py-4">
                          <div className="font-semibold text-slate-900 dark:text-white">{req.fullName}</div>
                          <div className="text-xs text-slate-400">{req.email}</div>
                          {req.companyName && (
                            <div className="text-[10px] font-medium text-primary-600 dark:text-primary-400 mt-0.5">{req.companyName}</div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-medium text-slate-800 dark:text-slate-100 group-hover:text-primary-500 transition-colors">{req.projectTitle}</div>
                          <div className="text-xs text-slate-400 flex items-center space-x-1 mt-0.5">
                            <Layers className="w-3 h-3 flex-shrink-0" />
                            <span>{req.projectType}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-xs text-slate-500 dark:text-slate-400 space-y-1">
                          <div className="flex items-center space-x-1">
                            <DollarSign className="w-3.5 h-3.5 text-slate-400" />
                            <span>{req.budget}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                            <span>{req.expectedDeadline}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusColor(req.status)}`}>
                            {req.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-primary-500 group-hover:translate-x-1 transition-all" />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-12 text-center text-slate-400">
                        {loading ? (
                          <div className="flex justify-center py-4">
                            <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                          </div>
                        ) : (
                          'No project proposals found matching criteria.'
                        )}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination controls */}
            {totalPages > 1 && (
              <div className="px-6 py-4 bg-slate-50 dark:bg-darkCard/30 border-t border-slate-200 dark:border-darkBorder/40 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">Page {page} of {totalPages}</span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setPage(p => Math.max(p - 1, 1))}
                    disabled={page === 1}
                    className="px-3 py-1.5 text-xs font-semibold rounded border border-slate-200 dark:border-darkBorder hover:bg-slate-100 dark:hover:bg-darkCard disabled:opacity-40"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setPage(p => Math.min(p + 1, totalPages))}
                    disabled={page === totalPages}
                    className="px-3 py-1.5 text-xs font-semibold rounded border border-slate-200 dark:border-darkBorder hover:bg-slate-100 dark:hover:bg-darkCard disabled:opacity-40"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        /* Contact Messages Tab List */
        <div className="animate-fadeIn space-y-6">
          {messagesLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : messages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {messages.map((msg) => (
                <motion.div
                  key={msg._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-card p-6 rounded-2xl border border-slate-200/50 dark:border-darkBorder/50 shadow-sm flex flex-col justify-between bg-white dark:bg-darkCard"
                >
                  <div className="space-y-4">
                    {/* Sender Details */}
                    <div className="flex justify-between items-start border-b border-slate-100 dark:border-darkBorder/40 pb-3">
                      <div>
                        <div className="font-semibold text-slate-900 dark:text-white flex items-center space-x-1.5">
                          <User className="w-4 h-4 text-slate-400" />
                          <span>{msg.name}</span>
                        </div>
                        <a href={`mailto:${msg.email}`} className="text-xs text-primary-650 dark:text-primary-400 hover:underline flex items-center space-x-1.5 mt-0.5">
                          <Mail className="w-3.5 h-3.5 text-slate-400" />
                          <span>{msg.email}</span>
                        </a>
                      </div>
                      <div className="text-[10px] text-slate-400 flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{new Date(msg.createdAt).toLocaleDateString()} {new Date(msg.createdAt).toLocaleTimeString()}</span>
                      </div>
                    </div>

                    {/* Subject and Message Content */}
                    <div className="space-y-2">
                      <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                        {msg.subject}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-350 bg-slate-100/50 dark:bg-darkBg/40 p-3 rounded-xl whitespace-pre-wrap leading-relaxed border border-slate-200/10">
                        {msg.message}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-darkBorder/40 mt-4">
                    <button
                      onClick={() => handleDeleteMessage(msg._id)}
                      className="py-1.5 px-3 text-rose-600 hover:text-white hover:bg-rose-600 border border-rose-200 dark:border-rose-900/30 rounded-lg flex items-center space-x-1 text-xs font-semibold transition-all duration-300"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Delete Message</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="glass-card p-12 text-center text-slate-400 rounded-xl border border-slate-200/50 dark:border-darkBorder/50">
              No direct contact messages found in database.
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default AdminDashboard;
