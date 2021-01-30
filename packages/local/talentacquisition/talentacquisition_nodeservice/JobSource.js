var jobsourceservice = {};

var jobsourcemodel = require("../../models/talentacquisition/JobSource.js");

jobsourceservice.insertJobSource = function(req, res) {
    

    var session = req.session;

    if (!session.useremail) {
        return res.json({success: false, data: null, session: false});
    } else {
        var obj = {};
        //input parameters
        var reqBody = req.body;

        obj.name = reqBody.name;
        obj.description = reqBody.description;

        jobsourcemodel.insertJobSource(obj, session, req, res);
    }
};

jobsourceservice.getJobSource = function(req, res) {

    var session = req.session;

    if (!session.useremail) {
        return res.json({success: false, data: null, session: false});
    } else {
        jobsourcemodel.getJobSource(session, req, res);        
    }
};

jobsourceservice.updateJobSource = function(req, res) {

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

        jobsourcemodel.updateJobSource(obj, session, req, res);        
    }
};

jobsourceservice.deleteJobSource = function(req, res) {

    var session = req.session;

    if (!session.useremail) {
        return res.json({success: false, data: null, session: false});
    } else {
        var obj = {};

        //input parameters
        var reqBody = req.body;
        
        obj.ddo_jobsource_id = reqBody.ddo_jobsource_id;

        jobsourcemodel.deleteJobSource(obj, session, req, res);        
    }
};

module.exports = jobsourceservice;