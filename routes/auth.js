const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

// User registration
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if the username or email already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ success: false, error: 'Username or email already exists' });
        }

        // Create a new user
        const newUser = new User({ username, email, password });

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newUser.password, salt);
        newUser.password = hashedPassword;

        // Save the user to the database
        const user = await newUser.save();

        res.status(201).json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// User login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        // Compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, error: 'Invalid credentials' });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user._id }, '7b9mbednea', { expiresIn: '1h' });

        res.status(200).json({ success: true, token: `Bearer ${token}` });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Export the router
module.exports = router;
