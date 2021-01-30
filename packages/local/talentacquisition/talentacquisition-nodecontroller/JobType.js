var express = require('express');
var router = express.Router();

var jobtypeservice = require("../../services/talentacquisition/JobType.js");

/**
 * @swagger
 * /jobtype:
 *   get:
 *     tags:
 *       - JobType
 *     summary: Get all job types
 *     description: Returns all jobtype
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of jobtype
 */
router.get("", function(req, res) {
    
    jobtypeservice.getJobType(req, res);
});

/**
 * @swagger
 * /jobtype:
 *   post:
 *     tags:
 *       - JobType
 *     summary: "Create a new job type"
 *     description: Creates a job type
 *     consumes:
 *     - "application/x-www-form-urlencoded"
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         description: Name for job type
 *         in: formData
 *         type: "string"
 *       - name: description
 *         description: Description of job type
 *         in: formData
 *         type: "string"
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.post("", function(req, res) { 

    jobtypeservice.insertJobType(req, res);
});

/**
 * @swagger
 * /jobtype:
 *   put:
 *     tags: 
 *       - JobType
 *     summary: Update job type
 *     description: Updating jobtype by ddo_jobtype_id field
 *     consumes:
 *     - "application/x-www-form-urlencoded"
 *     produces: application/json
 *     parameters:
 *       - name: ddo_jobtype_id
 *         description: Jobtype id
 *         in: formData
 *         required: true
 *         type: integer
 *       - name: name
 *         description: Name for job type
 *         in: formData
 *         type: "string"
 *       - name: description
 *         description: Description of job type
 *         in: formData
 *         type: "string"
 *     responses:
 *       200:
 *         description: Successfully updated
 */
router.put("", function(req, res) {

    jobtypeservice.updateJobType(req, res);
});

/**
 * @swagger
 * /jobtype:
 *   delete:
 *     tags:
 *       - JobType
 *     summary: Delete job type
 *     description: Delete a single jobtype by ddo_jobtype_id field
 *     consumes:
 *     - "application/x-www-form-urlencoded"
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: ddo_jobtype_id
 *         description: Jobtype id
 *         in: formData
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
router.delete("", function(req, res) {

    jobtypeservice.deleteJobType(req, res);
});

module.exports = router;