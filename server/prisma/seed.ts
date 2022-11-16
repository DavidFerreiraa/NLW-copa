//Used to create fictitious data to test the application
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
    const user = await prisma.user.create({
        data: {
            name: "John Doe",
            email: "john.doe@gmail.com",
            avatarUrl: "https://github.com/davidferreiraa.png"
        }
    })

    const pool = await prisma.pool.create({
        data: {
            title: "MyPool",
            code: "POOL01",
            ownerId: user.id,

            Participant: {
                create: {
                    userId: user.id
                }
            }
        }
    })

    await prisma.game.create({
        data: {
            date: "2022-11-16T12:00:00.598Z",
            firstTeamCountryCode: "BR",
            secondTeamCountryCode: "DE",
        },
    });

    await prisma.game.create({
        data: {
            date: "2022-11-18T14:15:51.598Z",
            firstTeamCountryCode: "BR",
            secondTeamCountryCode: "AR",

            guesses: {
                create: {
                    firstTeamPoints: 3,
                    secondTeamPoints: 1,
                    participant: {
                        connect: {
                            userId_poolId: {
                                userId: user.id,
                                poolId: pool.id
                            }
                        }
                    }
                }
            }
        },
    });
}

main()
