import bcrypt from "bcrypt";
import { envs } from "../config/envs.config";

const { saltRounds } = envs.auth;

export const hashPassword = async (password: string): Promise<string> => {
  try {
    const rounds = Number(saltRounds);
    if (isNaN(rounds) || rounds <= 0) {
      throw new Error("El valor de saltRounds no es válido");
    }
    const hashedPassword = await bcrypt.hash(password, rounds);
    return hashedPassword;
  } catch (error) {
    throw new Error("Error al intentar hashear la contraseña");
  }
};

export const comparePassword = async (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  try {
    return await bcrypt.compare(plainPassword, hashedPassword);
  } catch (error) {
    throw new Error("Error al intentar comparar la contraseña");
  }
};
