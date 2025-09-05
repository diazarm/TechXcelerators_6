//Estructura básica del controlador de usuario en TypeScript
import { Request, Response, NextFunction } from "express";
import { userService } from "../services/userService";
import { User } from "../models/User";

export const getUsers = (req: Request, res: Response): void => {
  const users = userService.getUsers();
  res.json(users);
};

export const getUserById = (req: Request, res: Response): void => {
  const id = parseInt(req.params.id, 10);
  const user = userService.getUserById(id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "Usuario no encontrado" });
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userData = req.body;
    const user = await userService.createUser(userData);
    res.status(201).json({ user, message: "Usuario creado con éxito" });
  } catch (error) {
    next(error);
    console.error(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;
    const [user, token] = await userService.loginService({ email, password });
    res.status(200).json({ user, token, message: "Login exitoso" });
  } catch (error) {
    next(error);
  }
};

export const updateUser = (
  req: Request,
  res: Response
): void => {
  const id = parseInt(req.params.id, 10);
  const updatedData = req.body;
  const updatedUser = userService.updateUser(id, updatedData);
  if (updatedUser) {
    res.json(updatedUser);
  } else {
    res.status(404).json({ message: "Usuario no encontrado" });
  }
};

export const deleteUser = (
  req: Request,
  res: Response
): void => {
  const id = parseInt(req.params.id, 10);
  const success = userService.deleteUser(id);
  if (success) {
    res.status(204).send();
  } else {
    res.status(404).json({ message: "Usuario no encontrado" });
  }
};

export const changeRole = (
  req: Request,
  res: Response
): void => {
  const id = parseInt(req.params.id, 10);
  const updatedUser = userService.updateRole(id);
  if (updatedUser) {
    res.json(updatedUser);
  } else {
    res.status(404).json({ message: "Usuario no encontrado" });
  }
};

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    res.status(200).json({
      message: "Token válido",
      user: (req as any).user,
    });
  } catch (error) {
    next(error);
  }
};