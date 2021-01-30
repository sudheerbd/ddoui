var jobapplicationstatusservice = {};

var jobapplicationstatusmodel = require("../../models/talentacquisition/JobApplicationStatus.js");

jobapplicationstatusservice.insertJobApplicationStatus = function(req, res) {
    

    var session = req.session;

    if (!session.useremail) {
        return res.json({success: false, data: null, session: false});
    } else {
        var obj = {};
        //input parameters
        var reqBody = req.body;

        obj.name = reqBody.name;
        obj.description = reqBody.description;

        jobapplicationstatusmodel.insertJobApplicationStatus(obj, session, req, res);
    }
};

jobapplicationstatusservice.getJobApplicationStatus = function(req, res) {

    var session = req.session;

    if (!session.useremail) {
        return res.json({success: false, data: null, session: false});
    } else {
        jobapplicationstatusmodel.getJobApplicationStatus(session, req, res);        
    }
};

jobapplicationstatusservice.updateJobApplicationStatus = function(req, res) {

    var session = req.session;

    if (!session.useremail) {
        return res.json({success: false, data: null, session: false});
    } else {
        var obj = {};

        //input parameters
        var reqBody = req.body;

        obj.name = reqBody.name;
        obj.description = reqBody.description;
        obj.ddo_jobapplicationstatus_id = reqBody.ddo_jobapplicationstatus_id;

        jobapplicationstatusmodel.updateJobApplicationStatus(obj, session, req, res);        
    }
};

jobapplicationstatusservice.deleteJobApplicationStatus = function(req, res) {

    var session = req.session;

    if (!session.useremail) {
        return res.json({success: false, data: null, session: false});
    } else {
        var obj = {};

        //input parameters
        var reqBody = req.body;
        
        obj.ddo_jobapplicationstatus_id = reqBody.ddo_jobapplicationstatus_id;

        jobapplicationstatusmodel.deleteJobApplicationStatus(obj, session, req, res);        
    }
};

module.exports = jobapplicationstatusservice;