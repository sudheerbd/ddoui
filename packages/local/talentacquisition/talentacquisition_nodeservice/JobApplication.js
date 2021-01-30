var jobapplicationservice = {};

var jobapplicationmodel = require("../../models/talentacquisition/JobApplication.js");

jobapplicationservice.getJobApplication = function(req, res) {

    var session = req.session;

    if (!session.useremail) {
        return res.json({success: false, data: null, session: false});
    } else {
        jobapplicationmodel.getJobApplication(session, req, res);        
    }
};

module.exports = jobapplicationservice;