const ProjectRequest = require('../models/ProjectRequest');
const {
  sendEmail,
  getClientConfirmationTemplate,
  getAdminNotificationTemplate,
  getClientUpdateTemplate,
  getContactAdminTemplate,
  getContactClientTemplate
} = require('../utils/email');

// @desc    Submit a project request (Hire Me)
// @route   POST /api/requests
// @access  Public
const createRequest = async (req, res, next) => {
  try {
    const {
      fullName,
      email,
      companyName,
      projectTitle,
      projectDescription,
      budget,
      expectedDeadline,
      projectType,
      additionalNotes
    } = req.body;

    if (!fullName || !email || !projectTitle || !projectDescription || !budget || !expectedDeadline || !projectType) {
      res.status(400);
      throw new Error('Please fill in all required fields');
    }

    const request = await ProjectRequest.create({
      fullName,
      email,
      companyName,
      projectTitle,
      projectDescription,
      budget,
      expectedDeadline,
      projectType,
      additionalNotes
    });

    // Send confirmation email to client
    const clientHtml = getClientConfirmationTemplate(fullName, projectTitle);
    await sendEmail({
      to: email,
      subject: `Project Proposal Received: ${projectTitle}`,
      html: clientHtml
    });

    // Send notification email to admin
    const adminHtml = getAdminNotificationTemplate(request);
    await sendEmail({
      to: process.env.ADMIN_EMAIL || 'admin@example.com',
      subject: `[ALERT] New Project Request: ${projectTitle} from ${fullName}`,
      html: adminHtml
    });

    res.status(201).json({
      success: true,
      message: 'Project request submitted successfully',
      data: request
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all requests (Admin Dashboard)
// @route   GET /api/requests
// @access  Private (Admin only)
const getRequests = async (req, res, next) => {
  try {
    const { search, status, page = 1, limit = 10 } = req.query;
    const query = {};

    // Filter by status if provided
    if (status && status !== 'All') {
      query.status = status;
    }

    // Search by name, email, company, or title
    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { companyName: { $regex: search, $options: 'i' } },
        { projectTitle: { $regex: search, $options: 'i' } }
      ];
    }

    const skipIndex = (page - 1) * limit;

    const requests = await ProjectRequest.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skipIndex);

    const total = await ProjectRequest.countDocuments(query);

    // Get simple statistics for status
    const stats = {
      Total: await ProjectRequest.countDocuments(),
      New: await ProjectRequest.countDocuments({ status: 'New' }),
      Reviewing: await ProjectRequest.countDocuments({ status: 'Reviewing' }),
      Discussion: await ProjectRequest.countDocuments({ status: 'Discussion' }),
      Accepted: await ProjectRequest.countDocuments({ status: 'Accepted' }),
      Rejected: await ProjectRequest.countDocuments({ status: 'Rejected' }),
      'In Progress': await ProjectRequest.countDocuments({ status: 'In Progress' }),
      Completed: await ProjectRequest.countDocuments({ status: 'Completed' }),
    };

    res.json({
      success: true,
      data: requests,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit)
      },
      stats
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single request detail
// @route   GET /api/requests/:id
// @access  Private (Admin only)
const getRequestById = async (req, res, next) => {
  try {
    const request = await ProjectRequest.findById(req.params.id);

    if (!request) {
      res.status(404);
      throw new Error('Project request not found');
    }

    res.json({
      success: true,
      data: request
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update request status
// @route   PATCH /api/requests/:id/status
// @access  Private (Admin only)
const updateRequestStatus = async (req, res, next) => {
  try {
    const { status, note } = req.body;

    if (!status) {
      res.status(400);
      throw new Error('Status is required');
    }

    const request = await ProjectRequest.findById(req.params.id);

    if (!request) {
      res.status(404);
      throw new Error('Project request not found');
    }

    const oldStatus = request.status;
    request.status = status;

    // Push to timeline history
    request.history.push({
      status,
      note: note || `Status updated from ${oldStatus} to ${status}.`,
      updatedAt: new Date()
    });

    // If an admin note was included during status change, push to adminNotes
    if (note) {
      request.adminNotes.push({
        note,
        createdAt: new Date()
      });
    }

    await request.save();

    // Send email update to client
    const emailHtml = getClientUpdateTemplate(request, true, note || null);
    await sendEmail({
      to: request.email,
      subject: `Project Update: ${request.projectTitle} is now "${status}"`,
      html: emailHtml
    });

    res.json({
      success: true,
      message: 'Status updated successfully',
      data: request
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add admin note to request
// @route   POST /api/requests/:id/notes
// @access  Private (Admin only)
const addRequestNote = async (req, res, next) => {
  try {
    const { note } = req.body;

    if (!note) {
      res.status(400);
      throw new Error('Note content is required');
    }

    const request = await ProjectRequest.findById(req.params.id);

    if (!request) {
      res.status(404);
      throw new Error('Project request not found');
    }

    // Add note
    request.adminNotes.push({
      note,
      createdAt: new Date()
    });

    // Log in history timeline
    request.history.push({
      status: request.status,
      note: `Admin note added: "${note}"`,
      updatedAt: new Date()
    });

    await request.save();

    // Send email notification to client containing the developer's message
    const emailHtml = getClientUpdateTemplate(request, false, note);
    await sendEmail({
      to: request.email,
      subject: `New Message: Update on project "${request.projectTitle}"`,
      html: emailHtml
    });

    res.json({
      success: true,
      message: 'Note added and client notified successfully',
      data: request
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Submit contact form message (Nodemailer alert)
// @route   POST /api/requests/contact
// @access  Public
const submitContactForm = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      res.status(400);
      throw new Error('Please fill in all fields');
    }

    // Send email to admin
    const adminHtml = getContactAdminTemplate(name, email, subject, message);
    await sendEmail({
      to: process.env.ADMIN_EMAIL || 'admin@example.com',
      subject: `[CONTACT MESSAGE] ${subject} (from ${name})`,
      html: adminHtml
    });

    // Send confirmation email to client
    const clientHtml = getContactClientTemplate(name, subject);
    await sendEmail({
      to: email,
      subject: `Message Receipt Confirmation: ${subject}`,
      html: clientHtml
    });

    res.json({
      success: true,
      message: 'Contact form message sent successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createRequest,
  getRequests,
  getRequestById,
  updateRequestStatus,
  addRequestNote,
  submitContactForm
};
