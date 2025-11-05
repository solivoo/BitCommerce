import type { Request, Response, NextFunction } from 'express';
import { type ZodType, ZodError } from 'zod';

export const validateBody = (schema: ZodType) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Validar y parsear el body
      req.body = await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          success: false,
          error: 'Datos de entrada inválidos',
          details: error.issues.map((issue) => ({
            field: issue.path.join('.'),
            message: issue.message
          }))
        });
        return;
      }
      
      res.status(500).json({
        success: false,
        error: 'Error al validar datos'
      });
    }
  };
};

export const validateParams = (schema: ZodType) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Validar parámetros de la URL
      const validated = await schema.parseAsync(req.params);
      req.params = validated as any;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          success: false,
          error: 'Parámetros inválidos',
          details: error.issues.map((issue) => ({
            field: issue.path.join('.'),
            message: issue.message
          }))
        });
        return;
      }
      
      res.status(500).json({
        success: false,
        error: 'Error al validar parámetros'
      });
    }
  };
};