import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { prisma } from '../lib/prisma';

export async function notificationsRoutes(app: FastifyInstance) {
  app.get('/notifications', async () => {
    const notifications = await prisma.notification.findMany();
    return notifications;
  });

  app.get('/notifications/:id', async (request) => {
    const paramSchema = z.object({
      id: z.string().uuid(),
    });
    const { id } = paramSchema.parse(request.params);
    const notification = await prisma.notification.findFirstOrThrow({
      where: {
        id,
      },
    });
    return notification;
  });

  app.post('/notifications', async (request) => {
    const bodySchema = z.object({
      userId: z.string().uuid(),
      content: z.string(),
      isRead: z.boolean(),
      // Adicione outros campos relevantes aqui
    });
    const { userId, content, isRead } = bodySchema.parse(request.body);
    const notification = await prisma.notification.create({
      data: {
        userId,
        content,
        isRead,
        // Adicione outros campos relevantes aqui
      },
    });
    return notification;
  });

  app.delete('/notifications/:id', async (request) => {
    const paramSchema = z.object({
      id: z.string().uuid(),
    });
    const { id } = paramSchema.parse(request.params);
    await prisma.notification.delete({
      where: {
        id,
      },
    });
  });

  app.put('/notifications/:id', async (request) => {
    const paramSchema = z.object({
      id: z.string().uuid(),
    });
    const { id } = paramSchema.parse(request.params);
    const bodySchema = z.object({
      userId: z.string().uuid(),
      content: z.string(),
      isRead: z.boolean(),
      // Adicione outros campos relevantes aqui
    });
    const { userId, content, isRead } = bodySchema.parse(request.body);
    const notification = await prisma.notification.update({
      where: {
        id,
      },
      data: {
        userId,
        content,
        isRead,
        // Adicione outros campos relevantes aqui
      },
    });
    return notification;
  });
}
