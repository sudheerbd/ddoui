var jobinterviewstatusmodel = {};

var Util = require('../../helpers/Util.js');

var tables = require("../../helpers/Tables.json");

var DDO_JOBINTERVIEWSTATUS_TABLE_NAME = tables["ddo_jobinterviewstatus"];

var master = require('./');

jobinterviewstatusmodel.insertJobInterviewStatus = function(obj, session, req, res) {

    var userInfo = session.userDetails;

    var reqObj = {};

    reqObj = {
        table: DDO_JOBINTERVIEWSTATUS_TABLE_NAME,
        name: obj.name || null,
        desc: obj.description || null,
        ddo_org_id: userInfo.ddo_org_id,
        ddo_client_id:userInfo.ddo_client_id,
        ddo_employee_id:userInfo.ddo_employee_id
    }

    master.insertRecord(reqObj, res);
    
};

jobinterviewstatusmodel.getJobInterviewStatus = function(session, req, res) {
  
    //logged session details
    var userInfo = session.userDetails;

    var ddo_org_id = userInfo.ddo_org_id;
    var ddo_client_id = userInfo.ddo_client_id;

    reqObj = {
        table: DDO_JOBINTERVIEWSTATUS_TABLE_NAME,
        ddo_org_id: userInfo.ddo_org_id,
        id:"ddo_jobinterviewstatus_id",
        ddo_client_id:userInfo.ddo_client_id
    }
    
    master.getRecord(reqObj, res);
};

jobinterviewstatusmodel.updateJobInterviewStatus = function(obj, session, req, res) {

    var userInfo = session.userDetails;

    var reqObj = {};
    
    reqObj = {
        table: DDO_JOBINTERVIEWSTATUS_TABLE_NAME,
        name: obj.name || null,
        desc: obj.description || null,
        key:"ddo_jobinterviewstatus_id",
        id: obj.ddo_jobinterviewstatus_id, 
        ddo_org_id: userInfo.ddo_org_id,
        ddo_client_id:userInfo.ddo_client_id,
        ddo_employee_id:userInfo.ddo_employee_id
    }

    master.updateRecord(reqObj, res);

    
};

jobinterviewstatusmodel.deleteJobInterviewStatus = function(obj, session, req, res) {

    //logged session details
    var userInfo = session.userDetails;

    var ddo_org_id = userInfo.ddo_org_id;
    var ddo_client_id = userInfo.ddo_client_id;

    reqObj = {
        table: DDO_JOBINTERVIEWSTATUS_TABLE_NAME,
        id: obj.ddo_jobinterviewstatus_id,
        key:"ddo_jobinterviewstatus_id",
        ddo_org_id: userInfo.ddo_org_id,
        ddo_client_id:userInfo.ddo_client_id
    }
    
    master.deleteRecord(reqObj, res);
    
};

module.exports = jobinterviewstatusmodel;