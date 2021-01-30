var jobeducationservice = {};

var jobeducationmodel = require("../../models/talentacquisition/JobEducation.js");

jobeducationservice.insertJobEducation = function(req, res) {
    

    var session = req.session;

    if (!session.useremail) {
        return res.json({success: false, data: null, session: false});
    } else {
        var obj = {};
        //input parameters
        var reqBody = req.body;

        obj.name = reqBody.name;
        obj.description = reqBody.description;

        jobeducationmodel.insertJobEducation(obj, session, req, res);
    }
};

jobeducationservice.getJobEducation = function(req, res) {

    var session = req.session;

    if (!session.useremail) {
        return res.json({success: false, data: null, session: false});
    } else {
        jobeducationmodel.getJobEducation(session, req, res);        
    }
};

jobeducationservice.updateJobEducation = function(req, res) {

    var session = req.session;

    if (!session.useremail) {
        return res.json({success: false, data: null, session: false});
    } else {
        var obj = {};

        //input parameters
        var reqBody = req.body;

        obj.name = reqBody.name;
        obj.description = reqBody.description;
        obj.ddo_jobeducation_id = reqBody.ddo_jobeducation_id;

        jobeducationmodel.updateJobEducation(obj, session, req, res);        
    }
};

jobeducationservice.deleteJobEducation = function(req, res) {

    var session = req.session;

    if (!session.useremail) {
        return res.json({success: false, data: null, session: false});
    } else {
        var obj = {};

        //input parameters
        var reqBody = req.body;
        
        obj.ddo_jobeducation_id = reqBody.ddo_jobeducation_id;

        jobeducationmodel.deleteJobEducation(obj, session, req, res);        
    }
};

module.exports = jobeducationservice;