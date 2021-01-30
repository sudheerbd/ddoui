var express = require('express');
var router = express.Router();

var jobinterviewstatusservice = require("../../services/talentacquisition/JobInterviewStatus.js");

/**
 * @swagger
 * /jobinterviewstatus:
 *   post:
 *     tags:
 *       - JobInterviewStatus
 *     summary: "Create a new Job interview status"
 *     description: Creates a job interview status
 *     consumes:
 *     - "application/x-www-form-urlencoded"
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         description: Name for jobinterviewstatus
 *         in: formData
 *         type: "string"
 *       - name: description
 *         description: Description of jobinterviewstatus
 *         in: formData
 *         type: "string"
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.post("", function(req, res) {  
    jobinterviewstatusservice.insertJobInterviewStatus(req, res);
});

/**
 * @swagger
 * /jobinterviewstatus:
 *   get:
 *     tags:
 *       - JobInterviewStatus
 *     summary: Get all job interview status list
 *     description: Returns all jobinterviewstatus
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of jobinterviewstatus
 */
router.get("", function(req, res) {
    jobinterviewstatusservice.getJobInterviewStatus(req, res);
});

/**
 * @swagger
 * /jobinterviewstatus:
 *   put:
 *     tags: 
 *       - JobInterviewStatus
 *     summary: Update Job interview status
 *     description: Updating jobinterviewstatus by ddo_jobinterviewstatus_id field
 *     consumes:
 *     - "application/x-www-form-urlencoded"
 *     produces: application/json
 *     parameters:
 *       - name: ddo_jobinterviewstatus_id
 *         description: jobinterviewstatus id
 *         in: formData
 *         required: true
 *         type: integer
 *       - name: name
 *         description: Name for jobinterviewstatus
 *         in: formData
 *         type: "string"
 *       - name: description
 *         description: Description of jobinterviewstatus
 *         in: formData
 *         type: "string"
 *     responses:
 *       200:
 *         description: Successfully updated
 */
router.put("", function(req, res) {
    jobinterviewstatusservice.updateJobInterviewStatus(req, res);
});

/**
 * @swagger
 * /jobinterviewstatus:
 *   delete:
 *     tags:
 *       - JobInterviewStatus
 *     summary: Delete Job interview status
 *     description: Delete a single jobinterviewstatus by ddo_jobinterviewstatus_id field
 *     consumes:
 *     - "application/x-www-form-urlencoded"
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: ddo_jobinterviewstatus_id
 *         description: jobinterviewstatus id
 *         in: formData
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
router.delete("", function(req, res) {
    jobinterviewstatusservice.deleteJobInterviewStatus(req, res);
});

module.exports = router;