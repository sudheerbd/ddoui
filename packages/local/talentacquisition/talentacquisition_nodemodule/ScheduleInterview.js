var scheduleinterviewmodel = {};

var tables = require("../../helpers/Tables.json");

var db = require("../../helpers/db/Postgres.js");

var DDO_SCHEDULEINTERVIEW_TABLE_NAME = tables["ddo_scheduleinterview"];

var master = require('./');

scheduleinterviewmodel.getScheduleInterview = function(session, req, res) {

	var outputFields = {
		ddo_scheduleinterview_id:"",
        interviewtype :"",
        interviewdate :"",
        time :"",
        isdone: "",
        intervieweremployeeid :"",
        ddo_designation_id :"",
        ddo_jobopenings_id :"",
        ddo_jobapplications_id :"",
        isconfirmed: ""
	};
  	var joinTables = [
        "ddo_designation",
        "ddo_jobopenings"
    ];
    //logged session details
    var userInfo = session.userDetails;

    var ddo_org_id = userInfo.ddo_org_id;
    var ddo_client_id = userInfo.ddo_client_id;

    reqObj = {
        table: DDO_SCHEDULEINTERVIEW_TABLE_NAME,
        ddo_org_id: userInfo.ddo_org_id,
        id:req.params.id,
        key:'ddo_jobapplications_id',
        ddo_client_id:userInfo.ddo_client_id
    }
    
    master.getOperationalDataByID(outputFields, joinTables, reqObj, res);
};

scheduleinterviewmodel.getScheduleInterviews = function(session, req, res) {

    var outputFields = {
        ddo_scheduleinterview_id:"",
        interviewtype :"",
        interviewdate :"",
        time :"",
        isdone: "",
        intervieweremployeeid :"",
        ddo_designation_id :"",
        ddo_jobopenings_id :"",
        ddo_jobapplications_id :"",
        curriculumvitae:"",
        isconfirmed: "",
        intervieweename: ""
    };
    var joinTables = [
        "ddo_designation",
        "ddo_jobopenings"
    ];
    //logged session details
    var userInfo = session.userDetails;

    var ddo_org_id = userInfo.ddo_org_id;
    var ddo_client_id = userInfo.ddo_client_id;

    reqObj = {
        table: DDO_SCHEDULEINTERVIEW_TABLE_NAME,
        ddo_org_id: userInfo.ddo_org_id,
        ddo_client_id:userInfo.ddo_client_id
    }
    var joins = ' ';

    var joinFields = ' ';

    for (var i = 0; i < joinTables.length; i++) {

        joinFields += joinTables[i]+".name as "+joinTables[i]+"_name, "

        joins += " left join " + joinTables[i] + " on " +
            reqObj.table+"."+joinTables[i]+"_id = "+ joinTables[i] +"."+joinTables[i]+"_id AND "+
            joinTables[i]+".isactive='Y' AND "+reqObj.table+".ddo_org_id = "+joinTables[i]+".ddo_org_id "
    }

    var selectFields = Object.keys(outputFields);

    var selectFieldsStr = ' ';
    
    for (var i = 0; i < selectFields.length; i++) {

        if(selectFields[i] == "curriculumvitae"){

            selectFieldsStr += " (SELECT curriculumvitae  FROM ddo_jobapplications WHERE "+reqObj.table+".ddo_jobapplications_id = ddo_jobapplications.ddo_jobapplications_id), "
        
        }else if(selectFields[i] == "intervieweename"){

            selectFieldsStr += " (SELECT CONCAT(ddo_jobapplications.firstname,' ',ddo_jobapplications.middlename,' ',ddo_jobapplications.lastname) as intervieweename  FROM ddo_jobapplications WHERE "+reqObj.table+".ddo_jobapplications_id = ddo_jobapplications.ddo_jobapplications_id), "
        
        }else{

            selectFieldsStr += reqObj.table +"."+selectFields[i]+", "
        }

        if(selectFields[i] == "recruitedby" || selectFields[i] == "referredby" || selectFields[i] == "intervieweremployeeid"){

            joinFields += "CONCAT("+selectFields[i]+"_employee.firstname,' ',"+selectFields[i]+"_employee.lastname) "+selectFields[i]+"_name, "
            joins += " left join ddo_employee "+selectFields[i]+"_employee on " +
                reqObj.table+"."+selectFields[i]+" = "+selectFields[i]+"_employee.ddo_employee_id AND " +
                selectFields[i]+"_employee.isactive='Y' AND "+reqObj.table+".ddo_org_id = "+selectFields[i]+"_employee.ddo_org_id "
        }
    }
    var unwantedStrIndex = joinFields.lastIndexOf(',');

    var finalJoinFields = joinFields.substr(" ", unwantedStrIndex)

    var condition = reqObj.table+".isactive = 'Y' AND "+reqObj.table+".DDO_Client_ID=$1 AND "+reqObj.table+".DDO_Org_ID=$2 ";

    var query = "SELECT "+ selectFieldsStr + finalJoinFields +" FROM " + reqObj.table +' '+ joins + " WHERE " + condition ;
    
    db.selectQuery(query, [reqObj.ddo_client_id, reqObj.ddo_org_id], function(err, data) {
        if (err) {

            return res.status(500).json({success: false, data: err, message: 'Failed to get records!'});
        } else {

            return res.json({success: true, totalCount: data.length, data: data});
        }
    });
    //master.getOperationalData(outputFields, joinTables, reqObj, res);
};

scheduleinterviewmodel.insertScheduleInterview = function(obj, session, req, res) {

    var userInfo = session.userDetails;

    var reqObj = {};

    reqObj = {
        table: DDO_SCHEDULEINTERVIEW_TABLE_NAME,
        ddo_org_id: userInfo.ddo_org_id,
        ddo_client_id:userInfo.ddo_client_id,
        ddo_employee_id:userInfo.ddo_employee_id
    }

   master.insertOperationalData(obj, reqObj, res);
    
};

scheduleinterviewmodel.updateScheduleInterview = function(obj, session, req, res) {

    var userInfo = session.userDetails;

    var reqObj = {};
    
    reqObj = {
        table: DDO_SCHEDULEINTERVIEW_TABLE_NAME,
        key:"ddo_scheduleinterview_id",
        id:obj.ddo_scheduleinterview_id,
        ddo_org_id: userInfo.ddo_org_id,
        ddo_client_id:userInfo.ddo_client_id,
        ddo_employee_id:userInfo.ddo_employee_id
    }

    master.updateOperationalData(obj, reqObj, res);

    
};

scheduleinterviewmodel.deleteScheduleInterview = function(obj, session, req, res) {

    //logged session details
    var userInfo = session.userDetails;

    var ddo_org_id = userInfo.ddo_org_id;
    var ddo_client_id = userInfo.ddo_client_id;

    reqObj = {
        table: DDO_SCHEDULEINTERVIEW_TABLE_NAME,
        id: obj.ddo_scheduleinterview_id,
        key:"ddo_scheduleinterview_id",
        ddo_org_id: userInfo.ddo_org_id,
        ddo_client_id:userInfo.ddo_client_id
    }
    
    master.deleteRecord(reqObj, res);
    
};

module.exports = scheduleinterviewmodel;