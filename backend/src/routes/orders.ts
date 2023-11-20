import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { prisma } from '../lib/prisma';

export async function ordersRoutes(app: FastifyInstance) {

  // Listar todos os pedidos
  app.get('/orders', async () => {
    const orders = await prisma.order.findMany();
    return orders;
  });

  // Obter detalhes de um pedido específico
  app.get('/orders/:id', async request => {
    const paramSchema = z.object({
      id: z.string().uuid(),
    });
    const { id } = paramSchema.parse(request.params);
    const order = await prisma.order.findFirstOrThrow({
      where: {
        id,
      },
      include: {
        products: true,
      },
    });
    return order;
  });

  // Criar um novo pedido
  app.post('/orders', async request => {
    const bodySchema = z.object({
      userId: z.string().uuid(),
      products: z.array(z.object({
        productId: z.string().uuid(),
      })),
      totalPrice: z.number(),
      status: z.string(),
      shippingInfo: z.string(),
    });

    const { userId, products, totalPrice, status, shippingInfo } = bodySchema.parse(request.body);

    const order = await prisma.order.create({
      data: {
        userId,
        totalPrice,
        status,
        shippingInfo,
        products: {
          create: products.map(product => ({
            name: 'Dummy Product Name',
            description: 'Dummy Product Description',
            price: 0.00,
            product: {
              connect: {
                id: product.productId,
              },
            },
          })),
        },
      },
      include: {
        products: true,
      },
    });

    return order;
  });

  // Excluir um pedido
  app.delete('/orders/:id', async request => {
    const paramSchema = z.object({
      id: z.string().uuid(),
    });
    const { id } = paramSchema.parse(request.params);
    await prisma.order.delete({
      where: {
        id,
      },
    });
  });

  // Atualizar um pedido
  app.put('/orders/:id', async request => {
    const paramSchema = z.object({
      id: z.string().uuid(),
    });
    const { id } = paramSchema.parse(request.params);

    const bodySchema = z.object({
      userId: z.string().uuid(),
      products: z.array(z.object({
        productId: z.string().uuid(),
      })),
      totalPrice: z.number(),
      status: z.string(),
      shippingInfo: z.string(),
    });

    const { userId, products, totalPrice, status, shippingInfo } = bodySchema.parse(request.body);

    const order = await prisma.order.update({
      where: {
        id,
      },
      data: {
        userId,
        totalPrice,
        status,
        shippingInfo,
        products: {
          deleteMany: {},
          create: products.map(product => ({
            name: 'Dummy Product Name',
            description: 'Dummy Product Description',
            price: 0.00,
            product: {
              connect: {
                id: product.productId,
              },
            },
          })),
        },
      },
      include: {
        products: true,
      },
    });

    return order;
  });
}
