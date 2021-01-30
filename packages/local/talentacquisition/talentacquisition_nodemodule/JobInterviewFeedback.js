var Q = require("q");

//(#pre-includes)
//db usage file like connection, query passage, etc...,
var db = require("../../helpers/db/Postgres.js");

//transaction for PG
var Transaction = require('pg-transaction');

var Util = require('../../helpers/Util.js');

var messages = require("../../helpers/Messages.json");

//For error or success or anything else response color
var chalk = require('chalk');

//for error response color
var success = chalk.green;
var error = chalk.red;

var jobinterviewfeedbackmodel = {};

var tables = require("../../helpers/Tables.json");

var DDO_JOBINTERVIEWFEEDBACK_TABLE_NAME = tables["ddo_jobinterviewfeedback"];

var master = require('./');

//The Lodash library exported as Node.js modules.
// Load method categories. 
var object = require('lodash/fp/object');

jobinterviewfeedbackmodel.getJobInterviewFeedback = function(obj, session, req, res) {

	var outputFields = {
		ddo_jobinterviewfeedback_id :"",
	    feedback :"",
	    ddo_jobinterviewrating_id :"",
	    ddo_jobopenings_id :"",
	    ddo_jobapplications_id :"",
	    ddo_scheduleinterview_id :""
	};
  	var joinTables = [
        "ddo_jobinterviewrating",
        "ddo_scheduleinterview"
    ];
    //logged session details
    var userInfo = session.userDetails;

    var ddo_org_id = userInfo.ddo_org_id;
    var ddo_client_id = userInfo.ddo_client_id;

    reqObj = {
        table: DDO_JOBINTERVIEWFEEDBACK_TABLE_NAME,
        ddo_org_id: userInfo.ddo_org_id,
        ddo_client_id:userInfo.ddo_client_id
    }
    
    master.getOperationalData(outputFields, joinTables,reqObj, res);
};
jobinterviewfeedbackmodel.updateJobInterviewFeedback = function(obj, session, req, res) {

    var userInfo = session.userDetails;

    var reqObj = {};
    
    reqObj = {
        table: DDO_JOBINTERVIEWFEEDBACK_TABLE_NAME,
        key:"ddo_jobinterviewfeedback_id",
        id:obj.ddo_jobinterviewfeedback_id,
        ddo_org_id: userInfo.ddo_org_id,
        ddo_client_id:userInfo.ddo_client_id,
        ddo_employee_id:userInfo.ddo_employee_id
    }

    master.updateOperationalData(obj, reqObj, res);

    
};

jobinterviewfeedbackmodel.deleteJobInterviewFeedback = function(obj, session, req, res) {

    //logged session details
    var userInfo = session.userDetails;

    var ddo_org_id = userInfo.ddo_org_id;
    var ddo_client_id = userInfo.ddo_client_id;

    reqObj = {
        table: DDO_JOBINTERVIEWFEEDBACK_TABLE_NAME,
        id: obj.ddo_jobinterviewfeedback_id,
        key:"ddo_jobinterviewfeedback_id",
        ddo_org_id: userInfo.ddo_org_id,
        ddo_client_id:userInfo.ddo_client_id
    }
    
    master.deleteRecord(reqObj, res);
    
};


jobinterviewfeedbackmodel.insertJobInterviewFeedback = function(obj, session, req, res) {

    var userInfo = session.userDetails;

    var reqObj = {};

    

    reqObj = {
        table: DDO_JOBINTERVIEWFEEDBACK_TABLE_NAME,
        ddo_org_id: userInfo.ddo_org_id,
        ddo_client_id:userInfo.ddo_client_id,
        ddo_employee_id:userInfo.ddo_employee_id
    }

    for (var key in obj) {
        if(obj[key] === ""){
            delete obj[key]
        }
        obj[key] = master.escapeMe(obj[key]);
    }

    var queryValues =  object.values(obj);

    queryValues = queryValues.map(function(item,index){
        if (typeof item == "string" ){
            item = "'"+item+"'";
        }
        return item;
    });


    var  queryData = {
        queryvalue:queryValues,
        queryobj:obj,
        queryfields:Object.keys(obj)
    };

    db.connect(function(err, client, done){
        if (err) {

            return res.status(500).json({success: false, data: null, message: 'Error produced while connecting to DB!'});
           
        } else {
            queryData.queryobj['savepoint'] = "jonInterviewFeedback";

            //Set the transaction for DB connection
            var tx = new Transaction(client);

            //begin the transaction process
            tx.begin();

            //create a save point
            tx.savepoint(queryData.queryobj['savepoint']);

            queryData.queryobj['tx'] = tx;

            queryData.queryobj['client'] = client;

            queryData.queryobj['done'] = done;

            queryData.queryobj['res'] = res;

            //Ddo_client record insertion
            jobinterviewfeedbackmodel.insertionQuery(queryData, reqObj, res)
                .then(function(data) {
                    return jobinterviewfeedbackmodel.updateIsProcessed(data, queryData, reqObj, res);
                })
                .then(function(data){
                    Util.commitFn(queryData.queryobj, 'Successfully updated');
                })
                //Exception stackoverflow
                .catch(function(err) {
                    Util.rollbackFn(queryData.queryobj, err, 'Failed to update!');
                })
                .done();
        }
    })
    //master.insertOperationalData(obj, reqObj, res);
    
};



//Common insert query for schedular process
jobinterviewfeedbackmodel.insertionQuery = function(queryData, reqObj, res) {
    var deferred = Q.defer();

    var query = "INSERT INTO " + reqObj.table + " (" + queryData.queryfields.join(',') + ", ddo_client_id,ddo_org_id,createdby,updatedby) VALUES (" + queryData.queryvalue.join(',')+","+reqObj.ddo_client_id+","+reqObj.ddo_org_id+","+reqObj.ddo_employee_id+","+reqObj.ddo_employee_id+")";
    
    db.selectQuery(query, [], queryData.queryobj['client'], function(err, data) {
        if (err) {
            deferred.reject(err);
        } else {
            deferred.resolve(data, queryData, reqObj, res);
        }
    });

    return deferred.promise;
};





//To update the isprocessed 'N' to 'Y' value from ddo_scheduleinterview table
jobinterviewfeedbackmodel.updateIsProcessed = function(data, queryData, reqObj, res) {
    var deferred = Q.defer();

    var updateQuery = "UPDATE ddo_scheduleinterview SET isdone='Y' WHERE ddo_scheduleinterview_id=$1";

    db.selectQuery(updateQuery, [queryData.queryobj['ddo_scheduleinterview_id']], queryData.queryobj['client'], function(err, data) {
        if(err) {

            deferred.reject(err);
        } else {
            deferred.resolve(data);
        }
    });

    return deferred.promise;
};




module.exports = jobinterviewfeedbackmodel;