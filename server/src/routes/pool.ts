import { FastifyInstance } from "fastify";
import ShortUniqueId from "short-unique-id";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { authenticate } from "../plugins/authenticate";

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

    fastify.post("/pools/:id/join", {onRequest: [authenticate]},async (request, response) => {
        const joinPoolBody = z.object({
            code: z.string(),
        })

        const { code } = joinPoolBody.parse(request.body)

        const pool = await prisma.pool.findUnique({
            where: {
                code,
            }, include: {
                Participant: {
                    where: {
                        userId: request.user.sub,
                    }
                }
            }
        })

        if (!pool) {
            return response.status(400).send({
                message: "Pool not found."
            })
        } else if (pool.Participant.length > 0){
            return response.status(400).send({
                message: "You alredy joined this poll."
            })
        }

        if (!pool.ownerId) {
            await prisma.pool.update({
                where: {
                    id: pool.id,
                },
                data: {
                    ownerId: request.user.sub,
                }
            })
        }

        await prisma.participant.create({
            data: {
                poolId: pool.id,
                userId: request.user.sub,
            }
        })

        return response.status(201).send()
    })

}