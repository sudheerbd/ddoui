var jobtypemodel = {};

var Util = require('../../helpers/Util.js');

var tables = require("../../helpers/Tables.json");

var DDO_JOBTYPE_TABLE_NAME = tables["ddo_jobtype"];

var master = require('./');

jobtypemodel.insertJobType = function(obj, session, req, res) {

    var userInfo = session.userDetails;

    var reqObj = {};

    reqObj = {
        table: DDO_JOBTYPE_TABLE_NAME,
        name: obj.name || null,
        desc: obj.description || null,
        ddo_org_id: userInfo.ddo_org_id,
        ddo_client_id:userInfo.ddo_client_id,
        ddo_employee_id:userInfo.ddo_employee_id
    }

    master.insertRecord(reqObj, res);
    
};

jobtypemodel.getJobType = function(session, req, res) {
  
    //logged session details
    var userInfo = session.userDetails;

    var ddo_org_id = userInfo.ddo_org_id;
    var ddo_client_id = userInfo.ddo_client_id;

    reqObj = {
        table: DDO_JOBTYPE_TABLE_NAME,
        ddo_org_id: userInfo.ddo_org_id,
        id:"ddo_jobtype_id",
        ddo_client_id:userInfo.ddo_client_id
    }
    
    master.getRecord(reqObj, res);
};

jobtypemodel.updateJobType = function(obj, session, req, res) {

    var userInfo = session.userDetails;

    var reqObj = {};
    
    reqObj = {
        table: DDO_JOBTYPE_TABLE_NAME,
        name: obj.name || null,
        desc: obj.description || null,
        key:"ddo_jobtype_id",
        id: obj.ddo_jobtype_id, 
        ddo_org_id: userInfo.ddo_org_id,
        ddo_client_id:userInfo.ddo_client_id,
        ddo_employee_id:userInfo.ddo_employee_id
    }

    master.updateRecord(reqObj, res);

    
};

jobtypemodel.deleteJobType = function(obj, session, req, res) {

    //logged session details
    var userInfo = session.userDetails;

    var ddo_org_id = userInfo.ddo_org_id;
    var ddo_client_id = userInfo.ddo_client_id;

    reqObj = {
        table: DDO_JOBTYPE_TABLE_NAME,
        id: obj.ddo_jobtype_id,
        key:"ddo_jobtype_id",
        ddo_org_id: userInfo.ddo_org_id,
        ddo_client_id:userInfo.ddo_client_id
    }
    
    master.deleteRecord(reqObj, res);
    
};

module.exports = jobtypemodel;