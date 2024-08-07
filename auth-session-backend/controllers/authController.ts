import { Request, Response, NextFunction } from "../types/express-types";

import asyncHandler from "./asyncHandler";
import LoginService from "../services/AuthServices/Login.service";
import LogoutService from "../services/AuthServices/Logout.service";
import RegisterService from "../services/AuthServices/Register.service";

const authController = {
  Register: asyncHandler(async (req: Request, res: Response) => {
    await RegisterService(req, res);
  }),

  Login: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      LoginService(req, res, next);
    }
  ),

  Logout: asyncHandler(async (req: Request, res: Response) => {
    LogoutService(req, res);
  }),
};

export default authController;
