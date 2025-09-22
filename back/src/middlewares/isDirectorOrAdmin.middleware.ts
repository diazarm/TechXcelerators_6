import { Request, Response, NextFunction } from "express";
export function isDirectorOrAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (
    (req.user && req.user.role === "director") ||
    (req.user && req.user.isAdmin)
  ) {
    return next();
  }
  return res
    .status(403)
    .json({ error: "Solo director o admin pueden realizar esta acción" });
}
