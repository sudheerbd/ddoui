
var employeereferralmodel = {};

var tables = require("../../helpers/Tables.json");

var DDO_EMPLOYEEREFERRAL_TABLE_NAME = tables["ddo_employeereferral"];

var master = require('./');

employeereferralmodel.getEmployeeReferral = function(session, req, res) {

	var outputFields = {
		ddo_employeereferral_id :"",
	    primaryskills :"",
	    candidatename :"",
	    email :"",
	    phone :"",
	    location :"",
	    recommendation :"",
	    relation :"",      
	    referredby :"",
        applicationId :"",
	    ddo_jobopenings_id :"",
	    ddo_jobapplicationstatus_id :"",  
		ddo_jobapplications_id :"",
        curriculumvitae:""
	};
  	
    var joinTables = [
        "ddo_jobopenings",
        "ddo_jobapplicationstatus"
    ];

    //logged session details
    var userInfo = session.userDetails;

    var ddo_org_id = userInfo.ddo_org_id;
    var ddo_client_id = userInfo.ddo_client_id;

    reqObj = {
        table: DDO_EMPLOYEEREFERRAL_TABLE_NAME,
        ddo_org_id: userInfo.ddo_org_id,
        ddo_client_id:userInfo.ddo_client_id
    }
 
    master.getOperationalData(outputFields, joinTables, reqObj, res);
};

employeereferralmodel.insertEmployeeReferral = function(obj, session, req, res) {

    var userInfo = session.userDetails;

    var reqObj = {};

    reqObj = {
        table: DDO_EMPLOYEEREFERRAL_TABLE_NAME,
        ddo_org_id: userInfo.ddo_org_id,
        ddo_client_id:userInfo.ddo_client_id,
        ddo_employee_id:userInfo.ddo_employee_id
    }
    obj["referredby"] = userInfo.ddo_employee_id;
    master.insertOperationalData(obj, reqObj, res);
    
};

employeereferralmodel.updateEmployeeReferral = function(obj, session, req, res) {

    var userInfo = session.userDetails;

    var reqObj = {};
    
    reqObj = {
        table: DDO_EMPLOYEEREFERRAL_TABLE_NAME,
        key:"ddo_employeereferral_id",
        id:obj.ddo_employeereferral_id,
        ddo_org_id: userInfo.ddo_org_id,
        ddo_client_id:userInfo.ddo_client_id,
        ddo_employee_id:userInfo.ddo_employee_id
    }
    
    master.updateOperationalData(obj, reqObj, res);

    
};

employeereferralmodel.deleteEmployeeReferral = function(obj, session, req, res) {

    //logged session details
    var userInfo = session.userDetails;

    var ddo_org_id = userInfo.ddo_org_id;
    var ddo_client_id = userInfo.ddo_client_id;

    reqObj = {
        table: DDO_EMPLOYEEREFERRAL_TABLE_NAME,
        id: obj.ddo_employeereferral_id,
        key:"ddo_employeereferral_id",
        ddo_org_id: userInfo.ddo_org_id,
        ddo_client_id:userInfo.ddo_client_id
    }
    
    master.deleteRecord(reqObj, res);
    
};

module.exports = employeereferralmodel;