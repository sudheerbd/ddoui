var express = require('express');
var router = express.Router();

var scheduleinterviewservice = require("../../services/talentacquisition/ScheduleInterview.js");

/**
 * @swagger
 * /scheduleinterview:
 *   post:
 *     tags:
 *       - ScheduleInterview
 *     summary: "Create a new Schedule interview record"
 *     description: Creates a Schedule Interview
 *     consumes:
 *     - "application/x-www-form-urlencoded"
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: ddo_jobopenings_id
 *         description: Id of the Job openings
 *         in: formData
 *         type: integer
 *       - name: ddo_jobapplications_id
 *         description: Id of the Job application
 *         in: formData
 *         type: integer
 *       - name: ddo_designation_id
 *         description: Id for designation
 *         in: formData
 *         type: integer
 *       - name: intervieweremployeeid
 *         description: Input for who will take interview 
 *         in: formData
 *         type: integer
 *       - name: interviewtype
 *         description: Schedule interview type
 *         in: formData
 *         type: "string"
 *       - name: interviewdate
 *         description: Schedule interview date
 *         in: formData
 *         type: "string"
 *       - name: time
 *         description: Schedule time
 *         in: formData
 *         type: "string"
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.post("", function(req, res) {  
    scheduleinterviewservice.insertScheduleInterview(req, res);
});

/**
 * @swagger
 * /scheduleinterview/{id}:
 *   get:
 *     tags:
 *       - ScheduleInterview
 *     summary: Get a scheduled interview
 *     description: Returns particular scheduled interview by job application id
 *     produces:
 *       - application/json
 *     parameters:
 *     - name: "ddo_jobapplications_id"
 *       in: "path"
 *       description: "The application that needs to be fetched."
 *       required: true
 *       type: integer
 *     responses:
 *       200:
 *         description: "An array of jobtype"
 */
router.get("/:id", function(req, res) {
    scheduleinterviewservice.getScheduleInterview(req, res);
});

/**
 * @swagger
 * /scheduleinterview:
 *   get:
 *     tags:
 *       - ScheduleInterview
 *     summary: Get all scheduleinterview
 *     description: Returns all schedule interviews
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of scheduleinterviews
 */
router.get("", function(req, res) {
    scheduleinterviewservice.getScheduleInterviews(req, res);
});

/**
 * @swagger
 * /scheduleinterview:
 *   put:
 *     tags:
 *       - ScheduleInterview
 *     summary: "Create a new Schedule interview record"
 *     description: Creates a Schedule Interview
 *     consumes:
 *     - "application/x-www-form-urlencoded"
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: ddo_scheduleinterview_id
 *         description: Id for update schedule inerview
 *         in: formData
 *         type: integer
 *         required: true
 *       - name: ddo_jobopenings_id
 *         description: Id of the Job openings
 *         in: formData
 *         type: integer
 *       - name: ddo_jobapplications_id
 *         description: Id of the Job application
 *         in: formData
 *         type: integer
 *       - name: ddo_designation_id
 *         description: Id for designation
 *         in: formData
 *         type: integer
 *       - name: intervieweremployeeid
 *         description: Input for who will take interview 
 *         in: formData
 *         type: integer
 *       - name: interviewtype
 *         description: Schedule interview type
 *         in: formData
 *         type: "string"
 *       - name: interviewdate
 *         description: Schedule interview date
 *         in: formData
 *         type: "string"
 *       - name: time
 *         description: Schedule time
 *         in: formData
 *         type: "string"
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.put("", function(req, res) {
    scheduleinterviewservice.updateScheduleInterview(req, res);
});

/**
 * @swagger
 * /scheduleinterview:
 *   delete:
 *     tags:
 *       - ScheduleInterview
 *     summary: Delete job type
 *     description: Delete a single scheduleinterview by ddo_scheduleinterview_id field
 *     consumes:
 *     - "application/x-www-form-urlencoded"
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: ddo_scheduleinterview_id
 *         description: scheduleinterview id
 *         in: formData
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
router.delete("", function(req, res) {
    scheduleinterviewservice.deleteScheduleInterview(req, res);
});

module.exports = router;