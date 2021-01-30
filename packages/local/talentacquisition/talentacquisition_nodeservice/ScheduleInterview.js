
var scheduleinterviewservice = {};

var scheduleinterviewmodel = require("../../models/talentacquisition/ScheduleInterview.js");

scheduleinterviewservice.insertScheduleInterview = function(req, res) {
    

    var session = req.session;

    if (!session.useremail) {

        return res.json({success: false, data: null, session: false});
    } else {

        scheduleinterviewmodel.insertScheduleInterview(req.body, session, req, res);
    }
};

scheduleinterviewservice.getScheduleInterview = function(req, res) {

    var session = req.session;

    if (!session.useremail) {

        return res.json({success: false, data: null, session: false});
    } else {

        scheduleinterviewmodel.getScheduleInterview(session, req, res);        
    }
};

scheduleinterviewservice.getScheduleInterviews = function(req, res) {

    var session = req.session;

    if (!session.useremail) {

        return res.json({success: false, data: null, session: false});
    } else {

        scheduleinterviewmodel.getScheduleInterviews(session, req, res);        
    }
};

scheduleinterviewservice.updateScheduleInterview = function(req, res) {

    var session = req.session;

    if (!session.useremail) {
    	
        return res.json({success: false, data: null, session: false});
    } else {

        scheduleinterviewmodel.updateScheduleInterview(req.body, session, req, res);        
    }
};

scheduleinterviewservice.deleteScheduleInterview = function(req, res) {

    var session = req.session;

    if (!session.useremail) {

        return res.json({success: false, data: null, session: false});
    } else {

        scheduleinterviewmodel.deleteScheduleInterview(req.body, session, req, res);        
    }
};

module.exports = scheduleinterviewservice;