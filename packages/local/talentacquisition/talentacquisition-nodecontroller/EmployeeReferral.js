var express = require('express');
var router = express.Router();

var employeereferralservice = require("../../services/talentacquisition/EmployeeReferral.js");

/**
 * @swagger
 * /employeereferral:
 *   post:
 *     tags:
 *       - EmployeeReferral
 *     summary: "Create a new employee referral"
 *     description: Creates a new employeereferral
 *     consumes:
 *     - "application/x-www-form-urlencoded"
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         description: Name for employeereferral
 *         in: formData
 *         type: "string"
 *       - name: description
 *         description: Description of employeereferral
 *         in: formData
 *         type: "string"
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.post("", function(req, res) {  
    employeereferralservice.insertEmployeeReferral(req, res);
});

/**
 * @swagger
 * /employeereferral:
 *   get:
 *     tags:
 *       - EmployeeReferral
 *     summary: Get all employee referral list
 *     description: Returns all employee referral
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of employee referral
 */
router.get("", function(req, res) {
    employeereferralservice.getEmployeeReferral(req, res);
});

/**
 * @swagger
 * /employeereferral:
 *   put:
 *     tags: 
 *       - EmployeeReferral
 *     summary: Update employee referral
 *     description: Updating EmployeeReferral by ddo_employeereferral_id field
 *     consumes:
 *     - "application/x-www-form-urlencoded"
 *     produces: application/json
 *     parameters:
 *       - name: ddo_employeereferral_id
 *         description: EmployeeReferral id
 *         in: formData
 *         required: true
 *         type: integer
 *       - name: name
 *         description: Name for employeereferral
 *         in: formData
 *         type: "string"
 *       - name: description
 *         description: Description of employeereferral
 *         in: formData
 *         type: "string"
 *     responses:
 *       200:
 *         description: Successfully updated
 */
router.put("", function(req, res) {
    employeereferralservice.updateEmployeeReferral(req, res);
});

/**
 * @swagger
 * /employeereferral:
 *   delete:
 *     tags:
 *       - EmployeeReferral
 *     summary: Delete employee referral
 *     description: Delete a single EmployeeReferral by ddo_employeereferral_id field
 *     consumes:
 *     - "application/x-www-form-urlencoded"
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: ddo_employeereferral_id
 *         description: EmployeeReferral id
 *         in: formData
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
router.delete("", function(req, res) {
    employeereferralservice.deleteEmployeeReferral(req, res);
});

module.exports = router;