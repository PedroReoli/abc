import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { prisma } from '../lib/prisma';

export async function shoppingCartsRoutes(app: FastifyInstance) {
  app.get('/shopping-carts', async () => {
    const shoppingCarts = await prisma.shoppingCart.findMany();
    return shoppingCarts;
  });

  app.get('/shopping-carts/:id', async (request) => {
    const paramSchema = z.object({
      id: z.string().uuid(),
    });
    const { id } = paramSchema.parse(request.params);
    const shoppingCart = await prisma.shoppingCart.findFirstOrThrow({
      where: {
        id,
      },
    });
    return shoppingCart;
  });

  app.post('/shopping-carts', async (request) => {
    const bodySchema = z.object({
      userId: z.string().uuid(),
      // Adicione outros campos relevantes aqui
    });
    const { userId } = bodySchema.parse(request.body);

    const shoppingCart = await prisma.shoppingCart.create({
      data: {
        userId,
        // Adicione outros campos relevantes aqui
      },
    });

    return shoppingCart;
  });

  app.delete('/shopping-carts/:id', async (request) => {
    const paramSchema = z.object({
      id: z.string().uuid(),
    });
    const { id } = paramSchema.parse(request.params);

    await prisma.shoppingCart.delete({
      where: {
        id,
      },
    });
  });

  app.put('/shopping-carts/:id', async (request) => {
    const paramSchema = z.object({
      id: z.string().uuid(),
    });
    const { id } = paramSchema.parse(request.params);
    const bodySchema = z.object({
      userId: z.string().uuid(),
      // Adicione outros campos relevantes aqui
    });
    const { userId } = bodySchema.parse(request.body);

    const shoppingCart = await prisma.shoppingCart.update({
      where: {
        id,
      },
      data: {
        userId,
        // Adicione outros campos relevantes aqui
      },
    });

    return shoppingCart;
  });
}
