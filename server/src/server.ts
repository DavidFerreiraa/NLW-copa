import Fastify from 'fastify';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
    log: ['query'],
})

const start = async () => {

    const fastify = Fastify({
        logger: true,
    })

    fastify.get('/pools/count', async (request, response) => {
        return { count : 0 }
    })

    await fastify.listen({port: 3333})
 
}

start()