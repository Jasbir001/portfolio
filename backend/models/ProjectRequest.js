const mongoose = require('mongoose');

const HistorySchema = new mongoose.Schema({
  status: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    default: '',
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
}, { _id: false });

const AdminNoteSchema = new mongoose.Schema({
  note: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
}, { _id: false });

const ProjectRequestSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
  },
  companyName: {
    type: String,
    trim: true,
    default: '',
  },
  projectTitle: {
    type: String,
    required: [true, 'Project Title is required'],
    trim: true,
  },
  projectDescription: {
    type: String,
    required: [true, 'Project Description is required'],
    trim: true,
  },
  budget: {
    type: String,
    required: [true, 'Budget is required'],
    trim: true,
  },
  expectedDeadline: {
    type: String,
    required: [true, 'Expected Deadline is required'],
    trim: true,
  },
  projectType: {
    type: String,
    required: [true, 'Project Type is required'],
    trim: true,
  },
  additionalNotes: {
    type: String,
    trim: true,
    default: '',
  },
  status: {
    type: String,
    enum: ['New', 'Reviewing', 'Discussion', 'Accepted', 'Rejected', 'In Progress', 'Completed'],
    default: 'New',
  },
  adminNotes: [AdminNoteSchema],
  history: [HistorySchema],
}, { timestamps: true });

// Pre-save middleware to add initial history entry
ProjectRequestSchema.pre('save', function(next) {
  if (this.isNew) {
    this.history.push({
      status: 'New',
      note: 'Project request submitted by client.',
      updatedAt: new Date()
    });
  }
  next();
});

module.exports = mongoose.model('ProjectRequest', ProjectRequestSchema);
