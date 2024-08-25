const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userControllers");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API for managing users
 */

/**
 * @swagger
 * /signup:
 *   post:
 *     tags:
 *       - Users
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *       400:
 *         description: Error occurred while registering the user
 */
router.post("/signup", userController.SignUpUser);

/**
 * @swagger
 * /signin:
 *   post:
 *     tags:
 *       - Users
 *     summary: Authenticate a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     role:
 *                       type: string
 *                     token:
 *                       type: string
 *       401:
 *         description: Unauthorized, invalid password or user is not verified
 *       404:
 *         description: User not found
 *       400:
 *         description: Error occurred while logging in
 */
router.post("/signin", userController.SignInUser);

/**
 * @swagger
 * /verify:
 *   get:
 *     tags:
 *       - Users
 *     summary: Verify a user's account
 *     parameters:
 *       - name: id
 *         in: query
 *         required: true
 *         description: The ID of the user to be verified
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       300:
 *         description: No documents were updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Error occurred while verifying the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
//  *     deprecated: true
 */
router.get("/verify", userController.verifyNow);

/**
 * @swagger
 * /forgot-password:
 *   post:
 *     tags:
 *       - Users
 *     summary: Send a password reset email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Reset password email sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: User not found
 *       400:
 *         description: Error occurred while sending the reset email
 */
router.post("/forgot-password", userController.ForgotPassword);

/**
 * @swagger
 * /reset-password/{resetToken}:
 *   post:
 *     tags:
 *       - Users
 *     summary: Reset user password using reset token
 *     parameters:
 *       - name: resetToken
 *         in: path
 *         required: true
 *         description: The token sent to the user for resetting the password
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Invalid or expired token
 *       404:
 *         description: User not found
 *       400:
 *         description: Error occurred while resetting the password
 */
router.post("/reset-password/:resetToken", userController.ResetPassword);

module.exports = router;
