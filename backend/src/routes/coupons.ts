import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { prisma } from '../lib/prisma';

export async function couponsRoutes(app: FastifyInstance) {
  app.get('/coupons', async () => {
    const coupons = await prisma.coupon.findMany();
    return coupons;
  });

  app.get('/coupons/:id', async (request) => {
    const paramSchema = z.object({
      id: z.string().uuid(),
    });
    const { id } = paramSchema.parse(request.params);
    const coupon = await prisma.coupon.findFirstOrThrow({
      where: {
        id,
      },
    });
    return coupon;
  });

  app.post('/coupons', async (request) => {
    const bodySchema = z.object({
      code: z.string().nonempty(),
      discount: z.number(),
      expiration: z.date(),
      // Adicione outros campos relevantes aqui
    });
    const { code, discount, expiration } = bodySchema.parse(request.body);
    const coupon = await prisma.coupon.create({
      data: {
        code,
        discount,
        expiration,
        // Adicione outros campos relevantes aqui
      },
    });
    return coupon;
  });

  app.delete('/coupons/:id', async (request) => {
    const paramSchema = z.object({
      id: z.string().uuid(),
    });
    const { id } = paramSchema.parse(request.params);
    await prisma.coupon.delete({
      where: {
        id,
      },
    });
  });

  app.put('/coupons/:id', async (request) => {
    const paramSchema = z.object({
      id: z.string().uuid(),
    });
    const { id } = paramSchema.parse(request.params);
    const bodySchema = z.object({
      code: z.string().nonempty(),
      discount: z.number(),
      expiration: z.date(),
      // Adicione outros campos relevantes aqui
    });
    const { code, discount, expiration } = bodySchema.parse(request.body);
    const coupon = await prisma.coupon.update({
      where: {
        id,
      },
      data: {
        code,
        discount,
        expiration,
        // Adicione outros campos relevantes aqui
      },
    });
    return coupon;
  });
}
