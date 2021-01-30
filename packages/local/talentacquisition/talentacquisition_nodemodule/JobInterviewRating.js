var jobinterviewrating = {};

var Util = require('../../helpers/Util.js');

var tables = require("../../helpers/Tables.json");

var DDO_JOBINTERVIEWRATING_TABLE_NAME = tables["ddo_jobinterviewrating"];

var master = require('./');

jobinterviewrating.insertJobInterviewRating = function(obj, session, req, res) {

    var userInfo = session.userDetails;

    var reqObj = {};

    reqObj = {
        table: DDO_JOBINTERVIEWRATING_TABLE_NAME,
        name: obj.name || null,
        desc: obj.description || null,
        ddo_org_id: userInfo.ddo_org_id,
        ddo_client_id:userInfo.ddo_client_id,
        ddo_employee_id:userInfo.ddo_employee_id
    }

    master.insertRecord(reqObj, res);
    
};

jobinterviewrating.getJobInterviewRating = function(session, req, res) {
  
    //logged session details
    var userInfo = session.userDetails;

    var ddo_org_id = userInfo.ddo_org_id;
    var ddo_client_id = userInfo.ddo_client_id;

    reqObj = {
        table: DDO_JOBINTERVIEWRATING_TABLE_NAME,
        ddo_org_id: userInfo.ddo_org_id,
        id:"ddo_jobinterviewrating_id",
        ddo_client_id:userInfo.ddo_client_id
    }
    
    master.getRecord(reqObj, res);
};

jobinterviewrating.updateJobInterviewRating = function(obj, session, req, res) {

    var userInfo = session.userDetails;

    var reqObj = {};
    
    reqObj = {
        table: DDO_JOBINTERVIEWRATING_TABLE_NAME,
        name: obj.name || null,
        desc: obj.description || null,
        key:"ddo_jobinterviewrating_id",
        id: obj.ddo_jobinterviewrating_id, 
        ddo_org_id: userInfo.ddo_org_id,
        ddo_client_id:userInfo.ddo_client_id,
        ddo_employee_id:userInfo.ddo_employee_id
    }

    master.updateRecord(reqObj, res);

    
};

jobinterviewrating.deleteJobInterviewRating = function(obj, session, req, res) {

    //logged session details
    var userInfo = session.userDetails;

    var ddo_org_id = userInfo.ddo_org_id;
    var ddo_client_id = userInfo.ddo_client_id;

    reqObj = {
        table: DDO_JOBINTERVIEWRATING_TABLE_NAME,
        id: obj.ddo_jobinterviewrating_id,
        key:"ddo_jobinterviewrating_id",
        ddo_org_id: userInfo.ddo_org_id,
        ddo_client_id:userInfo.ddo_client_id
    }
    
    master.deleteRecord(reqObj, res);
    
};

module.exports = jobinterviewrating;