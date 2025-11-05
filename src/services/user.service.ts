import { prisma } from "../config/database.js";
import type { User } from "@prisma/client";

export class UserService {
    //Obtener todos los usuarios
    async getAllUsers(): Promise<User[]> {
        return await prisma.user.findMany({
            where: { isActive: true },
            orderBy: { createdAt: 'desc' },
        });
    }

    //Obtener un usuario por su id
    async getUserById(id: number): Promise<User | null> {
        return await prisma.user.findUnique({
            where: { id },
        });
    }

    //Crear un nuevo usuario
    async createUser(data: {
        email: string;
        password: string;
        username?: string;
        name?: string;
        lastName?: string;
        phone?: string;
        avatar?: string;
        bio?: string;
        address?: string;
        city?: string;
        country?: string;
        role?: string;
        status?: string;
    }): Promise<User> {
        return await prisma.user.create({
            data
        });
    }

    //Actualizar un usuario (todos los campos opcionales)
    async updateUser(id: number, data: {
        email?: string;
        password?: string;
        username?: string;
        name?: string;
        lastName?: string;
        phone?: string;
        avatar?: string;
        bio?: string;
        address?: string;
        city?: string;
        country?: string;
        role?: string;
        status?: string;
        isActive?: boolean;
        emailVerified?: boolean;
        phoneVerified?: boolean;
        lastLogin?: Date;
    }): Promise<User> {
        return await prisma.user.update({
            where: { id },
            data,
        });
    }

    //Eliminar un usuario (soft delete)
    async deleteUser(id: number): Promise<User> {
        return await prisma.user.update({
            where: { id },
            data: { isActive: false }
        });
    }
}

// Exportar instancia unica
export const userService = new UserService();