import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);

// Schema para crear usuario
export const createUserSchema = z.object({
  email: z.string().email({ message: 'Email inválido' }).openapi({ example: 'user@example.com' }),
  password: z.string().min(6, { message: 'Password debe tener mínimo 6 caracteres' }).openapi({ example: 'password123' }),
  username: z.string().min(3, { message: 'Username debe tener mínimo 3 caracteres' }).optional().openapi({ example: 'johndoe' }),
  name: z.string().min(2).optional().openapi({ example: 'John' }),
  lastName: z.string().min(2).optional().openapi({ example: 'Doe' }),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, { message: 'Formato de teléfono inválido' }).optional().openapi({ example: '+51987654321' }),
  avatar: z.string().url({ message: 'URL inválida' }).optional().openapi({ example: 'https://example.com/avatar.jpg' }),
  bio: z.string().max(500, { message: 'Bio no puede exceder 500 caracteres' }).optional().openapi({ example: 'Desarrollador Full Stack' }),
  address: z.string().optional().openapi({ example: 'Av. Principal 123' }),
  city: z.string().optional().openapi({ example: 'Lima' }),
  country: z.string().optional().openapi({ example: 'Peru' }),
}).openapi('CreateUserInput');

// Schema para actualizar usuario
export const updateUserSchema = z.object({
  email: z.string().email({ message: 'Email inválido' }).optional().openapi({ example: 'updated@example.com' }),
  password: z.string().min(6, { message: 'Password debe tener mínimo 6 caracteres' }).optional().openapi({ example: 'newpassword123' }),
  username: z.string().min(3).optional().openapi({ example: 'newusername' }),
  name: z.string().min(2).optional().openapi({ example: 'Jane' }),
  lastName: z.string().min(2).optional().openapi({ example: 'Smith' }),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/).optional().openapi({ example: '+51912345678' }),
  avatar: z.string().url().optional().openapi({ example: 'https://example.com/new-avatar.jpg' }),
  bio: z.string().max(500).optional().openapi({ example: 'Backend Developer' }),
  address: z.string().optional().openapi({ example: 'Calle Secundaria 456' }),
  city: z.string().optional().openapi({ example: 'Arequipa' }),
  country: z.string().optional().openapi({ example: 'Peru' }),
  status: z.enum(['active', 'suspended', 'banned']).optional().openapi({ example: 'active' }),
  emailVerified: z.boolean().optional().openapi({ example: true }),
  phoneVerified: z.boolean().optional().openapi({ example: true }),
}).openapi('UpdateUserInput');

// Schema para validar ID en parámetros
export const userIdSchema = z.object({
  id: z.string().regex(/^\d+$/, { message: 'ID debe ser un número' }).openapi({ example: '1' }),
});

// Tipos inferidos de los schemas
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;