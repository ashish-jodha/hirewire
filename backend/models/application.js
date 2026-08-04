const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    company: {
        type: String,
        trim: true,
        required: true
    },
    position: {
        type: String, 
        trim: true,
        required: true
    },
    status: {
        type: String,
        enum: ["Applied" , "Interviewing" , "Offered" , "Rejected"],
        required: true
    },
    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Application' , applicationSchema);