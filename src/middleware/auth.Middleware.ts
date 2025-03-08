import { envConfig } from "@/env.js";
import { compare } from "bcryptjs";
import { Context, Next } from "hono";

export const authMiddleware = async (c: Context, next: Next) => {
  const token = c.req.header("Authorization") as string;

  const comparedToken = await compare(token, envConfig.REDIS_PASSWORD);

  if (!comparedToken) {
    return c.json({ error: "Invalid Token" }, 401);
  }
  return next();
};
