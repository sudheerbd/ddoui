var jobsourcemodel = {};

var Util = require('../../helpers/Util.js');

var tables = require("../../helpers/Tables.json");

var DDO_JOBSOURCE_TABLE_NAME = tables["ddo_jobsource"];

var master = require('./');

jobsourcemodel.insertJobSource = function(obj, session, req, res) {

    var userInfo = session.userDetails;

    var reqObj = {};

    reqObj = {
        table: DDO_JOBSOURCE_TABLE_NAME,
        name: obj.name || null,
        desc: obj.description || null,
        ddo_org_id: userInfo.ddo_org_id,
        ddo_client_id:userInfo.ddo_client_id,
        ddo_employee_id:userInfo.ddo_employee_id
    }

    master.insertRecord(reqObj, res);
    
};

jobsourcemodel.getJobSource = function(session, req, res) {
  
    //logged session details
    var userInfo = session.userDetails;

    var ddo_org_id = userInfo.ddo_org_id;
    var ddo_client_id = userInfo.ddo_client_id;

    reqObj = {
        table: DDO_JOBSOURCE_TABLE_NAME,
        ddo_org_id: userInfo.ddo_org_id,
        id:"ddo_jobsource_id",
        ddo_client_id:userInfo.ddo_client_id
    }
    
    master.getRecord(reqObj, res);
};

jobsourcemodel.updateJobSource = function(obj, session, req, res) {

    var userInfo = session.userDetails;

    var reqObj = {};
    
    reqObj = {
        table: DDO_JOBSOURCE_TABLE_NAME,
        name: obj.name || null,
        desc: obj.description || null,
        key:"ddo_jobsource_id",
        id: obj.ddo_jobsource_id, 
        ddo_org_id: userInfo.ddo_org_id,
        ddo_client_id:userInfo.ddo_client_id,
        ddo_employee_id:userInfo.ddo_employee_id
    }

    master.updateRecord(reqObj, res);

    
};

jobsourcemodel.deleteJobSource = function(obj, session, req, res) {

    //logged session details
    var userInfo = session.userDetails;

    var ddo_org_id = userInfo.ddo_org_id;
    var ddo_client_id = userInfo.ddo_client_id;

    reqObj = {
        table: DDO_JOBSOURCE_TABLE_NAME,
        id: obj.ddo_jobsource_id,
        key:"ddo_jobsource_id",
        ddo_org_id: userInfo.ddo_org_id,
        ddo_client_id:userInfo.ddo_client_id
    }
    
    master.deleteRecord(reqObj, res);
    
};

module.exports = jobsourcemodel;