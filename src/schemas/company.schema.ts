import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);

// Schema para crear empresa
export const createCompanySchema = z.object({
  name: z.string().min(2, { message: 'Nombre debe tener mínimo 2 caracteres' }).openapi({ example: 'Tech Solutions SAC' }),
  taxId: z.string().min(8, { message: 'Tax ID debe tener mínimo 8 caracteres' }).openapi({ example: '20123456789' }),
  email: z.string().email({ message: 'Email inválido' }).openapi({ example: 'contact@techsolutions.com' }),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, { message: 'Formato de teléfono inválido' }).optional().openapi({ example: '+51987654321' }),
  address: z.string().optional().openapi({ example: 'Av. Empresarial 123' }),
  city: z.string().optional().openapi({ example: 'Lima' }),
  state: z.string().optional().openapi({ example: 'Lima' }),
  zip: z.string().optional().openapi({ example: '15001' }),
  country: z.string().optional().openapi({ example: 'Peru' }),
  logo: z.string().url({ message: 'URL inválida' }).optional().openapi({ example: 'https://example.com/logo.png' }),
  description: z.string().max(1000, { message: 'Descripción no puede exceder 1000 caracteres' }).optional().openapi({ example: 'Empresa líder en soluciones tecnológicas' }),
}).openapi('CreateCompanyInput');

// Schema para actualizar empresa
export const updateCompanySchema = z.object({
  name: z.string().min(2).optional().openapi({ example: 'Updated Company Name' }),
  taxId: z.string().min(8).optional().openapi({ example: '20987654321' }),
  email: z.string().email({ message: 'Email inválido' }).optional().openapi({ example: 'newemail@company.com' }),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/).optional().openapi({ example: '+51912345678' }),
  address: z.string().optional().openapi({ example: 'Nueva Dirección 456' }),
  city: z.string().optional().openapi({ example: 'Arequipa' }),
  state: z.string().optional().openapi({ example: 'Arequipa' }),
  zip: z.string().optional().openapi({ example: '04001' }),
  country: z.string().optional().openapi({ example: 'Peru' }),
  logo: z.string().url({ message: 'URL inválida' }).optional().openapi({ example: 'https://example.com/new-logo.png' }),
  description: z.string().max(1000).optional().openapi({ example: 'Descripción actualizada' }),
  isActive: z.boolean().optional().openapi({ example: true }),
}).openapi('UpdateCompanyInput');

// Schema para validar ID
export const companyIdSchema = z.object({
  id: z.string().regex(/^\d+$/, { message: 'ID debe ser un número' }).openapi({ example: '1' }),
});

// Tipos inferidos
export type CreateCompanyInput = z.infer<typeof createCompanySchema>;
export type UpdateCompanyInput = z.infer<typeof updateCompanySchema>;