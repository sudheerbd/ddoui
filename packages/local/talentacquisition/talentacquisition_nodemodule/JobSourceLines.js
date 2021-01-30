var jobsourcelinesmodel = {};

var Util = require('../../helpers/Util.js');

var tables = require("../../helpers/Tables.json");

var DDO_JOBSOURCELINES_TABLE_NAME = tables["ddo_jobsourcelines"];

var master = require('./');

var db = require("../../helpers/db/Postgres.js");

jobsourcelinesmodel.insertJobSourceLines = function(obj, session, req, res) {

   var userInfo = session.userDetails;

   var reqObj = {};

   reqObj = {
       table: DDO_JOBSOURCELINES_TABLE_NAME,
       name: obj.name || null,
       desc: obj.description || null,
       ddo_org_id: userInfo.ddo_org_id,
       ddo_client_id:userInfo.ddo_client_id,
       ddo_employee_id:userInfo.ddo_employee_id,
       ddo_jobsource_id:obj.ddo_jobsource_id || null
   }
   if(reqObj.name && reqObj.desc){
       reqObj.name = master.escapeMe(reqObj.name);
       reqObj.desc = master.escapeMe(reqObj.desc);
       var columns = "name, description, ddo_client_id, ddo_org_id, ddo_jobsource_id, createdby, updatedby";
       var values = "('" + reqObj.name + "','" + reqObj.desc + "'," + reqObj.ddo_client_id + "," + reqObj.ddo_org_id + ","+ reqObj.ddo_jobsource_id + ","+ reqObj.ddo_employee_id +","+ reqObj.ddo_employee_id +")";
   }else if(reqObj.name){
       reqObj.name = master.escapeMe(reqObj.name);
       var columns = "name, ddo_client_id, ddo_org_id, ddo_jobsource_id, createdby, updatedby";
       var values = "('" + reqObj.name + "'," + reqObj.ddo_client_id +"," + reqObj.ddo_org_id +  ","+ reqObj.ddo_jobsource_id +","+ reqObj.ddo_employee_id +","+ reqObj.ddo_employee_id +")";
   }else{

       return res.status(500).json({success: false, data: null, message: 'Missing required data!'});
   }
   
   var query = "INSERT INTO " + DDO_JOBSOURCELINES_TABLE_NAME + " (" + columns + ") VALUES " + values;
   console.log("Query for job source line insert:", query);
   db.selectQuery(query, [], function(err, data) {
       if (err) {
           
           return res.status(500).json({success: false, data: err, message: 'Failed to create record!'});
       } else {

           return res.json({success: true, message: "Successfully record is created"});
       }
   });

   //master.insertRecord(reqObj, res);
   
};

jobsourcelinesmodel.getJobSourceLines = function(session, req, res) {
  
    //logged session details
    var userInfo = session.userDetails;

    var ddo_org_id = userInfo.ddo_org_id;
    var ddo_client_id = userInfo.ddo_client_id;

    var condition = DDO_JOBSOURCELINES_TABLE_NAME+".isactive = 'Y' AND "+
      DDO_JOBSOURCELINES_TABLE_NAME+".DDO_Client_ID=$1 AND "+
      DDO_JOBSOURCELINES_TABLE_NAME+".DDO_Org_ID=$2";

    var query = "SELECT "+DDO_JOBSOURCELINES_TABLE_NAME+".name, "+
      DDO_JOBSOURCELINES_TABLE_NAME+".description, "+
      DDO_JOBSOURCELINES_TABLE_NAME+".ddo_jobsource_id, "+
      "ddo_jobsource.name ddo_jobsource_name, " +
      DDO_JOBSOURCELINES_TABLE_NAME+".ddo_jobsourcelines_id FROM "+
      DDO_JOBSOURCELINES_TABLE_NAME+" LEFT JOIN ddo_jobsource ON ddo_jobsource.ddo_jobsource_id = "+
      DDO_JOBSOURCELINES_TABLE_NAME+".ddo_jobsource_id"+
      " WHERE " + condition;

    db.selectQuery(query, [userInfo.ddo_client_id, userInfo.ddo_org_id], function(err, data) {
        if (err) {

            return res.status(500).json({success: false, data: err, message: 'Failed to get records!'});
        } else {

            return res.json({success: true, totalCount: data.length, data: data});
        }
    });
};

jobsourcelinesmodel.updateJobSourceLines = function(obj, session, req, res) {

    var userInfo = session.userDetails;

    var reqObj = {};
    
    reqObj = {
        table: DDO_JOBSOURCELINES_TABLE_NAME,
        name: obj.name || null,
        desc: obj.description || null,
        key:"ddo_jobsourcelines_id",
        id: obj.ddo_jobsourcelines_id, 
        ddo_org_id: userInfo.ddo_org_id,
        ddo_client_id:userInfo.ddo_client_id,
        ddo_employee_id:userInfo.ddo_employee_id
    }

    master.updateRecord(reqObj, res);

    
};

jobsourcelinesmodel.deleteJobSourceLines = function(obj, session, req, res) {

    //logged session details
    var userInfo = session.userDetails;

    var ddo_org_id = userInfo.ddo_org_id;
    var ddo_client_id = userInfo.ddo_client_id;

    reqObj = {
        table: DDO_JOBSOURCELINES_TABLE_NAME,
        id: obj.ddo_jobsourcelines_id,
        key:"ddo_jobsourcelines_id",
        ddo_org_id: userInfo.ddo_org_id,
        ddo_client_id:userInfo.ddo_client_id
    }
    
    master.deleteRecord(reqObj, res);
    
};

module.exports = jobsourcelinesmodel;