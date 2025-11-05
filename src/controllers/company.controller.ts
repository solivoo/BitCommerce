import type { Request, Response } from 'express';
import { companyService } from '../services/company.service.js';

export class CompanyController {
    // GET /api/v1/companies
    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const companies = await companyService.getAllCompanies();
            res.status(200).json({
                success: true,
                data: companies,
                count: companies.length
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Error al obtener las empresas',
                message: error instanceof Error ? error.message : 'Error desconocido'
            });
        }
    }

    // GET /api/v1/companies/:id
    async getById(req: Request, res: Response): Promise<void> {
        try {
            if (!req.params.id) {
                res.status(400).json({
                    success: false,
                    error: 'ID de empresa requerido'
                });
                return;
            }

            const id = parseInt(req.params.id);
            const company = await companyService.getCompanyById(id);

            if (!company) {
                res.status(404).json({
                    success: false,
                    error: 'Empresa no encontrada'
                });
                return;
            }

            res.json({
                success: true,
                data: company
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Error al obtener la empresa',
                message: error instanceof Error ? error.message : 'Error desconocido'
            });
        }
    }

    // POST /api/v1/companies
    async create(req: Request, res: Response): Promise<void> {
        try {
            const company = await companyService.createCompany(req.body);
            res.status(201).json({
                success: true,
                data: company,
                message: 'Empresa creada exitosamente'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Error al crear la empresa',
                message: error instanceof Error ? error.message : 'Error desconocido'
            });
        }
    }

    // PUT /api/v1/companies/:id
    async update(req: Request, res: Response): Promise<void> {
        try {
            if (!req.params.id) {
                res.status(400).json({
                    success: false,
                    error: 'ID de empresa requerido'
                });
                return;
            }

            const id = parseInt(req.params.id);
            const company = await companyService.updateCompany(id, req.body);

            res.json({
                success: true,
                data: company,
                message: 'Empresa actualizada exitosamente'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Error al actualizar la empresa',
                message: error instanceof Error ? error.message : 'Error desconocido'
            });
        }
    }

    // DELETE /api/v1/companies/:id
    async delete(req: Request, res: Response): Promise<void> {
        try {
            if (!req.params.id) {
                res.status(400).json({
                    success: false,
                    error: 'ID de empresa requerido'
                });
                return;
            }

            const id = parseInt(req.params.id);
            const company = await companyService.deleteCompany(id);

            res.json({
                success: true,
                data: company,
                message: 'Empresa eliminada exitosamente'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Error al eliminar la empresa',
                message: error instanceof Error ? error.message : 'Error desconocido'
            });
        }
    }
}

export const companyController = new CompanyController();