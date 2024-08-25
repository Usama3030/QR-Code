const express = require("express");
const router = express.Router();
const locationController = require("../Controllers/locationChecklistController");

/**
 * @swagger
 * tags:
 *   name: Checklist Locations
 *   description: API for managing checklist locations
 */

/**
 * @swagger
 * definitions:
 *   ChecklistLocation:
 *     type: object
 *     properties:
 *       id:
 *         type: string
 *       name:
 *         type: string
 *       location:
 *         type: string
 *   Error:
 *     type: object
 *     properties:
 *       message:
 *         type: string
 */

/**
 * @swagger
 * /api/checklist-locations/create:
 *   post:
 *     tags:
 *       - Checklist Locations
 *     summary: Create a new checklist location
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Checklist location object that needs to be added
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             location:
 *               type: string
 *     responses:
 *       201:
 *         description: Checklist Added Successfully.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *             checklistLocation:
 *               $ref: "#/definitions/ChecklistLocation"
 *       500:
 *         description: An error occurred while creating the checklist location
 *         schema:
 *           $ref: "#/definitions/Error"
 */
router.post("/create", locationController.createChecklistLocation);

/**
 * @swagger
 * /api/checklist-locations/getbyid:
 *   get:
 *     tags:
 *       - Checklist Locations
 *     summary: Get a checklist location by ID
 *     parameters:
 *       - name: checklistTypeId
 *         in: query
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Checklist location found
 *         schema:
 *           $ref: "#/definitions/ChecklistLocation"
 *       402:
 *         description: Checklist Location not found
 *         schema:
 *           $ref: "#/definitions/Error"
 *       500:
 *         description: An error occurred while fetching the checklist location
 *         schema:
 *           $ref: "#/definitions/Error"
 */
router.get("/getbyid", locationController.getChecklistLocationById);

/**
 * @swagger
 * /api/checklist-locations/get:
 *   get:
 *     tags:
 *       - Checklist Locations
 *     summary: Get all checklist locations
 *     responses:
 *       200:
 *         description: Successfully retrieved checklist locations
 *         schema:
 *           type: array
 *           items:
 *             $ref: "#/definitions/ChecklistLocation"
 *       500:
 *         description: An error occurred while fetching checklist locations
 *         schema:
 *           $ref: "#/definitions/Error"
 */
router.get("/get", locationController.getAllChecklistLocation);

module.exports = router;
