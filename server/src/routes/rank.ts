import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { authenticate } from "../plugins/authenticate";

export async function rankRoutes(fastify: FastifyInstance) {
    fastify.put(
        "/pools/:poolId/rank",
        { onRequest: [authenticate] },
        async (request, response) => {
            const createRankParams = z.object({
                poolId: z.string(),
            });

            const { poolId } = createRankParams.parse(request.params);

            const participant = await prisma.participant.findUnique({
                where: {
                    userId_poolId: {
                        poolId,
                        userId: request.user.sub,
                    },
                },
            });

            if (!participant) {
                return response.status(400).send({
                    message: "You're not into this pool.",
                });
            }

            const participantPoints = participant.points;

            await prisma.participant.update({
                where: {
                    userId_poolId: {
                        poolId,
                        userId: request.user.sub,
                    },
                },
                data: {
                    points: participantPoints + 1,
                },
            });

            return response.status(201).send();
        }
    );

    fastify.get(
        "/pools/:poolId/rank",
        { onRequest: [authenticate] },
        async (request, response) => {
            const createRankParams = z.object({
                poolId: z.string(),
            });

            const { poolId } = createRankParams.parse(request.params);

            const pool = await prisma.pool.findUnique({
                where: {
                    id: poolId,
                },
                include: {
                    owner: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                    Participant: {
                        select: {
                            id: true,
                            user: {
                                select: {
                                    avatarUrl: true,
                                    name: true,
                                },
                            },
                            points: true,
                        },
                        take: 4,
                        orderBy: {
                            points: "desc",
                        },
                    },
                },
            });

            return { pool };
        }
    );
}
