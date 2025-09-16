import { Request, Response, NextFunction } from "express";

export const verifyAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({
      success: false,
      error:
        "No tienes permisos para acceder a este recurso. Solo los administradores pueden realizar esta acción.",
      statusCode: 403,
    });
  }

  next();
};
