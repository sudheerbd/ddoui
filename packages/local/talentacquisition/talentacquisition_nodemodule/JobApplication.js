var jobapplicationmodel = {};

var tables = require("../../helpers/Tables.json");

var DDO_JOBAPPLICATIONS_TABLE_NAME = tables["ddo_jobapplications"];

var master = require('./');

jobapplicationmodel.getJobApplication = function(session, req, res) {

    var outputFields = {
      "ddo_jobapplications_id": 2,
      "firstname": "debdd",
      "middlename": "lops",
      "lastname": "singh",
      "fathersname": "test2",
      "yearofpassing": "2017-07-04T18:30:00.000Z",
      "skilltype": "test2",
      "mobilenumber": "test2",
      "email": "test2",
      "address": "test2",
      "currentcity": "test2",
      "currentemploymentstatus": "test2",
      "previouscompany": "test2",
      "totalexperience": "0.02",
      "idproof": "test2",
      "idproofnumber": "test2",
      "appliedon": "2017-07-19T18:30:00.000Z",
      "availablefrom": "2017-07-04T18:30:00.000Z",
      "noticeperiodindays": 23,
      "curriculumvitae": "lopsss",
      "ddo_jobsource_id": 4,
      "jobsourcevalue": 12,
      "comments": "test2",
      "ddo_jobopenings_id": 1,
      "ddo_jobeducation_id": 5,
      "ddo_designation_id": 401000,
      "recruitedby": 1000868,
      "ddo_jobapplicationstatus_id": 4,
      "ddo_client_id": 11,
      "ddo_org_id": 1000001,
      "isactive": "Y",
      "isreference": "N",
      "created": "2017-07-05T12:17:22.103Z",
      "createdby": 11,
      "updated": "2017-07-07T06:06:10.000Z",
      "updatedby": 1001121,
      "referredby": 1000868,
      "vendorname": 9,
      "jobportalname": 2
    }

    //logged session details
    var userInfo = session.userDetails;

    var ddo_org_id = userInfo.ddo_org_id;
    var ddo_client_id = userInfo.ddo_client_id;

    reqObj = {
        table: DDO_JOBAPPLICATIONS_TABLE_NAME,
        ddo_org_id: userInfo.ddo_org_id,
        id:req.params.id,
        key:'ddo_jobopenings_id',
        ddo_client_id:userInfo.ddo_client_id
    }
    var joinTables = [
        "ddo_designation",
        "ddo_jobopenings",
        "ddo_jobsource",
        "ddo_jobeducation",
        "ddo_jobapplicationstatus"
    ];

    master.getOperationalDataByID(outputFields, joinTables, reqObj, res);
};

module.exports = jobapplicationmodel;