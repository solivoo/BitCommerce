import type { Request, Response } from 'express';
import { userService } from '../services/user.service.js';

export class UserController {
    //GET /api/v1/users
    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const users = await userService.getAllUsers();
            res.status(200).json({
                success: true,
                data: users,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Error al obtener los usuarios',
                message: error instanceof Error ? error.message : 'Error desconocido'
            });
        }
    }

    //GET /api/v1/users/:id
    async getById(req: Request, res: Response): Promise<void> {
        try {
            if (!req.params.id) {
                res.status(400).json({
                    success: false,
                    error: 'ID de usuario requerido',
                    message: 'El id del usuario es requerido'
                });
                return;
            }

            const id = parseInt(req.params.id);
            const user = await userService.getUserById(id);

            if (!user) {
                res.status(404).json({
                    success: false,
                    error: 'Usuario no encontrado'
                });
                return;
            }

            res.json({
                success: true,
                data: user
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Error al obtener el usuario',
                message: error instanceof Error ? error.message : 'Error desconocido'
            });
        }
    }

    //POST /api/v1/users
    async create(req: Request, res: Response): Promise<void> {
        try {
            const user = await userService.createUser(req.body);
            res.status(201).json({
                success: true,
                data: user,
                message: 'Usuario creado exitosamente'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Error al crear el usuario',
                message: error instanceof Error ? error.message : 'Error desconocido'
            });
        }
    }

    //PUT /api/v1/users/:id
    async update(req: Request, res: Response): Promise<void> {
        try {
            if (!req.params.id) {
                res.status(400).json({
                    success: false,
                    error: 'ID de usuario requerido'
                });
                return;
            }

            const id = parseInt(req.params.id);
            const user = await userService.updateUser(id, req.body);

            res.json({
                success: true,
                data: user,
                message: 'Usuario actualizado exitosamente'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Error al actualizar el usuario',
                message: error instanceof Error ? error.message : 'Error desconocido'
            });
        }
    }

    //DELETE /api/v1/users/:id
    async delete(req: Request, res: Response): Promise<void> {
        try {
            if (!req.params.id) {
                res.status(400).json({
                    success: false,
                    error: 'ID de usuario requerido'
                });
                return;
            }

            const id = parseInt(req.params.id);
            const user = await userService.deleteUser(id);

            res.json({
                success: true,
                data: user,
                message: 'Usuario eliminado exitosamente'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Error al eliminar el usuario',
                message: error instanceof Error ? error.message : 'Error desconocido'
            });
        }
    }
}

export const userController = new UserController();