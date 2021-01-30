
var express = require('express');
var router = express.Router();

var jobinterviewfeedbackservice = require("../../services/talentacquisition/JobInterviewFeedback.js");

/**
 * @swagger
 * /jobinterviewfeedback:
 *   post:
 *     tags:
 *       - JobInterviewFeedback
 *     summary: "Create a new Job interview feedback"
 *     description: Creates a job interview feedback
 *     consumes:
 *     - "application/x-www-form-urlencoded"
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         description: Name for JobInterviewFeedback
 *         in: formData
 *         type: "string"
 *       - name: description
 *         description: Description of jobinterviewfeedback
 *         in: formData
 *         type: "string"
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.post("", function(req, res) {  
    jobinterviewfeedbackservice.insertJobInterviewFeedback(req, res);
});

/**
 * @swagger
 * /jobinterviewfeedback:
 *   get:
 *     tags:
 *       - JobInterviewFeedback
 *     summary: Get all job interview feedback list
 *     description: Returns all jobinterviewfeedback
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of jobinterviewfeedback
 */
router.get("", function(req, res) {
    jobinterviewfeedbackservice.getJobInterviewFeedback(req, res);
});

/**
 * @swagger
 * /jobinterviewfeedback:
 *   put:
 *     tags: 
 *       - JobInterviewFeedback
 *     summary: Update Job interview feedback
 *     description: Updating JobInterviewFeedback by ddo_jobinterviewfeedback_id field
 *     consumes:
 *     - "application/x-www-form-urlencoded"
 *     produces: application/json
 *     parameters:
 *       - name: ddo_jobinterviewfeedback_id
 *         description: JobInterviewFeedback id
 *         in: formData
 *         required: true
 *         type: integer
 *       - name: name
 *         description: Name for JobInterviewFeedback
 *         in: formData
 *         type: "string"
 *       - name: description
 *         description: Description of jobinterviewfeedback
 *         in: formData
 *         type: "string"
 *     responses:
 *       200:
 *         description: Successfully updated
 */
router.put("", function(req, res) {
    jobinterviewfeedbackservice.updateJobInterviewFeedback(req, res);
});

/**
 * @swagger
 * /jobinterviewfeedback:
 *   delete:
 *     tags:
 *       - JobInterviewFeedback
 *     summary: Delete Job interview feedback
 *     description: Delete a single JobInterviewFeedback by ddo_jobinterviewfeedback_id field
 *     consumes:
 *     - "application/x-www-form-urlencoded"
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: ddo_jobinterviewfeedback_id
 *         description: Job interview feedback id
 *         in: formData
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
router.delete("", function(req, res) {
    jobinterviewfeedbackservice.deleteJobInterviewFeedback(req, res);
});

module.exports = router;