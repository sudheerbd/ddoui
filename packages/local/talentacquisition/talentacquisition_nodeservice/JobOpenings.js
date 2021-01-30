var jobopeningsservice = {};

var jobopeningsmodel = require("../../models/talentacquisition/JobOpenings.js");

jobopeningsservice.insertJobOpenings = function(req, res) {
    

    var session = req.session;

    if (!session.useremail) {
        return res.json({success: false, data: null, session: false});
    } else {

        jobopeningsmodel.insertJobOpenings(req.body, session, req, res);
    }
};

jobopeningsservice.getJobOpenings = function(req, res) {

    var session = req.session;

    if (!session.useremail) {
        return res.json({success: false, data: null, session: false});
    } else {
        jobopeningsmodel.getJobOpenings(session, req, res);        
    }
};

jobopeningsservice.updateJobOpenings = function(req, res) {

    var session = req.session;

    if (!session.useremail) {

        return res.json({success: false, data: null, session: false});
    } else {

        jobopeningsmodel.updateJobOpenings(req.body, session, req, res);        
    }
};

jobopeningsservice.deleteJobOpenings = function(req, res) {

    var session = req.session;

    if (!session.useremail) {
        
        return res.json({success: false, data: null, session: false});
    } else {

        jobopeningsmodel.deleteJobOpenings(req.body, session, req, res);        
    }
};

module.exports = jobopeningsservice;