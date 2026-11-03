const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// @route   POST /api/contact
// @desc    Submit contact form
// @access  Public
router.post('/', async (req, res, next) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Please fill in all fields' });
    }

    const newMessage = await Message.create({ name, email, message });
    res.status(201).json({ success: true, data: newMessage });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
