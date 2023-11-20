import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { prisma } from '../lib/prisma';

export async function shippingMethodsRoutes(app: FastifyInstance) {
  app.get('/shipping-methods', async () => {
    const shippingMethods = await prisma.shippingMethod.findMany();
    return shippingMethods;
  });

  app.get('/shipping-methods/:id', async (request) => {
    const paramSchema = z.object({
      id: z.string().uuid(),
    });
    const { id } = paramSchema.parse(request.params);
    const shippingMethod = await prisma.shippingMethod.findFirstOrThrow({
      where: {
        id,
      },
    });
    return shippingMethod;
  });

  app.post('/shipping-methods', async (request) => {
    const bodySchema = z.object({
      name: z.string(),
      description: z.string(),
      // Adicione outros campos relevantes aqui
    });
    const { name, description } = bodySchema.parse(request.body);

    const shippingMethod = await prisma.shippingMethod.create({
      data: {
        name,
        description,
        // Adicione outros campos relevantes aqui
      },
    });

    return shippingMethod;
  });

  app.delete('/shipping-methods/:id', async (request) => {
    const paramSchema = z.object({
      id: z.string().uuid(),
    });
    const { id } = paramSchema.parse(request.params);

    await prisma.shippingMethod.delete({
      where: {
        id,
      },
    });
  });

  app.put('/shipping-methods/:id', async (request) => {
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

    const shippingMethod = await prisma.shippingMethod.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        // Adicione outros campos relevantes aqui
      },
    });

    return shippingMethod;
  });
}
