var express = require('express');
var router = express.Router();

var jobapplicationsservice = require("../../services/talentacquisition/JobApplications.js");

/**
 * @swagger
 * /jobapplications:
 *   post:
 *     tags:
 *       - JobApplications
 *     summary: "Create a new Job application"
 *     description: Creates a Job applications
 *     consumes:
 *     - "application/x-www-form-urlencoded"
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: firstname
 *         description: First name of an applicant
 *         in: formData
 *         type: "string"
 *         required: true
 *       - name: middlename
 *         description: Middle name of an applicant
 *         in: formData
 *         type: "string"
 *       - name: lastname
 *         description: Last name of an applicant
 *         in: formData
 *         type: "string"
 *         required: true
 *       - name: fathersname
 *         description: Father name of an applicant
 *         in: formData
 *         type: "string"
 *         required: true
 *       - name: skilltype
 *         description: Skill type of an applicant
 *         in: formData
 *         type: "string"
 *         required: true
 *       - name: email
 *         description: Email of an applicant
 *         in: formData
 *         type: "string"
 *         required: true
 *       - name: mobilenumber
 *         description: Mobile number of an applicant
 *         in: formData
 *         type: "string"
 *         required: true
 *       - name: address
 *         description: Address of an applicant
 *         in: formData
 *         type: "string"
 *         required: true
 *       - name: currentemploymentstatus
 *         description: Current employment status of an applicant
 *         in: formData
 *         type: "string"
 *       - name: previouscompany
 *         description: Previous company of an applicant
 *         in: formData
 *         type: "string"
 *       - name: currentcity
 *         description: Current location of an applicant
 *         in: formData
 *         type: "string"
 *         required: true
 *       - name: totalexperience
 *         description: Total experience of an applicant
 *         in: formData
 *         type: integer
 *       - name: idproof
 *         description: ID proof of an applicant
 *         in: formData
 *         type: "string"
 *         required: true
 *       - name: curriculumvitae
 *         description: Curriculumvitae of an applicant
 *         in: formData
 *         type: "string"
 *         required: true
 *       - name: yearofpassing
 *         description: Year of passing of an applicant
 *         in: formData
 *         type: "timestamp with out timezone"
 *         required: true
 *       - name: noticeperiodindays
 *         description: Notice period in days of an applicant
 *         in: formData
 *         type: integer
 *       - name: availablefrom
 *         description: Available from date of an applicant
 *         in: formData
 *         type: "timestamp with out timezone"
 *       - name: appliedon
 *         description: Applied on date for job
 *         in: formData
 *         type: "timestamp with out timezone"
 *       - name: idproofnumber
 *         description: ID proof number of an applicant
 *         in: formData
 *         type: "string"
 *       - name: ddo_jobsource_id
 *         description: Job source id
 *         in: formData
 *         type: integer
 *       - name: jobsourcevalue
 *         description: Job source value
 *         in: formData
 *         type: integer
 *       - name: comments
 *         description: Comments of an applicant as text
 *         in: formData
 *         type: "text"
 *       - name: ddo_jobopenings_id
 *         description: Job openings id
 *         in: formData
 *         type: integer
 *         required: true
 *       - name: ddo_jobeducation_id
 *         description: Qualification of an applicant
 *         in: formData
 *         type: integer
 *         required: true
 *       - name: ddo_designation_id
 *         description: Designation of an applicant
 *         in: formData
 *         type: integer
 *         required: true
 *       - name: recruitedby
 *         description: Recruited by
 *         in: formData
 *         type: integer
 *         required: true
 *       - name: ddo_jobapplicationstatus_id
 *         description: Application status
 *         in: formData
 *         type: integer
 *         required: true
 *       - name: referredby
 *         description: Referred by
 *         in: formData
 *         type: integer
 *       - name: vendorname
 *         description: Vendor name
 *         in: formData
 *         type: integer
 *       - name: jobportalname
 *         description: Job portal name
 *         in: formData
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.post("", function(req, res) {  
    jobapplicationsservice.insertJobApplications(req, res);
});

/**
 * @swagger
 * /jobapplications:
 *   get:
 *     tags:
 *       - JobApplications
 *     summary: Get all job applications
 *     description: Returns all jobapplications
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of jobapplications
 */
router.get("", function(req, res) {
    jobapplicationsservice.getJobApplications(req, res);
});

