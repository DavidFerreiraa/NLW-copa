import Fastify from "fastify";
import cors from "@fastify/cors";
import jwt from '@fastify/jwt';

import { PrismaClient } from "@prisma/client";

import { poolRoutes } from "./routes/pool";
import { userRoutes } from "./routes/user";
import { guessRoutes } from "./routes/guess";
import { gameRoutes } from "./routes/game";
import { authRoutes } from "./routes/auth";

const prisma = new PrismaClient({
    log: ["query"],
});

const start = async () => {
    const fastify = Fastify({
        logger: true,
    });

    await fastify.register(cors, {
        origin: true,
    });

    await fastify.register(jwt, {
        secret: process.env.NODE_APP_SECRET_JWT_KEY as string,
    });

    await fastify.register(poolRoutes);
    await fastify.register(userRoutes);
    await fastify.register(guessRoutes);
    await fastify.register(gameRoutes);
    await fastify.register(authRoutes);

    await fastify.listen({ port: 3333, host: '0.0.0.0' }); //host 0.0.0.0 is used to better performance in android or ios apps
};

start();
