import { Router } from 'express';
import { userController } from '../../controllers/user.controller.js';
import { validateBody, validateParams } from '../../middlewares/validate.middleware.js';
import { createUserSchema, updateUserSchema, userIdSchema } from '../../schemas/user.schema.js';

const routerUser = Router();

// GET /api/v1/users - Obtener todos los usuarios
routerUser.get('/', (req, res) => userController.getAll(req, res));

// GET /api/v1/users/:id - Obtener un usuario por su id
routerUser.get(
  '/:id',
  validateParams(userIdSchema),
  (req, res) => userController.getById(req, res)
);

// POST /api/v1/users - Crear un nuevo usuario
routerUser.post(
  '/',
  validateBody(createUserSchema),
  (req, res) => userController.create(req, res)
);

// PUT /api/v1/users/:id - Actualizar un usuario
routerUser.put(
  '/:id',
  validateParams(userIdSchema),
  validateBody(updateUserSchema),
  (req, res) => userController.update(req, res)
);

// DELETE /api/v1/users/:id - Eliminar un usuario
routerUser.delete(
  '/:id',
  validateParams(userIdSchema),
  (req, res) => userController.delete(req, res)
);

export default routerUser;
