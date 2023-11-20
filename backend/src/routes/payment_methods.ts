import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { prisma } from '../lib/prisma';

export async function paymentMethodsRoutes(app: FastifyInstance) {
  app.get('/payment_methods', async () => {
    const paymentMethods = await prisma.paymentMethod.findMany();
    return paymentMethods;
  });

  app.get('/payment_methods/:id', async (request) => {
    const paramSchema = z.object({
      id: z.string().uuid(),
    });
    const { id } = paramSchema.parse(request.params);
    const paymentMethod = await prisma.paymentMethod.findFirstOrThrow({
      where: {
        id,
      },
    });
    return paymentMethod;
  });

  app.post('/payment_methods', async (request) => {
    const bodySchema = z.object({
      name: z.string(),
      description: z.string(),
      // Adicione outros campos relevantes aqui
    });
    const { name, description } = bodySchema.parse(request.body);

    const paymentMethod = await prisma.paymentMethod.create({
      data: {
        name,
        description,
        // Adicione outros campos relevantes aqui
      },
    });

    return paymentMethod;
  });

  app.delete('/payment_methods/:id', async (request) => {
    const paramSchema = z.object({
      id: z.string().uuid(),
    });
    const { id } = paramSchema.parse(request.params);

    await prisma.paymentMethod.delete({
      where: {
        id,
      },
    });
  });

  app.put('/payment_methods/:id', async (request) => {
    const paramSchema = z.object({
      id: z.string().uuid(),
    });
    const { id } = paramSchema.parse(request.params);
    const bodySchema = z.object({
      name: z.string(),
      description: z.string(),
      // Adicione outros campos relevantes aqui
    });
    const { name, description } = bodySchema.parse(request.body);

    const paymentMethod = await prisma.paymentMethod.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        // Adicione outros campos relevantes aqui
      },
    });

    return paymentMethod;
  });
}
