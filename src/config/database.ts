import { PrismaClient } from '@prisma/client';
import { logger } from '../utils/logger.js';

// Control de logs desde variables de entorno
const showQueries = process.env.SHOW_PRISMA_QUERIES === 'true';
const showLogs = process.env.SHOW_LOGS === 'true';
const isProduction = process.env.NODE_ENV === 'production';

// Configurar qué logs mostrar
const prismaLogs = [];
if (showQueries) prismaLogs.push('query');
if (!isProduction) {
  prismaLogs.push('error', 'warn');
} else {
  prismaLogs.push('error');
}

export const prisma = new PrismaClient({
  log: prismaLogs.length > 0 ? prismaLogs as any : ['error'],
});

process.on('beforeExit', async () => {
  if (showLogs) {
    logger.info('Disconnecting from database...');
  }
  await prisma.$disconnect();
  if (showLogs) {
    logger.info('Database disconnected successfully');
  }
}); 