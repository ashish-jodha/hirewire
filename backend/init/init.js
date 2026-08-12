const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const mongoose = require('mongoose');
const User = require('../models/user.js');
const Application = require('../models/application.js');
const { data } = require('./data.js');

mongoose.connect('mongodb://127.0.0.1:27017/HireWire')
    .then(() => console.log('Successfully connected to MongoDB!'))
    .catch((err) => console.log('MongoDB connection error:', err));

const seedDatabase = async () => {
    try {
        await Application.deleteMany({});
        console.log('Cleared existing applications.');

        let testUser = await User.findOne({ username: 'Ashish' });

        if (!testUser) {
            const password = process.env.SEED_PASSWORD;
            
            if (!password) {
                throw new Error("CRITICAL: SEED_PASSWORD is not defined in your .env file!");
            }

            const newUser = new User({ username: 'Ashish' });
            
            testUser = await User.register(newUser, password);
            console.log('Successfully created new user: Ashish');
        } else {
            console.log('User Ashish already exists. Reusing existing user.');
        }

        const formattedJobs = data.map((job) => ({
            ...job,
            applicant: testUser._id
        }));

        await Application.insertMany(formattedJobs);
        console.log(`Successfully seeded ${formattedJobs.length} applications!`);

    } catch (error) {
        console.error('Error seeding the database:', error);
    } finally {
        mongoose.connection.close();
        console.log('MongoDB connection closed.');
    }
};

seedDatabase();