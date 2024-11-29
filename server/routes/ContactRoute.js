// routes/contact.js
const express = require('express');
const router = express.Router();
const Contact = require('../modells/contact'); // Import the Contact model

// POST route to handle contact form submission
router.post('/api/contact', async (req, res) => {
  console.log('Received contact request:', req.body);
  const { firstName, lastName, email, message } = req.body;

  // Validation can be added here if necessary
  if (!firstName || !lastName || !email || !message) {
    return res.status(400).json({ message: 'All fields are required!' });
  }

  try {
    // Create a new contact document and save it
    const newContact = new Contact({ firstName, lastName, email, message });
    await newContact.save();
    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error saving contact message:', error);
    res.status(500).json({ message: 'Failed to send message. Please try again.' });
  }
});

module.exports = router;
