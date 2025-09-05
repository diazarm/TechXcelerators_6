//Estructura básica del servicio de usuario en TypeScript
import jwt, { SignOptions, Secret } from "jsonwebtoken";
import { User } from "../models/User";
import { hashPassword, comparePassword } from "../utils/hashPassword";
import { envs } from "../config/envs.config";

const { secretKey, jwtExpiration } = envs.auth;

export class UserService {
  private users: User[] = [];
  private currentId: number = 1;

  getUsers(): User[] {
    return this.users;
  }

  getUserById(id: number): User | null {
    return this.users.find((user) => user.id === id) || null;
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
    createdAt?: Date;
    updatedAt?: Date;
    isActive?: boolean;
  }): Promise<User> {
    try {
      const hashedPassword = await hashPassword(password);
      const newUser: User = {
        id: this.currentId++,
        name,
        email,
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
        isAdmin,
        isActive,
      };
      this.users.push(newUser);
      return newUser;
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
  }): Promise<[User, string]> {
    try {
      const user = this.users.find((u) => u.email === email);

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

      const expiresIn: string | number =
        typeof jwtExpiration === "string" ? jwtExpiration : "1h";

      // Definimos el payload como un objeto plano
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

  updateUser(id: number, updatedData: Partial<User>): User | null {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex !== -1) {
      const updatedUser: User = {
        ...this.users[userIndex],
        ...updatedData,
        updatedAt: new Date(),
      };
      this.users[userIndex] = updatedUser;
      return updatedUser;
    }
    return null;
  }

  deleteUser(id: number): boolean {
    const user = this.users.find((user) => user.id === id);
    if (user) {
      user.isActive = false;
      return true;
    }
    return false;
  }

  updateRole(id: number): User | null {
    const user = this.getUserById(id);
    if (user) {
      user.isAdmin = !user.isAdmin;
      return user;
    }
    return null;
  }
}

export const userService = new UserService();
