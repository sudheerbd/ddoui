var express = require('express');
var router = express.Router();

var jobinterviewdetailsservice = require("../../services/talentacquisition/JobInterviewDetails.js");

/**
 * @swagger
 * /jobinterviewdetails:
 *   get:
 *     tags:
 *       - JobInterviewDetails
 *     summary: Get all job interview details
 *     description: Returns all jobinterview details
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of jobinterviewdetails
 */
router.get("/:id", function(req, res) {
    jobinterviewdetailsservice.getJobInterviewDetails(req, res);
});

module.exports = router;