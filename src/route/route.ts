import "dotenv/config";
import { Hono } from "hono";
import {
  authRouteController,
  delRouteController,
  expireRouteController,
  getRouteController,
  incrRouteController,
  pingRouteController,
  saddRouteController,
  setRouteController,
  sremRouteController,
} from "./route.controller.js";

const app = new Hono();

app.get("/auth", authRouteController);

app.post("/set", setRouteController);

app.get("/get/:key", getRouteController);

app.get("/del/:key", delRouteController);

app.get("/incr/:key", incrRouteController);

app.get("/expire/:key/:seconds", expireRouteController);

app.get("/srem/:key/:value", sremRouteController);

app.get("/sadd/:key/:value", saddRouteController);

app.get("/ping", pingRouteController);

export default app;
