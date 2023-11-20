import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { prisma } from '../lib/prisma';

export async function usersRoutes(app: FastifyInstance) {
  app.get('/users', async () => {
    const users = await prisma.user.findMany();
    return users;
  });

  app.get('/users/:id', async (request) => {
    const paramSchema = z.object({
      id: z.string().uuid(),
    });
    const { id } = paramSchema.parse(request.params);
    const user = await prisma.user.findFirstOrThrow({
      where: {
        id,
      },
    });
    return { Mensagem: 'Usuário encontrado com sucesso', user };
  });

  // Endpoint de login
  app.post('/login', async (request, reply) => {
    const bodySchema = z.object({
      email: z.string().email(),
      password: z.string(),
    });
    const { email, password } = bodySchema.parse(request.body);

    try {
      // Use o Prisma para verificar as credenciais do usuário no banco de dados
      const user = await prisma.user.findFirst({
        where: { email }, // Busca usando o email como identificador único
      });

      if (user && user.password === password) {
        // Usuário autenticado com sucesso
        reply.status(200).send({ message: 'Login successful' });
      } else {
        // Credenciais inválidas
        reply.status(401).send({ message: 'Invalid credentials' });
      }
    } catch (error) {
      // Trate outros erros aqui
      reply.status(500).send({ message: 'Internal server error' });
    }
  });

  // Rota de criação de usuário
  app.post('/users', async (request) => {
    const bodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string(),
    });
    const { name, email, password } = bodySchema.parse(request.body);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
    return user;
  });

  // Rota de exclusão de usuário
  app.delete('/users/:id', async (request) => {
    const paramSchema = z.object({
      id: z.string().uuid(),
    });
    const { id } = paramSchema.parse(request.params);
    await prisma.user.delete({
      where: {
        id,
      },
    });
  });
}
