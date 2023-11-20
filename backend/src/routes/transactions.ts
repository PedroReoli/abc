import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { prisma } from '../lib/prisma';

export async function transactionsRoutes(app: FastifyInstance) {
  app.get('/transactions', async () => {
    const transactions = await prisma.transaction.findMany();
    return transactions;
  });

  app.get('/transactions/:id', async (request) => {
    const paramSchema = z.object({
      id: z.string().uuid(),
    });
    const { id } = paramSchema.parse(request.params);
    const transaction = await prisma.transaction.findFirstOrThrow({
      where: {
        id,
      },
    });
    return transaction;
  });

  app.post('/transactions', async (request) => {
    const bodySchema = z.object({
      orderId: z.string().uuid(),
      amount: z.number(),
      status: z.string(),
      // Adicione outros campos relevantes aqui
    });
    const { orderId, amount, status } = bodySchema.parse(request.body);

    const transaction = await prisma.transaction.create({
      data: {
        orderId,
        amount,
        status,
        // Adicione outros campos relevantes aqui
      },
    });

    return transaction;
  });

  app.delete('/transactions/:id', async (request) => {
    const paramSchema = z.object({
      id: z.string().uuid(),
    });
    const { id } = paramSchema.parse(request.params);

    await prisma.transaction.delete({
      where: {
        id,
      },
    });
  });

  app.put('/transactions/:id', async (request) => {
    const paramSchema = z.object({
      id: z.string().uuid(),
    });
    const { id } = paramSchema.parse(request.params);
    const bodySchema = z.object({
      orderId: z.string().uuid(),
      amount: z.number(),
      status: z.string(),
      // Adicione outros campos relevantes aqui
    });
    const { orderId, amount, status } = bodySchema.parse(request.body);

    const transaction = await prisma.transaction.update({
      where: {
        id,
      },
      data: {
        orderId,
        amount,
        status,
        // Adicione outros campos relevantes aqui
      },
    });

    return transaction;
  });
}
