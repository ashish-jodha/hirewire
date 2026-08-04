const express = require('express');
const User = require('../models/user');
const passport = require('passport');
const route = express.Router();

route.post('/register', async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const createdUser = new User({ username });
        const newUser = await User.register(createdUser, password);

        req.login(newUser, (err) => {
            if (err) return next(err);
            res.status(200).json({
                message: "Account Has Been Created",
                user: newUser
            })
        })
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
})

route.post('/login', passport.authenticate('local'), (req, res) => {
    res.status(200).json({
        message: "Successfully Logged In",
        user: req.user
    })
})

route.post('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        res.status(200).json({ message: "You Are Successfully Logged Out" });
    })
})

route.get('/me', (req, res) => {
    if (!req.isAuthenticated()) res.status(401).json({ error: "Your Are Not Allowed To Access It" , user: null });
    else res.status(200).json({ user: req.user });
})

module.exports = route;