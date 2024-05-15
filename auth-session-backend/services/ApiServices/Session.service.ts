import { Request, Response } from "../../types/express-types";

const SessionService = async (req: Request, res: Response): Promise<void> => {
  if (req.user) {
    res.status(200).json(req.user);
  } else {
    res.status(404).json({ message: "Account Not Found" });
  }
};

export default SessionService;
