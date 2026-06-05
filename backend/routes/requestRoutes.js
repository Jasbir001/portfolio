const express = require('express');
const router = express.Router();
const {
  createRequest,
  getRequests,
  getRequestById,
  updateRequestStatus,
  addRequestNote,
  submitContactForm
} = require('../controllers/requestController');
const { protect } = require('../middleware/auth');

// Public route to submit request & contact form
router.post('/', createRequest);
router.post('/contact', submitContactForm);

// Protected Admin-only routes
router.get('/', protect, getRequests);
router.get('/:id', protect, getRequestById);
router.patch('/:id/status', protect, updateRequestStatus);
router.post('/:id/notes', protect, addRequestNote);

module.exports = router;
