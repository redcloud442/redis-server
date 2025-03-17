import { Context, Next } from "hono";
import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET || "";

export const routeMiddleware = async (c: Context, next: Next) => {
  try {
    const token = c.req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return c.json({ error: "No token provided" }, 401);
    }

    const code = jwt.verify(token, secretKey);

    if (code !== process.env.REDIS_PASSWORD) {
      return c.json({ access: "Unauthorized" }, 401);
    }

    await next();
  } catch (error) {
    return c.json({ error: "Invalid token" }, 401);
  }
};
