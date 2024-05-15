import { Request, Response, NextFunction } from "../../types/express-types";

import passport from "../../lib/passport";

const LoginService = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  passport.authenticate("local", (error: Error, user: User, info: any) => {
    if (error) {
      console.log(error);
      return res.status(500).send("Internal Server Error");
    }

    if (!user) {
      return res.status(401).send({ message: info.message });
    }

    req.login(user, (error) => {
      if (error) {
        return res.status(500).send("Internal Server Error");
      }

      return res.status(200).send({ message: "Account Authenticated" });
    });
  })(req, res, next);
};

export default LoginService;
