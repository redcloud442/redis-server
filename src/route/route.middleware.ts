import { envConfig } from "@/env.js";
import { Context } from "hono";

export const routeMiddleware = (c: Context) => {
  try {
    const { password } = c.req.param();
    if (password === envConfig.REDIS_PASSWORD) {
      return c.json({ AUTH: ["true", "OK"] });
    }
    return c.json({ error: "Invalid password" }, 401);
  } catch (error) {
    return c.json({ error: "Invalid password" }, 401);
  }
};
