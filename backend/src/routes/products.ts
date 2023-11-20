import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { prisma } from '../lib/prisma';

export async function productsRoutes(app: FastifyInstance) {
  app.get('/products', async () => {
    const products = await prisma.product.findMany();
    return products;
  });

  app.get('/products/:id', async (request) => {
    const paramSchema = z.object({
      id: z.string().uuid(),
    });
    const { id } = paramSchema.parse(request.params);
    const product = await prisma.product.findFirstOrThrow({
      where: {
        id,
      },
    });
    return product;
  });

  app.post('/products', async (request) => {
    const bodySchema = z.object({
      name: z.string(),
      description: z.string(),
      price: z.number(),
      // Adicione outros campos relevantes aqui
    });
    const { name, description, price } = bodySchema.parse(request.body);
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        // Adicione outros campos relevantes aqui
      },
    });
    return product;
  });

  app.delete('/products/:id', async (request) => {
    const paramSchema = z.object({
      id: z.string().uuid(),
    });
    const { id } = paramSchema.parse(request.params);
    await prisma.product.delete({
      where: {
        id,
      },
    });
  });

  app.put('/products/:id', async (request) => {
    const paramSchema = z.object({
      id: z.string().uuid(),
    });
    const { id } = paramSchema.parse(request.params);
    const bodySchema = z.object({
      name: z.string(),
      description: z.string(),
      price: z.number(),
      // Adicione outros campos relevantes aqui
    });
    const { name, description, price } = bodySchema.parse(request.body);
    const product = await prisma.product.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        price,
        // Adicione outros campos relevantes aqui
      },
    });
    return product;
  });
}
