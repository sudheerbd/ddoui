var express = require('express');
var router = express.Router();

var jobinterviewratingservice = require("../../services/talentacquisition/JobInterviewRating.js");

/**
 * @swagger
 * /jobinterviewrating:
 *   post:
 *     tags:
 *       - JobInterviewRating
 *     summary: "Create a new Job interview rating"
 *     description: Creates a job interview rating
 *     consumes:
 *     - "application/x-www-form-urlencoded"
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         description: Name for jobinterviewrating
 *         in: formData
 *         type: "string"
 *       - name: description
 *         description: Description of jobinterviewrating
 *         in: formData
 *         type: "string"
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.post("", function(req, res) {  
    jobinterviewratingservice.insertJobInterviewRating(req, res);
});

/**
 * @swagger
 * /jobinterviewrating:
 *   get:
 *     tags:
 *       - JobInterviewRating
 *     summary: Get all job interview ratings
 *     description: Returns all jobinterviewrating
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of jobinterviewrating
 */
router.get("", function(req, res) {
    jobinterviewratingservice.getJobInterviewRating(req, res);
});

/**
 * @swagger
 * /jobinterviewrating:
 *   put:
 *     tags: 
 *       - JobInterviewRating
 *     summary: Update Job interview rating
 *     description: Updating jobinterviewrating by ddo_jobinterviewrating_id field
 *     consumes:
 *     - "application/x-www-form-urlencoded"
 *     produces: application/json
 *     parameters:
 *       - name: ddo_jobinterviewrating_id
 *         description: jobinterviewrating id
 *         in: formData
 *         required: true
 *         type: integer
 *       - name: name
 *         description: Name for jobinterviewrating
 *         in: formData
 *         type: "string"
 *       - name: description
 *         description: Description of jobinterviewrating
 *         in: formData
 *         type: "string"
 *     responses:
 *       200:
 *         description: Successfully updated
 */
router.put("", function(req, res) {
    jobinterviewratingservice.updateJobInterviewRating(req, res);
});

/**
 * @swagger
 * /jobinterviewrating:
 *   delete:
 *     tags:
 *       - JobInterviewRating
 *     summary: Delete Job interview rating
 *     description: Delete a single jobinterviewrating by ddo_jobinterviewrating_id field
 *     consumes:
 *     - "application/x-www-form-urlencoded"
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: ddo_jobinterviewrating_id
 *         description: jobinterviewrating id
 *         in: formData
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
router.delete("", function(req, res) {
    jobinterviewratingservice.deleteJobInterviewRating(req, res);
});

module.exports = router;