import { Request, Response, NextFunction } from "express";

export const verifyAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({
      message: "No tienes permisos para acceder a este recurso",
      statusCode: 403,
    });
  }

  next();
};
