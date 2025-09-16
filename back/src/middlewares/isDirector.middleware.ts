import { Request, Response, NextFunction } from "express";

export function isDirector(req: Request, res: Response, next: NextFunction) {
  if (req.user && req.user.role === "director") {
    return next();
  }
  return res
    .status(403)
    .json({ error: "Solo usuarios con rol director pueden acceder" });
}
