const mongoose = require('mongoose');

const ContactMessageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Sender Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Sender Email is required'],
    trim: true,
    lowercase: true,
  },
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    trim: true,
  },
  message: {
    type: String,
    required: [true, 'Message content is required'],
    trim: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('ContactMessage', ContactMessageSchema);
