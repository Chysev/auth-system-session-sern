import { Router } from "express";

import upload from "../lib/multer";
import authController from "../controllers/authController";
import isAuthenticated from "../middleware/isAuthenticated";

const router: Router = Router();

/**
 * Register user.
 * @route POST /register
 * @group Authentication - Operations for user authentication
 * @param {string} email.formData.required - Email of the user
 * @param {string} name.formData.required - Name of the user
 * @param {string} password.formData.required - Password of the user
 * @param {file} avatarUrl.formData - Avatar image of the user
 * @returns {object} 200 - Account created
 */
router.post("/register", upload.single("avatarUrl"), authController.Register);

/**
 * User login.
 * @route POST /login
 * @group Authentication - Operations for user authentication
 * @param {string} email.formData.required - Email of the user
 * @param {string} password.formData.required - Password of the user
 * @returns {object} 200 - Account authenticated
 */
router.post("/login", authController.Login);

/**
 * User logout.
 * @route GET /logout
 * @group Authentication - Operations for user authentication
 * @returns {object} 200 - Successfully logged out
 * @security isAuthenticated
 */
router.get("/logout", isAuthenticated, authController.Logout);

export default router;
