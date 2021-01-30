var express = require('express');
var router = express.Router();

var jobsourcelinesservice = require("../../services/talentacquisition/JobSourceLines.js");

/**
 * @swagger
 * /jobsourceline:
 *   post:
 *     tags:
 *       - JobSourceLines
 *     summary: "Create a new Job source line"
 *     description: Creates a job source line
 *     consumes:
 *     - "application/x-www-form-urlencoded"
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         description: Name for JobSourceLines
 *         in: formData
 *         type: "string"
 *       - name: description
 *         description: Description of JobSourceLines
 *         in: formData
 *         type: "string"
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.post("", function(req, res) {  
    jobsourcelinesservice.insertJobSourceLines(req, res);
});

/**
 * @swagger
 * /jobsourceline:
 *   get:
 *     tags:
 *       - JobSourceLines
 *     summary: Get all job source lines
 *     description: Returns all jobsourcelines
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of jobsourcelines
 */
router.get("", function(req, res) {
    jobsourcelinesservice.getJobSourceLines(req, res);
});

/**
 * @swagger
 * /jobsourceline:
 *   put:
 *     tags: 
 *       - JobSourceLines
 *     summary: Update job source line
 *     description: Updating jobsourceline by ddo_jobsourcelines_id field
 *     consumes:
 *     - "application/x-www-form-urlencoded"
 *     produces: application/json
 *     parameters:
 *       - name: ddo_jobsourcelines_id
 *         description: jobsourcelines id
 *         in: formData
 *         required: true
 *         type: integer
 *       - name: name
 *         description: Name for jobsourcelines
 *         in: formData
 *         type: "string"
 *       - name: description
 *         description: Description of jobsourcelines
 *         in: formData
 *         type: "string"
 *     responses:
 *       200:
 *         description: Successfully updated
 */
router.put("", function(req, res) {
    jobsourcelinesservice.updateJobSourceLines(req, res);
});

/**
 * @swagger
 * /jobsourceline:
 *   delete:
 *     tags:
 *       - JobSourceLines
 *     summary: Delete job source line
 *     description: Delete a single jobsourcelines by ddo_jobsourcelines_id field
 *     consumes:
 *     - "application/x-www-form-urlencoded"
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: ddo_jobsourcelines_id
 *         description: jobsourcelines id
 *         in: formData
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
router.delete("", function(req, res) {
    jobsourcelinesservice.deleteJobSourceLines(req, res);
});

module.exports = router;