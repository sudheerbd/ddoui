
var jobinterviewfeedbackservice = {};

var jobinterviewfeedbackmodel = require("../../models/talentacquisition/JobInterviewFeedback.js");

jobinterviewfeedbackservice.insertJobInterviewFeedback = function(req, res) {
    

    var session = req.session;

    if (!session.useremail) {

        return res.json({success: false, data: null, session: false});
    } else {

        jobinterviewfeedbackmodel.insertJobInterviewFeedback(req.body, session, req, res);
    }
};

jobinterviewfeedbackservice.getJobInterviewFeedback = function(req, res) {

    var session = req.session;

    if (!session.useremail) {

        return res.json({success: false, data: null, session: false});
    } else {

        jobinterviewfeedbackmodel.getJobInterviewFeedback(session, req, res);        
    }
};

jobinterviewfeedbackservice.updateJobInterviewFeedback = function(req, res) {

    var session = req.session;

    if (!session.useremail) {
    	
        return res.json({success: false, data: null, session: false});
    } else {

        jobinterviewfeedbackmodel.updateJobInterviewFeedback(req.body, session, req, res);        
    }
};

jobinterviewfeedbackservice.deleteJobInterviewFeedback = function(req, res) {

    var session = req.session;

    if (!session.useremail) {

        return res.json({success: false, data: null, session: false});
    } else {

        jobinterviewfeedbackmodel.deleteJobInterviewFeedback(req.body, session, req, res);        
    }
};

module.exports = jobinterviewfeedbackservice;