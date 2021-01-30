var express = require('express');
var router = express.Router();

var jobopeningsservice = require("../../services/talentacquisition/JobOpenings.js");

/**
 * @swagger
 * /jobopenings:
 *   post:
 *     tags:
 *       - JobOpenings
 *     summary: "Create a new Job opening"
 *     description: Creates a Job opening
 *     consumes:
 *     - "application/x-www-form-urlencoded"
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: jobcode
 *         description: First name of an applicant
 *         in: formData
 *         type: "string"
 *         required: true
 *       - name: name
 *         description: Middle name of an applicant
 *         in: formData
 *         type: "string"
 *       - name: totalexperience
 *         description: Last name of an applicant
 *         in: formData
 *         type: "string"
 *         required: true
 *       - name: openpositions
 *         description: Father name of an applicant
 *         in: formData
 *         type: "string"
 *         required: true
 *       - name: responsibilities
 *         description: Skill type of an applicant
 *         in: formData
 *         type: "string"
 *         required: true
 *       - name: primaryskills
 *         description: Email of an applicant
 *         in: formData
 *         type: "string"
 *         required: true
 *       - name: secondaryskills
 *         description: Mobile number of an applicant
 *         in: formData
 *         type: "string"
 *       - name: validfrom
 *         description: Address of an applicant
 *         in: formData
 *         type: "string"
 *         required: true
 *       - name: validto
 *         description: Current employment status of an applicant
 *         in: formData
 *         type: "string"
 *       - name: isbillable
 *         description: Previous company of an applicant
 *         in: formData
 *         type: "string"
 *       - name: jobstatus
 *         description: Current location of an applicant
 *         in: formData
 *         type: "string"
 *       - name: ddo_department_id
 *         description: Job source id
 *         in: formData
 *         type: integer
 *       - name: ddo_joblocation_id
 *         description: Job source value
 *         in: formData
 *         type: integer
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
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.post("", function(req, res) {  
    jobopeningsservice.insertJobOpenings(req, res);
});

/**
 * @swagger
 * /jobopenings:
 *   get:
 *     tags:
 *       - JobOpenings
 *     summary: Get all Job openings
 *     description: Returns all jobopenings
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of jobopenings
 */
router.get("", function(req, res) {
    jobopeningsservice.getJobOpenings(req, res);
});

/**
 * @swagger
 * /jobopenings:
 *   put:
 *     tags:
 *       - JobOpenings
 *     summary: "Update a Job opening"
 *     description: Update a Job opening by job opening id
 *     consumes:
 *     - "application/x-www-form-urlencoded"
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: ddo_jobopenings_id
 *         description: Required Job opening id for update data
 *         in: formData
 *         type: integer
 *         required: true
 *       - name: jobcode
 *         description: First name of an applicant
 *         in: formData
 *         type: "string"
 *         required: true
 *       - name: name
 *         description: Middle name of an applicant
 *         in: formData
 *         type: "string"
 *       - name: totalexperience
 *         description: Last name of an applicant
 *         in: formData
 *         type: "string"
 *         required: true
 *       - name: openpositions
 *         description: Father name of an applicant
 *         in: formData
 *         type: "string"
 *         required: true
 *       - name: responsibilities
 *         description: Skill type of an applicant
 *         in: formData
 *         type: "string"
 *         required: true
 *       - name: primaryskills
 *         description: Email of an applicant
 *         in: formData
 *         type: "string"
 *         required: true
 *       - name: secondaryskills
 *         description: Mobile number of an applicant
 *         in: formData
 *         type: "string"
 *       - name: validfrom
 *         description: Address of an applicant
 *         in: formData
 *         type: "string"
 *         required: true
 *       - name: validto
 *         description: Current employment status of an applicant
 *         in: formData
 *         type: "string"
 *       - name: isbillable
 *         description: Previous company of an applicant
 *         in: formData
 *         type: "string"
 *       - name: jobstatus
 *         description: Current location of an applicant
 *         in: formData
 *         type: "string"
 *       - name: ddo_department_id
 *         description: Job source id
 *         in: formData
 *         type: integer
 *       - name: ddo_joblocation_id
 *         description: Job source value
 *         in: formData
 *         type: integer
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
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.put("", function(req, res) {
    jobopeningsservice.updateJobOpenings(req, res);
});

/**
 * @swagger
 * /obopenings:
 *   delete:
 *     tags:
 *       - JobOpenings
 *     summary: Delete job opning
 *     description: Delete a single jobopening by ddo_jobopenings_id field
 *     consumes:
 *     - "application/x-www-form-urlencoded"
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: ddo_jobopenings_id
 *         description: jobopenings id
 *         in: formData
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
router.delete("", function(req, res) {
    jobopeningsservice.deleteJobOpenings(req, res);
});

module.exports = router;