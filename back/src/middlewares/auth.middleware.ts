import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { envs } from "../config/envs.config";

const { secretKey } = envs.auth;

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    if (!secretKey) throw new Error("No se ha configurado secretKey para JWT");

    const { authorization } = req.headers;
    const token =
      typeof authorization === "string" && authorization.startsWith("Bearer ")
        ? authorization.slice(7)
        : null;

    if (!token) throw new Error("Token no proporcionado");

    const decoded = jwt.verify(token, secretKey as string);
    (req as any).user = decoded;

    next();
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      throw new Error("El token ha expirado. Por favor, renueva tu sesión.");
    }
    throw new Error("Token inválido o error inesperado");
  }
};
