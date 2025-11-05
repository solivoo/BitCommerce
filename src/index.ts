import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import v1Routes from './routes/v1/index.js';
import { swaggerSpec } from './config/swagger.js';
import { logger } from './utils/logger.js';

const app = express();
const PORT = process.env.PORT || 3000;

//Middlewares
app.use(cors());
app.use(express.json());

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Backend BCP - API Docs'
}));

app.get('/', (req, res) => {
  res.json({
    name: 'Backend BCP',
    description: 'Backend para el proyecto BCP',
    version: '1.0.0',
    author: 'Sergio Olivo',
    email: 'olivosergio09@gmail.com',
    website: 'https://sergiolivo.com',
    contact: 'https://sergiolivo.com/contact',
    license: 'MIT',
    repository: 'https://github.com/sergiolivo/backend-bcp',    
  })
})

app.use('/api/v1', v1Routes);

// Rutas no existentes
app.use((req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    message: `La ruta ${req.originalUrl} no existe`,
    method: req.method
  })
});

// Iniciar el servidor
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
  logger.info(`API is running on http://localhost:${PORT}/api/v1`);
  logger.info(`API Docs available at http://localhost:${PORT}/api-docs`);
});

