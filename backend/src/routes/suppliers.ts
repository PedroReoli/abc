import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { prisma } from '../lib/prisma';

export async function suppliersRoutes(app: FastifyInstance) {
  app.get('/suppliers', async () => {
    const suppliers = await prisma.supplier.findMany();
    return suppliers;
  });

  app.get('/suppliers/:id', async (request) => {
    const paramSchema = z.object({
      id: z.string().uuid(),
    });
    const { id } = paramSchema.parse(request.params);
    const supplier = await prisma.supplier.findFirstOrThrow({
      where: {
        id,
      },
    });
    return supplier;
  });

  app.post('/suppliers', async (request) => {
    const bodySchema = z.object({
      name: z.string(),
      description: z.string(),
      // Adicione outros campos relevantes aqui
    });
    const { name, description } = bodySchema.parse(request.body);

    const supplier = await prisma.supplier.create({
      data: {
        name,
        description,
        // Adicione outros campos relevantes aqui
      },
    });

    return supplier;
  });

  app.delete('/suppliers/:id', async (request) => {
    const paramSchema = z.object({
      id: z.string().uuid(),
    });
    const { id } = paramSchema.parse(request.params);

    await prisma.supplier.delete({
      where: {
        id,
      },
    });
  });

  app.put('/suppliers/:id', async (request) => {
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

    const supplier = await prisma.supplier.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        // Adicione outros campos relevantes aqui
      },
    });

    return supplier;
  });
}
