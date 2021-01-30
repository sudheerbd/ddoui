
var express = require('express');
var router = express.Router();

var jobapplicationservice = require("../../services/talentacquisition/JobApplication.js");

/**
 * @swagger
 * /jobapplication/{id}:
 *   get:
 *     tags:
 *       - JobApplication
 *     summary: Get job application
 *     description: Returns particular job application by jobopenings id
 *     produces:
 *       - application/json
 *     parameters:
 *     - name: "ddo_jobopenings_id"
 *       in: "path"
 *       description: "The application that needs to be fetched. "
 *       required: true
 *       type: "string"
 *     responses:
 *       200:
 *         description: "An array of jobtype"
 */
router.get("/:id", function(req, res) {
    jobapplicationservice.getJobApplication(req, res);
});

module.exports = router;