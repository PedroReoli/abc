import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { prisma } from '../lib/prisma';

export async function returnsRoutes(app: FastifyInstance) {
  app.get('/returns', async () => {
    const returns = await prisma.return.findMany();
    return returns;
  });

  app.get('/returns/:id', async (request) => {
    const paramSchema = z.object({
      id: z.string().uuid(),
    });
    const { id } = paramSchema.parse(request.params);
    const returnItem = await prisma.return.findFirstOrThrow({
      where: {
        id,
      },
    });
    return returnItem;
  });

  app.post('/returns', async (request) => {
    const bodySchema = z.object({
      orderId: z.string().uuid(),
      userId: z.string().uuid(),
      status: z.string(),
      reason: z.string(),
      // Adicione outros campos relevantes aqui
    });
    const { orderId, userId, status, reason } = bodySchema.parse(request.body);

    const returnItem = await prisma.return.create({
      data: {
        orderId,
        userId,
        status,
        reason,
        // Adicione outros campos relevantes aqui
      },
    });

    return returnItem;
  });

  app.delete('/returns/:id', async (request) => {
    const paramSchema = z.object({
      id: z.string().uuid(),
    });
    const { id } = paramSchema.parse(request.params);

    await prisma.return.delete({
      where: {
        id,
      },
    });
  });

  app.put('/returns/:id', async (request) => {
    const paramSchema = z.object({
      id: z.string().uuid(),
    });
    const { id } = paramSchema.parse(request.params);
    const bodySchema = z.object({
      orderId: z.string().uuid(),
      userId: z.string().uuid(),
      status: z.string(),
      reason: z.string(),
      // Adicione outros campos relevantes aqui
    });
    const { orderId, userId, status, reason } = bodySchema.parse(request.body);

    const returnItem = await prisma.return.update({
      where: {
        id,
      },
      data: {
        orderId,
        userId,
        status,
        reason,
        // Adicione outros campos relevantes aqui
      },
    });

    return returnItem;
  });
}
