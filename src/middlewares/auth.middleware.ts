import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";
import jwt from "jsonwebtoken";
import config from "../config";

const auth = (...required_roles: string[]) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const auth_header = req.headers.authorization;
      if (!auth_header || !auth_header.startsWith("Bearer ")) {
        throw new AppError(401, "No token provided");
      }

      const token = auth_header.split(" ")[1];
      const decode_token = jwt.verify(token, config.jwt_secret) as { id: number; role: "organizer" | "attendee"; };

      req.user = decode_token;
      if (required_roles.length && !required_roles.includes(decode_token.role)) {
        throw new AppError(403, "You do not have permission to perform this action");
      }

      next();
    } catch (error) {
        if(error instanceof AppError){
            return next(error)
        }
        next(new AppError(401, "Invalid or expired token"));
    }

    
  }


}



export default auth;
