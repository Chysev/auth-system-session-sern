import { Request, Response } from "../types/express-types";

import asyncHandler from "./asyncHandler";
import SessionService from "../services/ApiServices/Session.service";
import UserListService from "../services/ApiServices/UserList.service";
import AdminSessionService from "../services/ApiServices/AdminSession.service";
import DeleteAccountService from "../services/ApiServices/DeleteAccount.service";
import EditAccountEmailService from "../services/ApiServices/EditAccountEmail.service";

const apiController = {
  Session: asyncHandler(async (req: Request, res: Response) => {
    await SessionService(req, res);
  }),

  AdminSession: asyncHandler(async (req: Request, res: Response) => {
    await AdminSessionService(req, res);
  }),

  UserList: asyncHandler(async (req: Request, res: Response) => {
    const account = await UserListService();
    if (account) {
      res.status(200).json(account);
    } else {
      res.status(404).send({ error: "Account Not Found" });
    }
  }),

  DeleteAccount: asyncHandler(async (req: Request, res: Response) => {
    await DeleteAccountService(req, res);
    res.status(200).send("Account Deleted Successfully");
  }),

  EditAccountEmail: asyncHandler(async (req: Request, res: Response) => {
    await EditAccountEmailService(req, res);
    res.status(200).send("Account Email Updated Successfully");
  }),
};

export default apiController;
