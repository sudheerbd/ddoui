var jobsourcelinesservice = {};

var jobsourcelinesmodel = require("../../models/talentacquisition/JobSourceLines.js");

jobsourcelinesservice.insertJobSourceLines = function(req, res) {
    

    var session = req.session;

    if (!session.useremail) {
        return res.json({success: false, data: null, session: false});
    } else {
        var obj = {};

        //input parameters
        var reqBody = req.body;

        obj.name = reqBody.name;
        obj.description = reqBody.description;
        obj.ddo_jobsource_id = reqBody.ddo_jobsource_id;

        jobsourcelinesmodel.insertJobSourceLines(obj, session, req, res);
    }
};

jobsourcelinesservice.getJobSourceLines = function(req, res) {

    var session = req.session;

    if (!session.useremail) {
        return res.json({success: false, data: null, session: false});
    } else {
        jobsourcelinesmodel.getJobSourceLines(session, req, res);        
    }
};

jobsourcelinesservice.updateJobSourceLines = function(req, res) {

    var session = req.session;

    if (!session.useremail) {
        return res.json({success: false, data: null, session: false});
    } else {
        var obj = {};

        //input parameters
        var reqBody = req.body;

        obj.name = reqBody.name;
        obj.description = reqBody.description;
        obj.ddo_jobsourcelines_id = reqBody.ddo_jobsourcelines_id;

        jobsourcelinesmodel.updateJobSourceLines(obj, session, req, res);        
    }
};

jobsourcelinesservice.deleteJobSourceLines = function(req, res) {

    var session = req.session;

    if (!session.useremail) {
        return res.json({success: false, data: null, session: false});
    } else {
        var obj = {};

        //input parameters
        var reqBody = req.body;
        
        obj.ddo_jobsourcelines_id = reqBody.ddo_jobsourcelines_id;

        jobsourcelinesmodel.deleteJobSourceLines(obj, session, req, res);        
    }
};

module.exports = jobsourcelinesservice;