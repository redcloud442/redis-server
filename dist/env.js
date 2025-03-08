import { config } from "dotenv";
import { z } from "zod";
config();
const envSchema = z.object({
    REDIS_HOST: z.string(),
    REDIS_PASSWORD: z.string(),
    PORT: z.string(),
});
export const envConfig = envSchema.parse({
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PASSWORD: process.env.REDIS_PASSWORD,
    PORT: process.env.PORT,
});
