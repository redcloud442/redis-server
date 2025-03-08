import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { envConfig } from "./env.js";
import { errorHandlerMiddleware } from "./middleware/error.Middleware.js";
import route from "./route/route.js";
const app = new Hono();
app.use("*", cors({
    origin: [
        process.env.NODE_ENV === "development"
            ? "http://localhost:3000"
            : "https://elevateglobal.app",
    ],
    credentials: true,
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    exposeHeaders: ["Content-Range", "X-Total-Count"],
}));
app.get("/", (c) => {
    return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>API Status</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            text-align: center;
            padding: 50px;
          }
          .status {
            font-size: 20px;
            color: green;
          }
        </style>
    </head>
    <body>
        <h1>API Status</h1>
        <p class="status">✅ Redis api is working perfectly!</p>
        <p>Current Time: ${new Date().toLocaleString()}</p>
    </body>
    </html>
  `);
});
app.onError(errorHandlerMiddleware);
app.use(logger());
app.route("/api/v1", route);
export default {
    fetch: app.fetch,
    port: envConfig.PORT,
};
