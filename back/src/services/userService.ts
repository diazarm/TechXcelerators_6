//Estructura básica del servicio de usuario en TypeScript
import mongoose from "mongoose";
import jwt, { SignOptions, Secret } from "jsonwebtoken";

import User, { IUser } from "../models/User";
import { hashPassword, comparePassword } from "../utils/hashPassword";
import { envs } from "../config/envs.config";

const { secretKey, jwtExpiration } = envs.auth;

export class UserService {
  async createUser({
    name,
    email,
    password,
    isAdmin = false,
    isActive = true,
    role = "user",
  }: {
    name: string;
    email: string;
    password: string;
    isAdmin?: boolean;
    isActive?: boolean;
    role?: "user" | "director";
  }): Promise<IUser> {
    try {
      const existingUser = await User.findOne({ email }).exec();
      if (existingUser) {
        return Promise.reject({ status: 400, error: "El email ya existe" });
      }
      let userData: Partial<IUser> = {
        name,
        email,
        isAdmin,
        isActive,
        role: role ?? "user",
      };
      // Solo el admin requiere password
      if (isAdmin) {
        if (!password) {
          return Promise.reject({
            status: 400,
            error: "El admin requiere contraseña",
          });
        }
        userData.password = await hashPassword(password);
      } else {
        userData.password = undefined;
      }
      const user = new User(userData);
      return user.save();
    } catch (error) {
      console.error(error);
      return Promise.reject({
        status: 500,
        error: "Error al intentar registrar el usuario",
      });
    }
  }

  async loginService({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<[IUser, string]> {
    try {
      const user = await User.findOne({ email }).exec();
      if (!user) {
        return Promise.reject({ status: 404, error: "Usuario no encontrado" });
      }
      if (user.isAdmin) {
        // Admin requiere constraseña
        if (!user.password) {
          return Promise.reject({ status: 400, error: "El admin no tiene contraseña configurada" });
        }
        if (!password) {
          return Promise.reject({ status: 400, error: "Debes ingresar la contraseña" });
        }
        const passwordMatch = await comparePassword(password, user.password);
        if (!passwordMatch) {
          return Promise.reject({ status: 401, error: "Credenciales incorrectas" });
        }
      }
      // Director y user solo requieren email
      if (!secretKey || typeof secretKey !== "string") {
        return Promise.reject({ status: 500, error: "No se ha configurado secretKey para JWT" });
      }
      const expiresIn: number = typeof jwtExpiration === "string" ? parseInt(jwtExpiration) : jwtExpiration;
      const payload = {
        uid: user.id.toString(),
        name: user.name ?? "",
        email: user.email ?? "",
        isAdmin: Boolean(user.isAdmin),
        role: user.role ?? "user",
      };
      const options: SignOptions = { expiresIn };
      const secret: Secret = secretKey as string;
      const token = jwt.sign(payload, secret, options);
      return [user, token];
    } catch (error) {
      return Promise.reject({ status: 500, error: "Error al intentar iniciar sesión" });
    }
  }

  async resetAdminPassword(email: string, newPassword: string): Promise<IUser> {
    try {
      const user = await User.findOne({ email }).exec();
      if (!user || !user.isAdmin) {
        return Promise.reject({
          status: 404,
          error: "Solo el admin puede cambiar su contraseña",
        });
      }
      // Validación de contraseña
      if (!newPassword || newPassword.length < 8) {
        return Promise.reject({ status: 400, error: "La contraseña debe tener al menos 8 caracteres" });
      }
      if (!/[A-Z]/.test(newPassword) || !/[a-z]/.test(newPassword) || !/[0-9]/.test(newPassword)) {
        return Promise.reject({ status: 400, error: "La contraseña debe incluir mayúsculas, minúsculas y números" });
      }
      
      user.password = await hashPassword(newPassword);
      await user.save();
      return user;
    } catch (error) {
      return Promise.reject({
        status: 500,
        error: "Error al actualizar contraseña",
      });
    }
  }
  async getUsers(page: number = 1, limit: number = 10): Promise<IUser[]> {
    const skip = (page - 1) * limit;
    return User.find({ isActive: true }).skip(skip).limit(limit).exec();
  }

  async getDeletedUsers(
    page: number = 1,
    limit: number = 10
  ): Promise<IUser[]> {
    const skip = (page - 1) * limit;
    return User.find({ isActive: false }).skip(skip).limit(limit).exec();
  }

  async getUserById(id: string): Promise<IUser | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return User.findById(id).exec();
  }

  async updateUser(id: string, updatedData: Partial<IUser>): Promise<IUser> {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return Promise.reject({ status: 400, error: "ID inválido" });
      }
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { ...updatedData, updatedAt: new Date() },
        { new: true }
      ).exec();
      if (!updatedUser) {
        return Promise.reject({ status: 404, error: "Usuario no encontrado" });
      }
      return updatedUser;
    } catch (error) {
      return Promise.reject({
        status: 500,
        error: "Error al actualizar usuario",
      });
    }
  }

  async deleteUser(id: string): Promise<IUser | null> {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return Promise.reject({ status: 400, error: "ID inválido" });
      }
      const deletedUser = await User.findOneAndUpdate(
        { _id: id, isAdmin: false },
        { isActive: false, deletedAt: new Date() },
        { new: true }
      ).exec();
      if (!deletedUser) {
        const exists = await User.exists({ _id: id });
        if (!exists) {
          return Promise.reject({
            status: 404,
            error: "Usuario no encontrado",
          });
        } else {
          return Promise.reject({
            status: 403,
            error: "No se puede eliminar ni inactivar al admin",
          });
        }
      }
      return Promise.resolve(null);
    } catch (error) {
      return Promise.reject({
        status: 500,
        error: "Error al eliminar usuario",
      });
    }
  }

  async restoreUser(id: string): Promise<IUser> {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return Promise.reject({ status: 400, error: "ID inválido" });
      }
      const user = await User.findById(id).setOptions({ includeDeleted: true });
      if (!user) {
        return Promise.reject({ status: 404, error: "Usuario no encontrado" });
      }
      if (!user.isActive || user.deletedAt) {
        user.isActive = true;
        user.deletedAt = undefined;
        await user.save();
      }
      return user;
    } catch (error) {
      return Promise.reject({
        status: 500,
        error: "Error al restaurar usuario",
      });
    }
  }

  async updateRole(id: string): Promise<IUser> {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return Promise.reject({ status: 400, error: "ID inválido" });
      }
      const user = await User.findById(id).exec();
      if (!user) {
        return Promise.reject({ status: 404, error: "Usuario no encontrado" });
      }
      // Cambia entre user y director
      user.role = user.role === "user" ? "director" : "user";
      await user.save();
      return user;
    } catch (error) {
      return Promise.reject({ status: 500, error: "Error al actualizar rol" });
    }
  }
}

export const userService = new UserService();
