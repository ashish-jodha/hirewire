const express = require('express');
const route = express.Router();
const Application = require('../models/application');
const mongoose = require('mongoose');
const { isLoggedIn, validateApplication, isOwner } = require('../middleware');

route.get('/', isLoggedIn, async (req, res) => {
    const userApplications = await Application.find({ applicant: req.user._id });
    res.json(userApplications);
})

route.post('/', isLoggedIn, validateApplication, async (req, res) => {
    const newApplication = new Application(req.body);
    newApplication.applicant = req.user;

    await newApplication.save();

    res.status(201).json({ message: "New Application Successfully Created", application: newApplication });
})

route.get('/:id' , isLoggedIn , isOwner , async (req , res) => {
    const {id} = req.params;
    const application = await Application.findById(id);
    res.status(200).json(application);
})

route.put('/:id', isLoggedIn, isOwner, validateApplication, async (req, res) => {
    const { id } = req.params;

    const updatedApplication = await Application.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

    res.status(200).json({ message: "Application Successfully Updated", application: updatedApplication });
})

route.delete('/:id', isLoggedIn, isOwner, async (req, res) => {
    const { id } = req.params;

    await Application.findByIdAndDelete(id);

    res.status(200).json({ message: "Application Successfully Deleted" });
})

module.exports = route;