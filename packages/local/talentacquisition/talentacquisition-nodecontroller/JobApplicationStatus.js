var express = require('express');
var router = express.Router();

var jobapplicationstatusservice = require("../../services/talentacquisition/JobApplicationStatus.js");

/**
 * @swagger
 * /jobapplicationstatus:
 *   post:
 *     tags:
 *       - JobApplicationStatus
 *     summary: "Create a new Job interview rating"
 *     description: Creates a new puppy
 *     consumes:
 *     - "application/x-www-form-urlencoded"
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         description: Name for job application status
 *         in: formData
 *         type: "string"
 *       - name: description
 *         description: Description of job application status
 *         in: formData
 *         type: "string"
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.post("", function(req, res) {  
    jobapplicationstatusservice.insertJobApplicationStatus(req, res);
});

/**
 * @swagger
 * /jobapplicationstatus:
 *   get:
 *     tags:
 *       - JobApplicationStatus
 *     summary: Get all job application status list
 *     description: Returns all job application status
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of job application status
 */
router.get("", function(req, res) {
    jobapplicationstatusservice.getJobApplicationStatus(req, res);
});

/**
 * @swagger
 * /jobapplicationstatus:
 *   put:
 *     tags: 
 *       - JobApplicationStatus
 *     summary: Update Job interview rating
 *     description: Updating JobApplicationStatus by ddo_jobapplicationstatus_id field
 *     consumes:
 *     - "application/x-www-form-urlencoded"
 *     produces: application/json
 *     parameters:
 *       - name: ddo_jobapplicationstatus_id
 *         description: Job application status id
 *         in: formData
 *         required: true
 *         type: integer
 *       - name: name
 *         description: Name for job application status
 *         in: formData
 *         type: "string"
 *       - name: description
 *         description: Description of jobapplicationstatus
 *         in: formData
 *         type: "string"
 *     responses:
 *       200:
 *         description: Successfully updated
 */
router.put("", function(req, res) {
    jobapplicationstatusservice.updateJobApplicationStatus(req, res);
});

/**
 * @swagger
 * /jobapplicationstatus:
 *   delete:
 *     tags:
 *       - JobApplicationStatus
 *     summary: Delete Job interview rating
 *     description: Delete a single JobApplicationStatus by ddo_jobapplicationstatus_id field
 *     consumes:
 *     - "application/x-www-form-urlencoded"
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: ddo_jobapplicationstatus_id
 *         description: Job application status id
 *         in: formData
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
router.delete("", function(req, res) {
    jobapplicationstatusservice.deleteJobApplicationStatus(req, res);
});

module.exports = router;