var jobopeningsmodel = {};

var tables = require("../../helpers/Tables.json");

var DDO_JOBOPENINGS_TABLE_NAME = tables["ddo_jobopenings"];

var master = require('./');

jobopeningsmodel.getJobOpenings = function(session, req, res) {

	var outputFields = {
		ddo_jobopenings_id : "",
	    jobcode :"",
	    name :"",
	    totalexperience : "", 
	    openpositions : "",
	    responsibilities : "",
	    primaryskills : "",
	    secondaryskills : "",
	    validfrom : "",
	    validto : "",
	    isbillable : "",
	    jobstatus : "",
	    ddo_department_id : "",
	    ddo_joblocation_id : "",
	    ddo_jobeducation_id : "",
	    ddo_designation_id : "",
	};
  	
    var joinTables = [
        "ddo_department",
        "ddo_joblocation",
        "ddo_jobeducation",
        "ddo_designation"
    ];

    //logged session details
    var userInfo = session.userDetails;

    var ddo_org_id = userInfo.ddo_org_id;
    var ddo_client_id = userInfo.ddo_client_id;

    reqObj = {
        table: DDO_JOBOPENINGS_TABLE_NAME,
        ddo_org_id: userInfo.ddo_org_id,
        ddo_client_id:userInfo.ddo_client_id
    }
    
    master.getOperationalData(outputFields, joinTables, reqObj, res);
};

jobopeningsmodel.insertJobOpenings = function(obj, session, req, res) {

    var userInfo = session.userDetails;

    var reqObj = {};

    reqObj = {
        table: DDO_JOBOPENINGS_TABLE_NAME,
        ddo_org_id: userInfo.ddo_org_id,
        ddo_client_id:userInfo.ddo_client_id,
        ddo_employee_id:userInfo.ddo_employee_id
    }

   master.insertOperationalData(obj, reqObj, res);
    
};

jobopeningsmodel.updateJobOpenings = function(obj, session, req, res) {

    var userInfo = session.userDetails;

    var reqObj = {};
    
    reqObj = {
        table: DDO_JOBOPENINGS_TABLE_NAME,
        key:"ddo_jobopenings_id",
        id:obj.ddo_jobopenings_id,
        ddo_org_id: userInfo.ddo_org_id,
        ddo_client_id:userInfo.ddo_client_id,
        ddo_employee_id:userInfo.ddo_employee_id
    }

    master.updateOperationalData(obj, reqObj, res);

    
};

jobopeningsmodel.deleteJobOpenings = function(obj, session, req, res) {

    //logged session details
    var userInfo = session.userDetails;

    var ddo_org_id = userInfo.ddo_org_id;
    var ddo_client_id = userInfo.ddo_client_id;

    reqObj = {
        table: DDO_JOBOPENINGS_TABLE_NAME,
        id: obj.ddo_jobopenings_id,
        key:"ddo_jobopenings_id",
        ddo_org_id: userInfo.ddo_org_id,
        ddo_client_id:userInfo.ddo_client_id
    }
    
    master.deleteRecord(reqObj, res);
    
};

module.exports = jobopeningsmodel;