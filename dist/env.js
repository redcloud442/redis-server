import { config } from "dotenv";
import { z } from "zod";
config();
const envSchema = z.object({
    REDIS_HOST: z.string().default("redis://@redis:6379"),
    REDIS_PASSWORD: z.string().default("Blackl300!"),
    PORT: z.coerce.number().default(8080),
});
export const envConfig = envSchema.parse({
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PASSWORD: process.env.REDIS_PASSWORD,
    PORT: process.env.PORT,
});
// $2a$12$botCVKmF/gZxzWg9zN/nveq2D81JvDMH0ChSe1CqulYgDspOVV542
