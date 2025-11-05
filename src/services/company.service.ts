import { prisma } from "../config/database.js";
import type { Company } from "@prisma/client";

export class CompanyService {
    // Obtener todas las empresas
    async getAllCompanies(): Promise<Company[]> {
        return await prisma.company.findMany({
            where: { isActive: true },
            orderBy: { createdAt: 'desc' },
        });
    }

    // Obtener una empresa por su id
    async getCompanyById(id: number): Promise<Company | null> {
        return await prisma.company.findUnique({
            where: { id },
        });
    }

    // Crear una nueva empresa
    async createCompany(data: {
        name: string;
        taxId: string;
        email: string;
        phone?: string;
        address?: string;
        city?: string;
        state?: string;
        zip?: string;
        country?: string;
        logo?: string;
        description?: string;
    }): Promise<Company> {
        return await prisma.company.create({
            data
        });
    }

    // Actualizar una empresa
    async updateCompany(id: number, data: {
        name?: string;
        taxId?: string;
        email?: string;
        phone?: string;
        address?: string;
        city?: string;
        state?: string;
        zip?: string;
        country?: string;
        logo?: string;
        description?: string;
        isActive?: boolean;
    }): Promise<Company> {
        return await prisma.company.update({
            where: { id },
            data,
        });
    }

    // Eliminar una empresa (soft delete)
    async deleteCompany(id: number): Promise<Company> {
        return await prisma.company.update({
            where: { id },
            data: { isActive: false }
        });
    }
}

// Exportar instancia única
export const companyService = new CompanyService();