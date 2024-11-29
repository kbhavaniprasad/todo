const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../modells/User'); // Make sure the path is correct
const router = express.Router();

// POST /register route
router.post('/', async (req, res) => {
    const { username, email, password, confirmPassword, mobileNumber } = req.body;

    // Check if all fields are provided
    if (!username || !email || !password || !confirmPassword || !mobileNumber) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Password and Confirm Password match validation
    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Password and Confirm Password must be the same' });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
        username,
        email,
        password: hashedPassword,
        mobileNumber
    });

    try {
        const savedUser = await newUser.save();
        res.status(201).json({ message: 'User registered successfully', user: savedUser });
    } catch (err) {
        res.status(500).json({ message: 'Error registering user', error: err });
    }
});

module.exports = router;
