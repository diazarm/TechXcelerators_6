//Estructura básica del servicio de usuario en TypeScript
import mongoose from "mongoose";
import jwt, { SignOptions, Secret } from "jsonwebtoken";

import User, { IUser } from "../models/User";
import { hashPassword, comparePassword } from "../utils/hashPassword";
import { envs } from "../config/envs.config";

const { secretKey, jwtExpiration } = envs.auth;

export class UserService {
  async getUsers(): Promise<IUser[]> {
    return User.find().exec();
  }

  async getUserById(id: string): Promise<IUser | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return User.findById(id).exec();
  }

  async createUser({
    name,
    email,
    password,
    isAdmin = false,
    isActive = true,
  }: {
    name: string;
    email: string;
    password: string;
    isAdmin?: boolean;
    isActive?: boolean;
  }): Promise<IUser> {
    try {
      const existingUser = await User.findOne({ email }).exec();
      if (existingUser) {
        return Promise.reject({ status: 400, error: "El email ya existe" });
      }
      const hashedPassword = await hashPassword(password);
      const user = new User({
        name,
        email,
        password: hashedPassword,
        isAdmin,
        isActive,
      });
      return user.save();
    } catch (error) {
      console.error(error);
      return Promise.reject({ status: 500, error: "Error al intentar registrar el usuario" });
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
      const passwordMatch = await comparePassword(password, user.password);
      if (!passwordMatch) {
        return Promise.reject({
          status: 401,
          error: "Credenciales incorrectas",
        });
      }
      if (!secretKey || typeof secretKey !== "string") {
        return Promise.reject({
          status: 500,
          error: "No se ha configurado secretKey para JWT",
        });
      }
      const expiresIn: number =
        typeof jwtExpiration === "string"
          ? parseInt(jwtExpiration)
          : jwtExpiration;
      const payload = {
        uid: user.id.toString(),
        name: user.name ?? "",
        email: user.email ?? "",
        isAdmin: Boolean(user.isAdmin),
      };
      const options: SignOptions = { expiresIn };
      const secret: Secret = secretKey as string;
      const token = jwt.sign(payload, secret, options);
      return [user, token];
    } catch (error) {
      return Promise.reject({
        status: 500,
        error: "Error al intentar iniciar sesión",
      });
    }
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

  async deleteUser(id: string): Promise<IUser> {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return Promise.reject({ status: 400, error: "ID inválido" });
      }
      const deletedUser = await User.findByIdAndUpdate(
        id,
        { isActive: false, deletedAt: new Date() },
        { new: true }
      ).exec();
      if (!deletedUser) {
        return Promise.reject({ status: 404, error: "Usuario no encontrado" });
      }
      return deletedUser;
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
      user.isAdmin = !user.isAdmin;
      await user.save();
      return user;
    } catch (error) {
      return Promise.reject({ status: 500, error: "Error al actualizar rol" });
    }
  }
}

export const userService = new UserService();