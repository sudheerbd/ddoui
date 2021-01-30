var express = require('express');
var router = express.Router();

var joblocationservice = require("../../services/talentacquisition/JobLocation.js");

/**
 * @swagger
 * /joblocation:
 *   post:
 *     tags:
 *       - JobLocation
 *     summary: "Create new job location"
 *     description: Creates a job location
 *     consumes:
 *     - "application/x-www-form-urlencoded"
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         description: Name for joblocation
 *         in: formData
 *         type: "string"
 *       - name: description
 *         description: Description of joblocation
 *         in: formData
 *         type: "string"
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.post("", function(req, res) {  
    joblocationservice.insertJobLocation(req, res);
});

/**
 * @swagger
 * /joblocation:
 *   get:
 *     tags:
 *       - JobLocation
 *     summary: Get all job locations
 *     description: Returns all JobLocations
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of joblocation
 */
router.get("", function(req, res) {
    joblocationservice.getJobLocation(req, res);
});

/**
 * @swagger
 * /joblocation:
 *   put:
 *     tags: 
 *       - JobLocation
 *     summary: Update job location
 *     description: Updating JobLocation by ddo_joblocation_id field
 *     consumes:
 *     - "application/x-www-form-urlencoded"
 *     produces: application/json
 *     parameters:
 *       - name: ddo_joblocation_id
 *         description: JobLocation id
 *         in: formData
 *         required: true
 *         type: integer
 *       - name: name
 *         description: Name for joblocation
 *         in: formData
 *         type: "string"
 *       - name: description
 *         description: Description of joblocation
 *         in: formData
 *         type: "string"
 *     responses:
 *       200:
 *         description: Successfully updated
 */
router.put("", function(req, res) {
    joblocationservice.updateJobLocation(req, res);
});

/**
 * @swagger
 * /joblocation:
 *   delete:
 *     tags:
 *       - JobLocation
 *     summary: Delete joblocation
 *     description: Delete a single JobLocation by ddo_joblocation_id field
 *     consumes:
 *     - "application/x-www-form-urlencoded"
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: ddo_joblocation_id
 *         description: JobLocation id
 *         in: formData
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
router.delete("", function(req, res) {
    joblocationservice.deleteJobLocation(req, res);
});

module.exports = router;