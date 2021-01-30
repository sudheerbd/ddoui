var jobinterviewstatusservice = {};

var jobinterviewstatusmodel = require("../../models/talentacquisition/JobInterviewStatus.js");

jobinterviewstatusservice.insertJobInterviewStatus = function(req, res) {
    

    var session = req.session;

    if (!session.useremail) {
        return res.json({success: false, data: null, session: false});
    } else {
        var obj = {};
        //input parameters
        var reqBody = req.body;

        obj.name = reqBody.name;
        obj.description = reqBody.description;

        jobinterviewstatusmodel.insertJobInterviewStatus(obj, session, req, res);
    }
};

jobinterviewstatusservice.getJobInterviewStatus = function(req, res) {

    var session = req.session;

    if (!session.useremail) {
        return res.json({success: false, data: null, session: false});
    } else {
        jobinterviewstatusmodel.getJobInterviewStatus(session, req, res);        
    }
};

jobinterviewstatusservice.updateJobInterviewStatus = function(req, res) {

    var session = req.session;

    if (!session.useremail) {
        return res.json({success: false, data: null, session: false});
    } else {
        var obj = {};

        //input parameters
        var reqBody = req.body;

        obj.name = reqBody.name;
        obj.description = reqBody.description;
        obj.ddo_jobinterviewstatus_id = reqBody.ddo_jobinterviewstatus_id;

        jobinterviewstatusmodel.updateJobInterviewStatus(obj, session, req, res);        
    }
};

jobinterviewstatusservice.deleteJobInterviewStatus = function(req, res) {

    var session = req.session;

    if (!session.useremail) {
        return res.json({success: false, data: null, session: false});
    } else {
        var obj = {};

        //input parameters
        var reqBody = req.body;
        
        obj.ddo_jobinterviewstatus_id = reqBody.ddo_jobinterviewstatus_id;

        jobinterviewstatusmodel.deleteJobInterviewStatus(obj, session, req, res);        
    }
};

module.exports = jobinterviewstatusservice;