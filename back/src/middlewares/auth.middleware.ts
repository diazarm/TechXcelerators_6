import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { envs } from "../config/envs.config";

const { secretKey } = envs.auth;

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  try {
    if (!secretKey) return res.status(500).json({
      success: false,
      error: "No se ha configurado secretKey para JWT"
    });

    const authorization = req.headers.authorization;
    const token =
      typeof authorization === "string" && authorization.startsWith("Bearer ")
        ? authorization.slice(7)
        : null;

    if (!token) return res.status(401).json({
      success: false,
      error: "Token de acceso no proporcionado. Por favor, inicia sesión."
    });

    const decoded = jwt.verify(token, secretKey as string);
    (req as any).user = decoded;

    next();
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        error: "El token ha expirado. Por favor, renueva tu sesión."
      });
    }
    return res.status(401).json({
      success: false,
      error: "Token inválido o error de autenticación"
    });
  }
};
