var express = require('express');
var router = express.Router();

var jobeducationservice = require("../../services/talentacquisition/JobEducation.js");

/**
 * @swagger
 * /jobeducation:
 *   post:
 *     tags:
 *       - JobEducation
 *     summary: "Create a new jobeducation"
 *     description: Creates a job education
 *     consumes:
 *     - "application/x-www-form-urlencoded"
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         description: Name for jobeducation
 *         in: formData
 *         type: "string"
 *       - name: description
 *         description: Description of jobeducation
 *         in: formData
 *         type: "string"
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.post("", function(req, res) {  
    jobeducationservice.insertJobEducation(req, res);
});

/**
 * @swagger
 * /jobeducation:
 *   get:
 *     tags:
 *       - JobEducation
 *     summary: Get all job educations
 *     description: Returns all jobeducation
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of jobeducation
 */
router.get("", function(req, res) {
    jobeducationservice.getJobEducation(req, res);
});

/**
 * @swagger
 * /jobeducation:
 *   put:
 *     tags: 
 *       - JobEducation
 *     summary: Update jobeducation
 *     description: Updating JobEducation by ddo_jobeducation_id field
 *     consumes:
 *     - "application/x-www-form-urlencoded"
 *     produces: application/json
 *     parameters:
 *       - name: ddo_jobeducation_id
 *         description: JobEducation id
 *         in: formData
 *         required: true
 *         type: integer
 *       - name: name
 *         description: Name for jobeducation
 *         in: formData
 *         type: "string"
 *       - name: description
 *         description: Description of jobeducation
 *         in: formData
 *         type: "string"
 *     responses:
 *       200:
 *         description: Successfully updated
 */
router.put("", function(req, res) {
    jobeducationservice.updateJobEducation(req, res);
});

/**
 * @swagger
 * /jobeducation:
 *   delete:
 *     tags:
 *       - JobEducation
 *     summary: Delete jobeducation
 *     description: Delete a single JobEducation by ddo_jobeducation_id field
 *     consumes:
 *     - "application/x-www-form-urlencoded"
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: ddo_jobeducation_id
 *         description: JobEducation id
 *         in: formData
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
router.delete("", function(req, res) {
    jobeducationservice.deleteJobEducation(req, res);
});

module.exports = router;