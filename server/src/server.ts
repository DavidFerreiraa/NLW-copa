import Fastify from 'fastify';
import cors from '@fastify/cors'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
    log: ['query'],
})

const start = async () => {

    const fastify = Fastify({
        logger: true,
    })

    await fastify.register(cors, {
        origin: true,
    })

    fastify.get('/pools/count', async (request, response) => {
        const count = await prisma.pool.count()
        return { count }
    })

    await fastify.listen({port: 3333, host: '0.0.0.0'}) //host 0.0.0.0 is used to better performance in android or ios apps
 
}

start()