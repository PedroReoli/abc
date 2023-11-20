import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { prisma } from '../lib/prisma';

export async function wishlistsRoutes(app: FastifyInstance) {
  app.get('/wishlists', async () => {
    const wishlists = await prisma.wishlist.findMany();
    return wishlists;
  });

  app.get('/wishlists/:id', async (request) => {
    const paramSchema = z.object({
      id: z.string().uuid(),
    });
    const { id } = paramSchema.parse(request.params);
    const wishlist = await prisma.wishlist.findFirstOrThrow({
      where: {
        id,
      },
    });
    return wishlist;
  });

  app.post('/wishlists', async (request) => {
    const bodySchema = z.object({
      userId: z.string().uuid(),
      // Adicione outros campos relevantes aqui
    });
    const { userId } = bodySchema.parse(request.body);

    const wishlist = await prisma.wishlist.create({
      data: {
        userId,
        // Adicione outros campos relevantes aqui
      },
    });

    return wishlist;
  });

  app.delete('/wishlists/:id', async (request) => {
    const paramSchema = z.object({
      id: z.string().uuid(),
    });
    const { id } = paramSchema.parse(request.params);

    await prisma.wishlist.delete({
      where: {
        id,
      },
    });
  });

  app.put('/wishlists/:id', async (request) => {
    const paramSchema = z.object({
      id: z.string().uuid(),
    });
    const { id } = paramSchema.parse(request.params);
    const bodySchema = z.object({
      userId: z.string().uuid(),
      // Adicione outros campos relevantes aqui
    });
    const { userId } = bodySchema.parse(request.body);

    const wishlist = await prisma.wishlist.update({
      where: {
        id,
      },
      data: {
        userId,
        // Adicione outros campos relevantes aqui
      },
    });

    return wishlist;
  });
}
