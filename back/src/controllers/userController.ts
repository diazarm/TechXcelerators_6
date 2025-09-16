//Estructura básica del controlador de usuario en TypeScript
import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/userService";
const userService = new UserService();

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const users = await userService.getUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const getDeletedUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const users = await userService.getDeletedUsers(page, limit);
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = req.params.id;
    const user = await userService.getUserById(id);
    if (user) res.json(user);
    else res.status(404).json({ message: "Usuario no encontrado" });
  } catch (error) {
    next(error);
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
  } catch (error: any) {
    if (error && error.status && error.error) {
      res.status(error.status).json({ error: error.error });
    } else {
      res.status(500).json({ error: "Error inesperado al crear usuario" });
    }
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

export const resetAdminPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, newPassword } = req.body;
    const user = await userService.resetAdminPassword(email, newPassword);
    res.json({ message: "Contraseña actualizada con éxito", user });
  } catch (error: any) {
    if (error && error.status && error.error) {
      res.status(error.status).json({ error: error.error });
    } else {
      res
        .status(500)
        .json({ error: "Error inesperado al actualizar contraseña" });
    }
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const updatedUser = await userService.updateUser(id, updatedData);
    if (updatedUser) res.json(updatedUser);
    else res.status(404).json({ message: "Usuario no encontrado" });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = req.params.id;
    await userService.deleteUser(id);
    res.json({ message: "Usuario inactivado con éxito" });
  } catch (error) {
    next(error);
  }
};

export const restoreUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = req.params.id;
    const restoredUser = await userService.restoreUser(id);
    if (restoredUser) res.json(restoredUser);
    else res.status(404).json({ message: "Usuario no encontrado" });
  } catch (error) {
    next(error);
  }
};

export const changeRole = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = req.params.id;
    const updatedUser = await userService.updateRole(id);
    if (updatedUser) {
      res.json({
        message: `Rol actualizado a ${updatedUser.role}`,
        role: updatedUser.role,
        user: updatedUser,
      });
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    next(error);
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
