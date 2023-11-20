import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { prisma } from '../lib/prisma';

export async function productReviewsRoutes(app: FastifyInstance) {
  app.get('/product_reviews', async () => {
    const productReviews = await prisma.productReview.findMany();
    return productReviews;
  });

  app.get('/product_reviews/:id', async (request) => {
    const paramSchema = z.object({
      id: z.string().uuid(),
    });
    const { id } = paramSchema.parse(request.params);
    const productReview = await prisma.productReview.findFirstOrThrow({
      where: {
        id,
      },
    });
    return productReview;
  });

  app.post('/product_reviews', async (request) => {
    const bodySchema = z.object({
      productId: z.string().uuid(),
      userId: z.string().uuid(),
      rating: z.number().int().min(1).max(5),
      comment: z.string(),
      // Adicione outros campos relevantes aqui
    });
    const { productId, userId, rating, comment } = bodySchema.parse(request.body);

    const productReview = await prisma.productReview.create({
      data: {
        productId,
        userId,
        rating,
        comment,
        // Adicione outros campos relevantes aqui
      },
    });

    return productReview;
  });

  app.delete('/product_reviews/:id', async (request) => {
    const paramSchema = z.object({
      id: z.string().uuid(),
    });
    const { id } = paramSchema.parse(request.params);

    await prisma.productReview.delete({
      where: {
        id,
      },
    });
  });

  app.put('/product_reviews/:id', async (request) => {
    const paramSchema = z.object({
      id: z.string().uuid(),
    });
    const { id } = paramSchema.parse(request.params);
    const bodySchema = z.object({
      productId: z.string().uuid(),
      userId: z.string().uuid(),
      rating: z.number().int().min(1).max(5),
      comment: z.string(),
      // Adicione outros campos relevantes aqui
    });
    const { productId, userId, rating, comment } = bodySchema.parse(request.body);

    const productReview = await prisma.productReview.update({
      where: {
        id,
      },
      data: {
        productId,
        userId,
        rating,
        comment,
        // Adicione outros campos relevantes aqui
      },
    });

    return productReview;
  });
}
