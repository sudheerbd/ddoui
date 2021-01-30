var jobinterviewratingservice = {};

var jobinterviewratingmodel = require("../../models/talentacquisition/JobInterviewRating.js");

jobinterviewratingservice.insertJobInterviewRating = function(req, res) {
    

    var session = req.session;

    if (!session.useremail) {
        return res.json({success: false, data: null, session: false});
    } else {
        var obj = {};
        //input parameters
        var reqBody = req.body;

        obj.name = reqBody.name;
        obj.description = reqBody.description;

        jobinterviewratingmodel.insertJobInterviewRating(obj, session, req, res);
    }
};

jobinterviewratingservice.getJobInterviewRating = function(req, res) {

    var session = req.session;

    if (!session.useremail) {
        return res.json({success: false, data: null, session: false});
    } else {
        jobinterviewratingmodel.getJobInterviewRating(session, req, res);        
    }
};

jobinterviewratingservice.updateJobInterviewRating = function(req, res) {

    var session = req.session;

    if (!session.useremail) {
        return res.json({success: false, data: null, session: false});
    } else {
        var obj = {};

        //input parameters
        var reqBody = req.body;

        obj.name = reqBody.name;
        obj.description = reqBody.description;
        obj.ddo_jobinterviewrating_id = reqBody.ddo_jobinterviewrating_id;

        jobinterviewratingmodel.updateJobInterviewRating(obj, session, req, res);        
    }
};

jobinterviewratingservice.deleteJobInterviewRating = function(req, res) {

    var session = req.session;

    if (!session.useremail) {
        return res.json({success: false, data: null, session: false});
    } else {
        var obj = {};

        //input parameters
        var reqBody = req.body;
        
        obj.ddo_jobinterviewrating_id = reqBody.ddo_jobinterviewrating_id;

        jobinterviewratingmodel.deleteJobInterviewRating(obj, session, req, res);        
    }
};

module.exports = jobinterviewratingservice;