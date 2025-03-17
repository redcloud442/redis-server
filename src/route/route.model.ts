import jwt from "jsonwebtoken";
import { redis } from "../utils/redis.js";

const secretKey = process.env.JWT_SECRET || "";

export const authRouteModel = async (params: { token: string }) => {
  const token = params.token;

  if (!token) {
    throw new Error("No token provided");
  }

  const code = jwt.verify(token, secretKey);

  if (code !== process.env.REDIS_PASSWORD) {
    return { error: "Unauthorized" };
  }

  return { access: "Authorized" };
};

export const setRouteModel = async (params: { key: string; value: string }) => {
  await redis.set(params.key, params.value);

  return { SET: "OK" };
};

export const getRouteModel = async (params: { key: string }) => {
  const value = await redis.get(params.key);

  return { GET: value };
};

export const delRouteModel = async (params: { key: string }) => {
  const value = await redis.del(params.key);

  return { DEL: value };
};

export const incrRouteModel = async (params: { key: string }) => {
  const value = await redis.incr(params.key);

  return { INCR: value };
};

export const expireRouteModel = async (params: {
  key: string;
  seconds: number;
}) => {
  const value = await redis.expire(params.key, params.seconds);

  return { EXPIRE: value };
};

export const sremRouteModel = async (params: {
  key: string;
  value: string;
}) => {
  const value = await redis.srem(params.key, params.value);

  return { SREM: value };
};

export const saddRouteModel = async (params: {
  key: string;
  value: string;
}) => {
  const value = await redis.sadd(params.key, params.value);

  return { SADD: value };
};

export const pingRouteModel = async () => {
  const value = await redis.ping();

  return { PING: value };
};
