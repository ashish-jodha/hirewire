const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const User = require('./models/user');
const app = express();

const authRoutes = require('./routes/auth');
const applicationRoutes = require('./routes/application');

mongoose.connect('mongodb://127.0.0.1:27017/HireWire')
    .then(() => console.log('Successfully connected to MongoDB!'))
    .catch((err) => console.log('MongoDB connection error:', err));

app.use(express.json());
app.use(cors({origin: "http://localhost:5173" , credentials: true}));

app.use(session({
    secret: "mysecretissecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24
    }
}))

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/' , (req , res) => {
    res.redirect('/api/applications');
})

app.use('/api/auth' , authRoutes);
app.use('/api/applications' , applicationRoutes);

const PORT = 3000;
app.listen(PORT , () => {
    console.log(`App is listening to PORT: ${PORT}`);
})