const express = require("express");
const router = express.Router();
const problemController = require("../Controllers/problemChecklistController");

/**
 * @swagger
 * tags:
 *   name: Checklist problems
 *   description: API for managing checklist problems
 */

/**
 * @swagger
 * definitions:
 *   ChecklistProblem:
 *     type: object
 *     properties:
 *       id:
 *         type: string
 *       name:
 *         type: string
 *       problem:
 *         type: string
 *   Error:
 *     type: object
 *     properties:
 *       message:
 *         type: string
 */

/**
 * @swagger
 * /api/checklist-problems/create:
 *   post:
 *     tags:
 *       - Checklist problems
 *     summary: Create a new checklist problem
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Checklist problem object that needs to be added
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             problem:
 *               type: string
 *     responses:
 *       201:
 *         description: Checklist Added Successfully.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *             checklistProblem:
 *               $ref: "#/definitions/ChecklistProblem"
 *       500:
 *         description: An error occurred while creating the checklist problem
 *         schema:
 *           $ref: "#/definitions/Error"
 */
router.post("/create", problemController.createChecklistProblem);

/**
 * @swagger
 * /api/checklist-problems/getbyid:
 *   get:
 *     tags:
 *       - Checklist problems
 *     summary: Get a checklist problem by ID
 *     parameters:
 *       - name: checklistTypeId
 *         in: query
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Checklist problem found
 *         schema:
 *           $ref: "#/definitions/ChecklistProblem"
 *       402:
 *         description: Checklist problem not found
 *         schema:
 *           $ref: "#/definitions/Error"
 *       500:
 *         description: An error occurred while fetching the checklist problem
 *         schema:
 *           $ref: "#/definitions/Error"
 */
router.get("/getbyid", problemController.getChecklistProblemById);

/**
 * @swagger
 * /api/checklist-problems/get:
 *   get:
 *     tags:
 *       - Checklist problems
 *     summary: Get all checklist problems
 *     responses:
 *       200:
 *         description: Successfully retrieved checklist problems
 *         schema:
 *           type: array
 *           items:
 *             $ref: "#/definitions/ChecklistProblem"
 *       500:
 *         description: An error occurred while fetching checklist problems
 *         schema:
 *           $ref: "#/definitions/Error"
 */
router.get("/get", problemController.getAllChecklistProblem);

module.exports = router;
