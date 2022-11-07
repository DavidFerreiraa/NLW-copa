import Fastify from 'fastify';

const start = async () => {

    const fastify = Fastify({
        logger: true,
    })

    await fastify.listen({port: 3333})
    

}

start()