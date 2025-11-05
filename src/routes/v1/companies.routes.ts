import { Router } from 'express';
import { companyController } from '../../controllers/company.controller.js';
import { validateBody, validateParams } from '../../middlewares/validate.middleware.js';
import { createCompanySchema, updateCompanySchema, companyIdSchema } from '../../schemas/company.schema.js';

const routerCompany = Router();

// GET /api/v1/companies - Obtener todas las empresas
routerCompany.get('/', (req, res) => companyController.getAll(req, res));

// GET /api/v1/companies/:id - Obtener empresa por ID
routerCompany.get(
  '/:id',
  validateParams(companyIdSchema),
  (req, res) => companyController.getById(req, res)
);

// POST /api/v1/companies - Crear nueva empresa
routerCompany.post(
  '/',
  validateBody(createCompanySchema),
  (req, res) => companyController.create(req, res)
);

// PUT /api/v1/companies/:id - Actualizar empresa
routerCompany.put(
  '/:id',
  validateParams(companyIdSchema),
  validateBody(updateCompanySchema),
  (req, res) => companyController.update(req, res)
);

// DELETE /api/v1/companies/:id - Eliminar empresa (soft delete)
routerCompany.delete(
  '/:id',
  validateParams(companyIdSchema),
  (req, res) => companyController.delete(req, res)
);

export default routerCompany;
