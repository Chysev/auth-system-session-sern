import { Request, Response, NextFunction } from "../types/express-types";

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (
    req.isAuthenticated() &&
    req.user &&
    (req.user as { role: string }).role === "Admin"
  ) {
    return next();
  } else {
    return res.status(401).send({ message: "Not Authenticated and Not Admin" });
  }
};

export default isAdmin;
