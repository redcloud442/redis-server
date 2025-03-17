import { authRouteModel, delRouteModel, expireRouteModel, getRouteModel, incrRouteModel, pingRouteModel, saddRouteModel, setRouteModel, sremRouteModel, } from "./route.model.js";
export const authRouteController = async (c) => {
    try {
        const params = c.req.header("Authorization")?.replace("Bearer ", "");
        if (!params) {
            return c.json({ error: "No token provided" }, 401);
        }
        const result = await authRouteModel({ token: params });
        return c.json(result, 200);
    }
    catch (error) {
        return c.json({ error: "Invalid token" }, 401);
    }
};
export const setRouteController = async (c) => {
    try {
        const params = await c.req.json();
        const result = await setRouteModel(params);
        return c.json(result, 200);
    }
    catch (error) {
        return c.json({ error: "Invalid Request" }, 400);
    }
};
export const getRouteController = async (c) => {
    try {
        const params = c.req.param();
        const result = await getRouteModel({ key: params.key });
        return c.json(result, 200);
    }
    catch (error) {
        return c.json({ error: "Invalid Request" }, 400);
    }
};
export const delRouteController = async (c) => {
    try {
        const params = c.req.param();
        const result = await delRouteModel({ key: params.key });
        return c.json(result, 200);
    }
    catch (error) {
        return c.json({ error: "Invalid Request" }, 400);
    }
};
export const incrRouteController = async (c) => {
    try {
        const params = c.req.param();
        const result = await incrRouteModel({ key: params.key });
        return c.json(result, 200);
    }
    catch (error) {
        return c.json({ error: "Invalid Request" }, 400);
    }
};
export const expireRouteController = async (c) => {
    try {
        const params = c.req.param();
        const result = await expireRouteModel({
            key: params.key,
            seconds: parseInt(params.seconds),
        });
        return c.json(result, 200);
    }
    catch (error) {
        return c.json({ error: "Invalid Request" }, 400);
    }
};
export const pingRouteController = async (c) => {
    try {
        const result = await pingRouteModel();
        return c.json(result, 200);
    }
    catch (error) {
        return c.json({ error: "Invalid Request" }, 400);
    }
};
export const sremRouteController = async (c) => {
    try {
        const params = c.req.param();
        const result = await sremRouteModel({
            key: params.key,
            value: params.value,
        });
        return c.json(result, 200);
    }
    catch (error) {
        return c.json({ error: "Invalid Request" }, 400);
    }
};
export const saddRouteController = async (c) => {
    try {
        const params = c.req.param();
        const result = await saddRouteModel({
            key: params.key,
            value: params.value,
        });
        return c.json(result, 200);
    }
    catch (error) {
        return c.json({ error: "Invalid Request" }, 400);
    }
};
