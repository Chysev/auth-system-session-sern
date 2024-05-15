import { Request, Response } from "../../types/express-types";

const LogoutService = (req: Request, res: Response) => {
  req.logout((error) => {
    if (error) {
      console.log(error);
      return res.status(500).send("Internal Server Error");
    }

    return res.status(200).send("Successfully Logged Out");
  });
};

export default LogoutService;
