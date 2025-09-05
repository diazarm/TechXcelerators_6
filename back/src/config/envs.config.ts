import dotenv from "dotenv";

dotenv.config();

export const envs = {
  port: process.env.PORT || 3000,
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:5173",
  auth: {
    saltRounds: Number(process.env.SALT_ROUNDS) || 10,
    secretKey: process.env.SECRET_KEY,
    refreshSecretKey: process.env.REFRESH_SECRET_KEY,
    jwtExpiration: Number(process.env.JWT_EXPIRATION) || 3600,
  },
};
