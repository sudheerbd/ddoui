var employeereferralservice = {};

var employeereferralmodel = require("../../models/talentacquisition/EmployeeReferral.js");

employeereferralservice.insertEmployeeReferral = function(req, res) {
    

    var session = req.session;

    if (!session.useremail) {
        return res.json({success: false, data: null, session: false});
    } else {

        employeereferralmodel.insertEmployeeReferral(req.body, session, req, res);
    }
};

employeereferralservice.getEmployeeReferral = function(req, res) {

    var session = req.session;

    if (!session.useremail) {
        return res.json({success: false, data: null, session: false});
    } else {
        employeereferralmodel.getEmployeeReferral(session, req, res);        
    }
};

employeereferralservice.updateEmployeeReferral = function(req, res) {

    var session = req.session;

    if (!session.useremail) {
        return res.json({success: false, data: null, session: false});
    } else {

        employeereferralmodel.updateEmployeeReferral(req.body, session, req, res);       
    }
};

employeereferralservice.deleteEmployeeReferral = function(req, res) {

    var session = req.session;

    if (!session.useremail) {
        return res.json({success: false, data: null, session: false});
    } else {
        var obj = {};

        //input parameters
        var reqBody = req.body;
        
        obj.ddo_employeereferral_id = reqBody.ddo_employeereferral_id;

        employeereferralmodel.deleteEmployeeReferral(obj, session, req, res);        
    }
};

module.exports = employeereferralservice;