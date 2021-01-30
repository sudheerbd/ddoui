
var jobapplicationsservice = {};

var jobapplicationsmodel = require("../../models/talentacquisition/JobApplications.js");

jobapplicationsservice.insertJobApplications = function(req, res) {
    

    var session = req.session;

    if (!session.useremail) {

        return res.json({success: false, data: null, session: false});
    } else {

        jobapplicationsmodel.insertJobApplications(req.body, session, req, res);
    }
};

jobapplicationsservice.getJobApplications = function(req, res) {

    var session = req.session;

    if (!session.useremail) {

        return res.json({success: false, data: null, session: false});
    } else {

        jobapplicationsmodel.getJobApplications(session, req, res);        
    }
};

jobapplicationsservice.updateJobApplications = function(req, res) {

    var session = req.session;

    if (!session.useremail) {
    	
        return res.json({success: false, data: null, session: false});
    } else {

        jobapplicationsmodel.updateJobApplications(req.body, session, req, res);        
    }
};

jobapplicationsservice.deleteJobApplications = function(req, res) {

    var session = req.session;

    if (!session.useremail) {

        return res.json({success: false, data: null, session: false});
    } else {

        jobapplicationsmodel.deleteJobApplications(req.body, session, req, res);        
    }
};

module.exports = jobapplicationsservice;