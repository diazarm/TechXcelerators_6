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
      throw new Error("Error al intentar registrar el usuario");
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
        throw new Error("Credenciales incorrectas");
      }
      const passwordMatch = await comparePassword(password, user.password);
      if (!passwordMatch) {
        throw new Error("Credenciales incorrectas");
      }
      if (!secretKey || typeof secretKey !== "string") {
        throw new Error("No se ha configurado secretKey para JWT");
      }
  const expiresIn: number = typeof jwtExpiration === "string" ? parseInt(jwtExpiration) : jwtExpiration;
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
      throw new Error("Error al intentar iniciar sesión");
    }
  }

  async updateUser(id: string, updatedData: Partial<IUser>): Promise<IUser | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return User.findByIdAndUpdate(id, { ...updatedData, updatedAt: new Date() }, { new: true }).exec();
  }

  async deleteUser(id: string): Promise<IUser | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return User.findByIdAndUpdate(id, { isActive: false, deletedAt: new Date() }, { new: true }).exec();
  }

  async restoreUser(id: string): Promise<IUser | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    const user = await User.findById(id).setOptions({ includeDeleted: true });
    if (!user) return null;
    if (!user.isActive || user.deletedAt) {
      user.isActive = true;
      user.deletedAt = undefined;
      return user.save();
    }
    return user;
  }

  async updateRole(id: string): Promise<IUser | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    const user = await User.findById(id).exec();
    if (user) {
      user.isAdmin = !user.isAdmin;
      return user.save();
    }
    return null;
  }
}
export const userService = new UserService();