/**
 * @swagger
 * /jobapplications:
 *   put:
 *     tags:
 *       - JobApplications
 *     summary: "Update a Job application"
 *     description: Update a particular job application by id
 *     consumes:
 *     - "application/x-www-form-urlencoded"
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: ddo_jobapplications_id
 *         description: Update a particular job application id
 *         in: formData
 *         type: integer 
 *         required: true
 *       - name: firstname
 *         description: First name of an applicant
 *         in: formData
 *         type: "string"
 *         required: true
 *       - name: middlename
 *         description: Middle name of an applicant
 *         in: formData
 *         type: "string"
 *       - name: lastname
 *         description: Last name of an applicant
 *         in: formData
 *         type: "string"
 *         required: true
 *       - name: fathersname
 *         description: Father name of an applicant
 *         in: formData
 *         type: "string"
 *         required: true
 *       - name: skilltype
 *         description: Skill type of an applicant
 *         in: formData
 *         type: "string"
 *         required: true
 *       - name: email
 *         description: Email of an applicant
 *         in: formData
 *         type: "string"
 *         required: true
 *       - name: mobilenumber
 *         description: Mobile number of an applicant
 *         in: formData
 *         type: "string"
 *         required: true
 *       - name: address
 *         description: Address of an applicant
 *         in: formData
 *         type: "string"
 *         required: true
 *       - name: currentemploymentstatus
 *         description: Current employment status of an applicant
 *         in: formData
 *         type: "string"
 *       - name: previouscompany
 *         description: Previous company of an applicant
 *         in: formData
 *         type: "string"
 *       - name: currentcity
 *         description: Current location of an applicant
 *         in: formData
 *         type: "string"
 *         required: true
 *       - name: totalexperience
 *         description: Total experience of an applicant
 *         in: formData
 *         type: integer
 *       - name: idproof
 *         description: ID proof of an applicant
 *         in: formData
 *         type: "string"
 *         required: true
 *       - name: curriculumvitae
 *         description: Curriculumvitae of an applicant
 *         in: formData
 *         type: "string"
 *         required: true
 *       - name: yearofpassing
 *         description: Year of passing of an applicant
 *         in: formData
 *         type: "timestamp with out timezone"
 *         required: true
 *       - name: noticeperiodindays
 *         description: Notice period in days of an applicant
 *         in: formData
 *         type: integer
 *       - name: availablefrom
 *         description: Available from date of an applicant
 *         in: formData
 *         type: "timestamp with out timezone"
 *       - name: appliedon
 *         description: Applied on date for job
 *         in: formData
 *         type: "timestamp with out timezone"
 *       - name: idproofnumber
 *         description: ID proof number of an applicant
 *         in: formData
 *         type: "string"
 *       - name: ddo_jobsource_id
 *         description: Job source id
 *         in: formData
 *         type: integer
 *       - name: jobsourcevalue
 *         description: Job source value
 *         in: formData
 *         type: integer
 *       - name: comments
 *         description: Comments of an applicant as text
 *         in: formData
 *         type: "text"
 *       - name: ddo_jobopenings_id
 *         description: Job openings id
 *         in: formData
 *         type: integer
 *         required: true
 *       - name: ddo_jobeducation_id
 *         description: Qualification of an applicant
 *         in: formData
 *         type: integer
 *         required: true
 *       - name: ddo_designation_id
 *         description: Designation of an applicant
 *         in: formData
 *         type: integer
 *         required: true
 *       - name: recruitedby
 *         description: Recruited by
 *         in: formData
 *         type: integer
 *         required: true
 *       - name: ddo_jobapplicationstatus_id
 *         description: Application status
 *         in: formData
 *         type: integer
 *         required: true
 *       - name: referredby
 *         description: Referred by
 *         in: formData
 *         type: integer
 *       - name: vendorname
 *         description: Vendor name
 *         in: formData
 *         type: integer
 *       - name: jobportalname
 *         description: Job portal name
 *         in: formData
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.put("", function(req, res) {
    jobapplicationsservice.updateJobApplications(req, res);
});

/**
 * @swagger
 * /jobapplications:
 *   delete:
 *     tags:
 *       - JobApplications
 *     summary: Delete job type
 *     description: Delete a single jobapplications by jobapplications field
 *     consumes:
 *     - "application/x-www-form-urlencoded"
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: ddo_jobapplications_id
 *         description: Job applications id
 *         in: formData
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
router.delete("", function(req, res) {
    jobapplicationsservice.deleteJobApplications(req, res);
});

module.exports = router;