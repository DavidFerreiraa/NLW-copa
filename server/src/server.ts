import Fastify from "fastify";
import cors from "@fastify/cors";
import { z } from "zod";
import ShortUniqueId from "short-unique-id";

import { PrismaClient } from "@prisma/client";

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

    fastify.get("/pools/count", async () => {
        const count = await prisma.pool.count();
        return { count };
    });

    fastify.get("/users/count", async () => {
        const count = await prisma.user.count()

        return { count }
    })

    fastify.get("/guesses/count", async () => {
        const count = await prisma.guess.count()

        return { count }
    })

    fastify.post("/pools", async (request, response) => {
        const createPoolBody = z.object({
            title: z.string(),
        });

        const { title } = createPoolBody.parse(request.body);

        const generateCode = new ShortUniqueId({ length: 6 });

        const code = String(generateCode()).toUpperCase()

        const newPool = await prisma.pool.create({
            data: {
                title,
                code,
            },
        });

        return response.status(201).send({ newPool });
    });

    await fastify.listen({ port: 3333 /*host: '0.0.0.0'*/ }); //host 0.0.0.0 is used to better performance in android or ios apps
};

start();
