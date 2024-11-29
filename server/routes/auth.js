const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../modells/User');
const router = express.Router();

// Login Route
router.post('/login', async (req, res) => {
    const { username, password } = req.body; // We are accepting username and password from the request body

    // Check if both fields are provided
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
        // Check if user exists by username or email
        const user = await User.findOne({ $or: [{ username }, { email: username }] });

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Compare the entered password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // If the password matches, you can optionally send a JWT token for session management (not implemented here)
        // For now, just send a success message
        res.status(200).json({ message: 'Login successful', user: { username: user.username, email: user.email } });

    } catch (err) {
        res.status(500).json({ message: 'Error logging in', error: err });
    }
});

module.exports = router;
