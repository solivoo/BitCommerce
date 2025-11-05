import { beforeAll, afterAll, afterEach } from 'vitest';
import { prisma } from '../src/config/database.js';

const showTestLogs = process.env.SHOW_TEST_LOGS === 'true';

// Antes de todos los tests
beforeAll(async () => {
  if (showTestLogs) console.log('🧪 Iniciando tests...');
  
  // Limpiar todas las tablas
  await prisma.company.deleteMany();
  await prisma.user.deleteMany();
});

// Después de cada test, limpiar datos
afterEach(async () => {
  if (showTestLogs) console.log('🧹 Limpiando datos...');
  
  // Usar transacción para limpiar de forma más robusta
  await prisma.$transaction([
    prisma.company.deleteMany(),
    prisma.user.deleteMany()
  ]);
  
  if (showTestLogs) console.log('✅ Datos limpiados');
});

// Después de todos los tests
afterAll(async () => {
  if (showTestLogs) console.log('🔌 Desconectando Prisma...');
  await prisma.$disconnect();
  if (showTestLogs) console.log('✅ Tests completados');
});