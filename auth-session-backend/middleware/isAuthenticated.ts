import { Request, Response, NextFunction } from "../types/express-types";

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated() && req.user) {
    return next();
  } else {
    return res.status(401).send({ message: "Not Authenticated" });
  }
};

export default isAuthenticated;
