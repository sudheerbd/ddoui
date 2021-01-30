var express = require('express');
var router = express.Router();

var jobsourceservice = require("../../services/talentacquisition/JobSource.js");

/**
 * @swagger
 * /jobsource:
 *   post:
 *     tags:
 *       - JobSource
 *     summary: "Create a new Job source"
 *     description: Creates a new job source
 *     consumes:
 *     - "application/x-www-form-urlencoded"
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         description: Name for JobSource
 *         in: formData
 *         type: "string"
 *       - name: description
 *         description: Description of JobSource
 *         in: formData
 *         type: "string"
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.post("", function(req, res) {  
    jobsourceservice.insertJobSource(req, res);
});

/**
 * @swagger
 * /jobsource:
 *   get:
 *     tags:
 *       - JobSource
 *     summary: Get all Job sources
 *     description: Returns all jobsource
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of jobsource
 */
router.get("", function(req, res) {
    jobsourceservice.getJobSource(req, res);
});

/**
 * @swagger
 * /jobsource:
 *   put:
 *     tags: 
 *       - JobSource
 *     summary: Update job source line
 *     description: Updating jobsourceline by ddo_jobsource_id field
 *     consumes:
 *     - "application/x-www-form-urlencoded"
 *     produces: application/json
 *     parameters:
 *       - name: ddo_jobsource_id
 *         description: jobsource id
 *         in: formData
 *         required: true
 *         type: integer
 *       - name: name
 *         description: Name for jobsource
 *         in: formData
 *         type: "string"
 *       - name: description
 *         description: Description of jobsource
 *         in: formData
 *         type: "string"
 *     responses:
 *       200:
 *         description: Successfully updated
 */
router.put("", function(req, res) {
    jobsourceservice.updateJobSource(req, res);
});

/**
 * @swagger
 * /jobsource:
 *   delete:
 *     tags:
 *       - JobSource
 *     summary: Delete job source line
 *     description: Delete a single jobsource by ddo_jobsource_id field
 *     consumes:
 *     - "application/x-www-form-urlencoded"
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: ddo_jobsource_id
 *         description: jobsource id
 *         in: formData
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
router.delete("", function(req, res) {
    jobsourceservice.deleteJobSource(req, res);
});

module.exports = router;