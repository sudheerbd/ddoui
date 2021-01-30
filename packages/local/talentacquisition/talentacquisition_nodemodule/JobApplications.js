var jobapplicationsmodel = {};

var tables = require("../../helpers/Tables.json");

var DDO_JOBAPPLICATIONS_TABLE_NAME = tables["ddo_jobapplications"];

var master = require('./');

jobapplicationsmodel.getJobApplications = function(session, req, res) {

	var outputFields = {
		ddo_jobapplications_id :"",
        firstname :"",
        middlename :"",
        lastname :"",
        fathersname :"",
        yearofpassing :"",
        skilltype :"",
        mobilenumber :"",
        email :"",
        address :"",
        currentcity :"",
        currentemploymentstatus :"",
        previouscompany :"",
        totalexperience :"",
        idproof :"",      
        idproofnumber :"",
        appliedon :"",
        availablefrom :"",
        noticeperiodindays :"",
        curriculumvitae :"",     
        JobSourceValue :"",
        comments :"",
        recruitedby  :"",
        referredby :"",
        vendorname :"",
        jobportalname  :"", 
        ddo_jobsource_id  :"",
        ddo_jobopenings_id :"",
        ddo_jobeducation_id :"",
        ddo_designation_id :"",
        ddo_jobapplicationstatus_id :""
	};
  	var joinTables = [
        "ddo_jobsource",
        "ddo_jobopenings",
        "ddo_jobeducation",
        "ddo_designation",
        "ddo_jobapplicationstatus"
    ];
    //logged session details
    var userInfo = session.userDetails;

    var ddo_org_id = userInfo.ddo_org_id;
    var ddo_client_id = userInfo.ddo_client_id;

    reqObj = {
        table: DDO_JOBAPPLICATIONS_TABLE_NAME,
        ddo_org_id: userInfo.ddo_org_id,
        ddo_client_id:userInfo.ddo_client_id
    }
    
    master.getOperationalData(outputFields, joinTables, reqObj, res);
};

jobapplicationsmodel.insertJobApplications = function(obj, session, req, res) {

    var userInfo = session.userDetails;

    var reqObj = {};

    reqObj = {
        table: DDO_JOBAPPLICATIONS_TABLE_NAME,
        ddo_org_id: userInfo.ddo_org_id,
        ddo_client_id:userInfo.ddo_client_id,
        ddo_employee_id:userInfo.ddo_employee_id
    }

   master.insertOperationalData(obj, reqObj, res);
    
};

jobapplicationsmodel.updateJobApplications = function(obj, session, req, res) {

    var userInfo = session.userDetails;

    var reqObj = {};
    
    reqObj = {
        table: DDO_JOBAPPLICATIONS_TABLE_NAME,
        key:"ddo_jobapplications_id",
        id:obj.ddo_jobapplications_id,
        ddo_org_id: userInfo.ddo_org_id,
        ddo_client_id:userInfo.ddo_client_id,
        ddo_employee_id:userInfo.ddo_employee_id
    }

    master.updateOperationalData(obj, reqObj, res);

    
};

jobapplicationsmodel.deleteJobApplications = function(obj, session, req, res) {

    //logged session details
    var userInfo = session.userDetails;

    var ddo_org_id = userInfo.ddo_org_id;
    var ddo_client_id = userInfo.ddo_client_id;

    reqObj = {
        table: DDO_JOBAPPLICATIONS_TABLE_NAME,
        id: obj.ddo_jobapplications_id,
        key:"ddo_jobapplications_id",
        ddo_org_id: userInfo.ddo_org_id,
        ddo_client_id:userInfo.ddo_client_id
    }
    
    master.deleteRecord(reqObj, res);
    
};

module.exports = jobapplicationsmodel;