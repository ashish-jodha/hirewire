const Application = require("./models/application");
const { applicationValidation } = require("./schema");

module.exports.isLoggedIn = async (req , res , next) => {
    if (!req.isAuthenticated()) return res.status(401).json({message: "You are Not Allowed to Access It"});
    next();
}

module.exports.validateApplication = async (req , res , next) => {
    const {error , value} = applicationValidation.validate(req.body);

    if (error) return res.status(400).json({error: error.details[0].message});

    req.body = value;
    next();
}

module.exports.isOwner = async (req , res , next) => {
    const {id} = req.params;

    const application = await Application.findById(id);
    if (!application) return res.status(400).json({error: "Application Not Found"});

    if (!application.applicant.equals(req.user._id)) return res.status(401).json({error: "You Are Not Allowed To Modify This Application"});

    next();
}