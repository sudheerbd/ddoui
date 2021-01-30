var jobinterviewdetailsservice = {};

var jobinterviewdetailsmodel = require("../../models/talentacquisition/JobInterviewDetails.js");


jobinterviewdetailsservice.getJobInterviewDetails = function(req, res) {

    var session = req.session;

    if (!session.useremail) {

        return res.json({success: false, data: null, session: false});
    } else {

        jobinterviewdetailsmodel.getJobInterviewDetails(session, req, res);        
    }
};

module.exports = jobinterviewdetailsservice;