import "dotenv/config";
import { Hono } from "hono";
import { Redis } from "ioredis";
import { envConfig } from "../env.js";
const redis = new Redis({
    host: envConfig.REDIS_HOST,
});
redis.on("error", (err) => console.error("❌ Redis Error:", err));
redis.on("connect", () => console.log("✅ Connected to Redis!"));
const app = new Hono();
app.get("/AUTH/:password", async (c) => {
    const { password } = c.req.param();
    if (password === envConfig.REDIS_PASSWORD) {
        return c.json({ AUTH: ["true", "OK"] });
    }
    return c.json({ error: "Invalid password" }, 401);
});
app.get("/SET/:key/:value", async (c) => {
    const { key, value } = c.req.param();
    await redis.set(key, value);
    return c.json({ SET: "OK" });
});
app.get("/GET/:key", async (c) => {
    const { key } = c.req.param();
    const value = await redis.get(key);
    return value
        ? c.json({ GET: value })
        : c.json({ error: "Key not found" }, 404);
});
app.get("/DEL/:key", async (c) => {
    const { key } = c.req.param();
    const result = await redis.del(key);
    return c.json({ DEL: result });
});
app.get("/INCR/:key", async (c) => {
    const { key } = c.req.param();
    const count = await redis.incr(key);
    return c.json({ INCR: count });
});
app.get("/EXPIRE/:key/:seconds", async (c) => {
    const { key, seconds } = c.req.param();
    const result = await redis.expire(key, parseInt(seconds));
    return c.json({ EXPIRE: result });
});
app.get("/PING", async (c) => {
    const pong = await redis.ping();
    return c.json({ PING: pong });
});
export default app;
