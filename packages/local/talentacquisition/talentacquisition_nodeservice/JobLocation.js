var joblocationservice = {};

var joblocationmodel = require("../../models/talentacquisition/JobLocation.js");

joblocationservice.insertJobLocation = function(req, res) {
    

    var session = req.session;

    if (!session.useremail) {
        return res.json({success: false, data: null, session: false});
    } else {
        var obj = {};
        //input parameters
        var reqBody = req.body;

        obj.name = reqBody.name;
        obj.description = reqBody.description;

        joblocationmodel.insertJobLocation(obj, session, req, res);
    }
};

joblocationservice.getJobLocation = function(req, res) {

    var session = req.session;

    if (!session.useremail) {
        return res.json({success: false, data: null, session: false});
    } else {
        joblocationmodel.getJobLocation(session, req, res);        
    }
};

joblocationservice.updateJobLocation = function(req, res) {

    var session = req.session;

    if (!session.useremail) {
        return res.json({success: false, data: null, session: false});
    } else {
        var obj = {};

        //input parameters
        var reqBody = req.body;

        obj.name = reqBody.name;
        obj.description = reqBody.description;
        obj.ddo_joblocation_id = reqBody.ddo_joblocation_id;

        joblocationmodel.updateJobLocation(obj, session, req, res);        
    }
};

joblocationservice.deleteJobLocation = function(req, res) {

    var session = req.session;

    if (!session.useremail) {
        return res.json({success: false, data: null, session: false});
    } else {
        var obj = {};

        //input parameters
        var reqBody = req.body;
        
        obj.ddo_joblocation_id = reqBody.ddo_joblocation_id;

        joblocationmodel.deleteJobLocation(obj, session, req, res);        
    }
};

module.exports = joblocationservice;