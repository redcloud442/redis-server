import { Redis } from "ioredis";
import { envConfig } from "../env.js";

export const redis = new Redis(envConfig.REDIS_HOST);

redis.on("error", (err) => console.error("❌ Redis Error:", err));
redis.on("connect", () => console.log("✅ Connected to Redis!"));
