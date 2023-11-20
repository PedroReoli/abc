import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { prisma } from '../lib/prisma';

export async function productVariantsRoutes(app: FastifyInstance) {
  app.get('/product_variants', async () => {
    const productVariants = await prisma.productVariant.findMany();
    return productVariants;
  });

  app.get('/product_variants/:id', async (request) => {
    const paramSchema = z.object({
      id: z.string().uuid(),
    });
    const { id } = paramSchema.parse(request.params);
    const productVariant = await prisma.productVariant.findFirstOrThrow({
      where: {
        id,
      },
    });
    return productVariant;
  });

  app.post('/product_variants', async (request) => {
    const bodySchema = z.object({
      productId: z.string().uuid(),
      name: z.string(),
      price: z.number(),
      // Adicione outros campos relevantes aqui
    });
    const { productId, name, price } = bodySchema.parse(request.body);

    const productVariant = await prisma.productVariant.create({
      data: {
        productId,
        name,
        price,
        // Adicione outros campos relevantes aqui
      },
    });

    return productVariant;
  });

  app.delete('/product_variants/:id', async (request) => {
    const paramSchema = z.object({
      id: z.string().uuid(),
    });
    const { id } = paramSchema.parse(request.params);

    await prisma.productVariant.delete({
      where: {
        id,
      },
    });
  });

  app.put('/product_variants/:id', async (request) => {
    const paramSchema = z.object({
      id: z.string().uuid(),
    });
    const { id } = paramSchema.parse(request.params);
    const bodySchema = z.object({
      productId: z.string().uuid(),
      name: z.string(),
      price: z.number(),
      // Adicione outros campos relevantes aqui
    });
    const { productId, name, price } = bodySchema.parse(request.body);

    const productVariant = await prisma.productVariant.update({
      where: {
        id,
      },
      data: {
        productId,
        name,
        price,
        // Adicione outros campos relevantes aqui
      },
    });

    return productVariant;
  });
}
