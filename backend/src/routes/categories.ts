import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { prisma } from '../lib/prisma';

export async function categoriesRoutes(app: FastifyInstance) {
  app.get('/categories', async () => {
    const categories = await prisma.category.findMany();
    return categories;
  });

  app.get('/categories/:id', async (request) => {
    const paramSchema = z.object({
      id: z.string().uuid(),
    });
    const { id } = paramSchema.parse(request.params);
    const category = await prisma.category.findFirstOrThrow({
      where: {
        id,
      },
    });
    return category;
  });

  app.post('/categories', async (request) => {
    const bodySchema = z.object({
      name: z.string(),
      description: z.string(),
      // Adicione outros campos relevantes aqui
    });
    const { name, description } = bodySchema.parse(request.body);
    const category = await prisma.category.create({
      data: {
        name,
        description,
        // Adicione outros campos relevantes aqui
      },
    });
    return category;
  });

  app.delete('/categories/:id', async (request) => {
    const paramSchema = z.object({
      id: z.string().uuid(),
    });
    const { id } = paramSchema.parse(request.params);
    await prisma.category.delete({
      where: {
        id,
      },
    });
  });

  app.put('/categories/:id', async (request) => {
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
    const category = await prisma.category.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        // Adicione outros campos relevantes aqui
      },
    });
    return category;
  });
}
