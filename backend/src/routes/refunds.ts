import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { prisma } from '../lib/prisma';

export async function refundsRoutes(app: FastifyInstance) {
  app.get('/refunds', async () => {
    const refunds = await prisma.refund.findMany();
    return refunds;
  });

  app.get('/refunds/:id', async (request) => {
    const paramSchema = z.object({
      id: z.string().uuid(),
    });
    const { id } = paramSchema.parse(request.params);
    const refund = await prisma.refund.findFirstOrThrow({
      where: {
        id,
      },
    });
    return refund;
  });

  app.post('/refunds', async (request) => {
    const bodySchema = z.object({
      returnId: z.string().uuid(),
      amount: z.number(),
      status: z.string(),
      // Adicione outros campos relevantes aqui
    });
    const { returnId, amount, status } = bodySchema.parse(request.body);

    const refund = await prisma.refund.create({
      data: {
        returnId,
        amount,
        status,
        // Adicione outros campos relevantes aqui
      },
    });

    return refund;
  });

  app.delete('/refunds/:id', async (request) => {
    const paramSchema = z.object({
      id: z.string().uuid(),
    });
    const { id } = paramSchema.parse(request.params);

    await prisma.refund.delete({
      where: {
        id,
      },
    });
  });

  app.put('/refunds/:id', async (request) => {
    const paramSchema = z.object({
      id: z.string().uuid(),
    });
    const { id } = paramSchema.parse(request.params);
    const bodySchema = z.object({
      returnId: z.string().uuid(),
      amount: z.number(),
      status: z.string(),
      // Adicione outros campos relevantes aqui
    });
    const { returnId, amount, status } = bodySchema.parse(request.body);

    const refund = await prisma.refund.update({
      where: {
        id,
      },
      data: {
        returnId,
        amount,
        status,
        // Adicione outros campos relevantes aqui
      },
    });

    return refund;
  });
}
