var jobtypeservice = {};

var jobtypemodel = require("../../models/talentacquisition/JobType.js");

jobtypeservice.insertJobType = function(req, res) {
    

    var session = req.session;

    if (!session.useremail) {
        return res.json({success: false, data: null, session: false});
    } else {
        var obj = {};
        //input parameters
        var reqBody = req.body;

        obj.name = reqBody.name;
        obj.description = reqBody.description;

        jobtypemodel.insertJobType(obj, session, req, res);
    }
};

jobtypeservice.getJobType = function(req, res) {

    var session = req.session;

    if (!session.useremail) {
        return res.json({success: false, data: null, session: false});
    } else {
        jobtypemodel.getJobType(session, req, res);        
    }
};

jobtypeservice.updateJobType = function(req, res) {

    var session = req.session;

    if (!session.useremail) {
        return res.json({success: false, data: null, session: false});
    } else {
        var obj = {};

        //input parameters
        var reqBody = req.body;

        obj.name = reqBody.name;
        obj.description = reqBody.description;
        obj.ddo_jobtype_id = reqBody.ddo_jobtype_id;

        jobtypemodel.updateJobType(obj, session, req, res);        
    }
};

jobtypeservice.deleteJobType = function(req, res) {

    var session = req.session;

    if (!session.useremail) {
        return res.json({success: false, data: null, session: false});
    } else {
        var obj = {};

        //input parameters
        var reqBody = req.body;
        
        obj.ddo_jobtype_id = reqBody.ddo_jobtype_id;

        jobtypemodel.deleteJobType(obj, session, req, res);        
    }
};

module.exports = jobtypeservice;