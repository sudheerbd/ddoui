var jobinterviewdetailsmodel = {};

var db = require("../../helpers/db/Postgres.js");

var Util = require("../../helpers/Util.js");


var tables = require("../../helpers/Tables.json");

var DDO_JOBAPPLICATIONS_TABLE_NAME = tables["ddo_jobapplications"];
var DDO_JOBAPPLICATIONSTATUS_TABLE_NAME = tables["ddo_jobapplicationstatus"];
var DDO_JOBINTERVIEWRATING_TABLE_NAME = tables["ddo_jobinterviewrating"];
var DDO_SCHEDULEINTERVIEW_TABLE_NAME = tables["ddo_scheduleinterview"];
var DDO_JOBINTERVIEWFEEDBACK_TABLE_NAME = tables["ddo_jobinterviewfeedback"];

var Q = require("q");

var master = require('./');

jobinterviewdetailsmodel.getJobInterviewDetails = function(session, req, res) {
  
    //getting values from session
    var userInfo = session.userDetails;

    var ddo_org_id = userInfo.ddo_org_id;
    var ddo_client_id = userInfo.ddo_client_id;

    if(!req.params.id){
        return res.status(500).json({success: false, data: null, message: 'Missing required data!'});
    }

    //condition passing to query 
    var condition = "WHERE jobapp.isactive = 'Y' AND jobapp.ddo_client_id=$1 AND jobapp.ddo_org_id=$2 AND jobapp.ddo_jobapplications_id=$3 ";

    var query = "SELECT jobapp.skilltype, jobapp.ddo_jobapplications_id, jobapp.email, jobapp.mobilenumber, " +
    "CONCAT(jobapp.firstname,' ',jobapp.lastname) as username, " +
    
    "(SELECT jobstatus.name  FROM "+ DDO_JOBAPPLICATIONSTATUS_TABLE_NAME + " jobstatus "+
    "WHERE jobapp.ddo_jobapplicationstatus_id = jobstatus.ddo_jobapplicationstatus_id and jobstatus.isactive='Y' and "+
    "jobstatus.ddo_org_id = jobapp.ddo_org_id and jobstatus.ddo_client_id = jobapp.ddo_client_id) as status, "+

    "jobschedule.intervieweremployeeid, jobschedule.interviewtype, jobschedule.interviewdate, "+
    "jobfeedback.feedback, "+
    "jobrating.name as rating, "+
    "CONCAT(ddo_employee.firstname,' ',ddo_employee.lastname) as interviewername "+
    
    "FROM "+DDO_JOBAPPLICATIONS_TABLE_NAME + " jobapp "+
    
    "left join " + DDO_SCHEDULEINTERVIEW_TABLE_NAME + " jobschedule on " +
    "jobapp.ddo_jobapplications_id = jobschedule.ddo_jobapplications_id and jobschedule.isactive='Y' and " +
    "jobschedule.ddo_org_id = jobapp.ddo_org_id " +

    "left join ddo_employee on jobschedule.intervieweremployeeid = ddo_employee.ddo_employee_id and "+
    "ddo_employee.isactive='Y' and " +
    "ddo_employee.ddo_org_id = ddo_employee.ddo_org_id " +

    "left join " + DDO_JOBINTERVIEWFEEDBACK_TABLE_NAME + " jobfeedback on " +
    "jobschedule.ddo_scheduleinterview_id = jobfeedback.ddo_scheduleinterview_id and jobfeedback.isactive='Y' and "+ 
    "jobfeedback.ddo_org_id = jobapp.ddo_org_id " +

    "left join " + DDO_JOBINTERVIEWRATING_TABLE_NAME + " jobrating on " +
    "jobfeedback.ddo_jobinterviewrating_id = jobrating.ddo_jobinterviewrating_id and jobrating.isactive='Y' and "+
    "jobrating.ddo_org_id = jobapp.ddo_org_id "+condition
    
    // query execution
    db.selectQuery(query, [ddo_client_id, ddo_org_id, req.params.id], function(err, data) {
        if (err) {

            return res.status(500).json({success: false, data: err, message: 'Failed to get records!'});
            
        } else {

            return res.json({success: true, data: data, totalCount: data.length});
        }
    });
};

module.exports = jobinterviewdetailsmodel;