import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['./test/setup.ts'],
    env: {
      // Variables para controlar logs en tests
      SHOW_PRISMA_QUERIES: 'false',  // true para ver queries SQL
      SHOW_TEST_LOGS: 'false',       // true para ver logs de setup/cleanup
      SHOW_LOGS: 'false',            // true para logs generales
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
});
