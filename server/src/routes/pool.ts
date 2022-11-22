import { FastifyInstance } from "fastify";
import ShortUniqueId from "short-unique-id";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function poolRoutes(fastify: FastifyInstance){
    
    fastify.get("/pools/count", async () => {
        const count = await prisma.pool.count();
        return { count };
    });

    fastify.post("/pools", async (request, response) => {
        const createPoolBody = z.object({
            title: z.string(),
        });

        const { title } = createPoolBody.parse(request.body);

        const generateCode = new ShortUniqueId({ length: 6 });

        const code = String(generateCode()).toUpperCase();
        
        try { //Create a poll when a authenticated user exists
            await request.jwtVerify()

            const newPool = await prisma.pool.create({
                data: {
                    title,
                    code,
                    ownerId: request.user.sub,
                    Participant: {
                        create: {
                            userId: request.user.sub,
                        }
                    }
                },
            });

        } catch { //Create a poll when a authenticated user don't exist
            const newPool = await prisma.pool.create({
                data: {
                    title,
                    code,
                },
            });
        }


        return response.status(201).send({ code });
    });

}