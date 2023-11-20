// Importa o cliente Prisma chamado 'PrismaClient' do módulo '@prisma/client'
import { PrismaClient } from "@prisma/client";

// Cria uma instância do cliente Prisma chamada 'prisma'
export const prisma = new PrismaClient();