import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { authenticate } from "../plugins/authenticate";

export async function gameRoutes(fastify: FastifyInstance) {
    fastify.get("/pools/:id/games", { onRequest: [authenticate]},async (request, response) => {

        const getPoolParams = z.object({
            id: z.string(),
        })

        const { id } = getPoolParams.parse(request.params)

        const games = await prisma.game.findMany({
            orderBy: {
                date: 'desc',
            },
            include: {
                guesses: {
                    where: {
                        participant: {
                            userId: request.user.sub,
                            poolId: id,
                        }
                    }
                }
            }
        })

        return { games: games.map(game => {
            return {
                ...game,
                guess: game.guesses.length > 0? game.guesses[0] : null,
                guesses: undefined
            }
        }) }

    })

    fastify.post(
        "/pools/games/:gameId",
        { onRequest: [authenticate] },
        async (request, response) => {
            const getGameParams = z.object({
                gameId: z.string(),
            });

            const createGameBody = z.object({
                firstTeamPointsFinalResult: z.number(),
                secondTeamPointsFinalResult: z.number(),
            });

            const { gameId } = getGameParams.parse(request.params);
            const { firstTeamPointsFinalResult, secondTeamPointsFinalResult } = createGameBody.parse(request.body)

            const game = await prisma.game.findUnique({
                where: {
                    id: gameId,
                }
            });

            if(!game){
                return response.status(400).send({
                    message: "There's no game whit this gameId"
                })
            }

            await prisma.game.update({
                where: {
                    id: gameId,
                },
                data: {
                    firstTeamPointsFinalResult,
                    secondTeamPointsFinalResult
                }
            })

            return response.status(201).send()
        }
    );
}
