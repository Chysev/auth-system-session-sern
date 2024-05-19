import { Router } from "express";

import isAdmin from "../middleware/isAdmin";
import apiController from "../controllers/apiController";
import isAuthenticated from "../middleware/isAuthenticated";

const router: Router = Router();

/**
 * Retrieve session data.
 * @route GET /session
 * @group Session - Operations about session
 * @produces application/json
 * @returns {SessionResponse} 200 - Session data
 * @security isAuthenticated
 */
router.get("/session", isAuthenticated, apiController.Session);

/**
 * Retrieve admin session data.
 * @route GET /admin-session
 * @group Admin - Operations about admin session
 * @produces application/json
 * @returns {SessionResponse} 200 - Admin session data
 * @security isAdmin
 */
router.get("/admin-session", isAdmin, apiController.AdminSession);

/**
 * Retrieve list of users.
 * @route GET /user-list
 * @group User - Operations about user
 * @produces application/json
 * @returns {UserListResponse} 200 - List of users
 */
router.get("/user-list", isAuthenticated, apiController.UserList);

/**
 * Delete user account.
 * @route DELETE /delete-account
 * @group Account - Operations about user account
 * @param {DeleteAccountBody.model} request.body.required - The user ID to delete
 * @produces application/json
 * @returns {object} 200 - Success message
 * @security isAuthenticated
 */
router.delete("/delete-account", isAuthenticated, apiController.DeleteAccount);

/**
 * Edit user account email.
 * @route PUT /edit-account-email
 * @group Account - Operations about user account
 * @param {EditAccountEmailBody.model} request.body.required - The user ID and new email
 * @produces application/json
 * @returns {object} 200 - Success message
 * @security isAuthenticated
 */
router.put(
  "/edit-account-email",
  isAuthenticated,
  apiController.EditAccountEmail
);

export default router;
