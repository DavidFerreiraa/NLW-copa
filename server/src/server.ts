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
        const count = await prisma.pool.count()
        return { count }
    })

    await fastify.listen({port: 3333})
 
}

start()