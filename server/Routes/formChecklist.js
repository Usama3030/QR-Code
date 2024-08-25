const express = require("express");
const router = express.Router();
const formChecklistController = require("../Controllers/formChecklistController");

/**
 * @swagger
 * tags:
 *   name: Checklist Form
 *   description: API for managing checklist Form
 */

/**
 * @swagger
 * definitions:
 *   Form Checklist:
 *     type: object
 *     properties:
 *       id:
 *         type: string
 *       name:
 *         type: string
 *       formChecklist:
 *         type: string
 *   Error:
 *     type: object
 *     properties:
 *       message:
 *         type: string
 */

/**
 * @swagger
 * /api/checklist-Form/create:
 *   post:
 *     tags:
 *       - Checklist Form
 *     summary: Create a new checklist formChecklist
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Checklist formChecklist object that needs to be added
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             formChecklist:
 *               type: string
 *     responses:
 *       201:
 *         description: Checklist Added Successfully.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *             checklistformChecklist:
 *               $ref: "#/definitions/ChecklistformChecklist"
 *       500:
 *         description: An error occurred while creating the checklist formChecklist
 *         schema:
 *           $ref: "#/definitions/Error"
 */
router.post("/create", formChecklistController.createChecklistformChecklist);

/**
 * @swagger
 * /api/checklist-Form/getbyid:
 *   get:
 *     tags:
 *       - Checklist Form
 *     summary: Get a checklist formChecklist by ID
 *     parameters:
 *       - name: checklistTypeId
 *         in: query
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Checklist formChecklist found
 *         schema:
 *           $ref: "#/definitions/ChecklistformChecklist"
 *       402:
 *         description: Checklist formChecklist not found
 *         schema:
 *           $ref: "#/definitions/Error"
 *       500:
 *         description: An error occurred while fetching the checklist formChecklist
 *         schema:
 *           $ref: "#/definitions/Error"
 */
router.get("/getbyid", formChecklistController.getChecklistformChecklistById);

/**
 * @swagger
 * /api/checklist-Form/get:
 *   get:
 *     tags:
 *       - Checklist Form
 *     summary: Get all checklist Form
 *     responses:
 *       200:
 *         description: Successfully retrieved checklist Form
 *         schema:
 *           type: array
 *           items:
 *             $ref: "#/definitions/ChecklistformChecklist"
 *       500:
 *         description: An error occurred while fetching checklist Form
 *         schema:
 *           $ref: "#/definitions/Error"
 */
router.get("/get", formChecklistController.getAllChecklistformChecklist);

module.exports = router;
