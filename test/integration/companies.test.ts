import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import express from 'express';
import cors from 'cors';
import v1Routes from '../../src/routes/v1/index.js';

// Setup de la app
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/v1', v1Routes);

describe.sequential('Companies API', () => {
  let companyId: number;

  it('debería obtener lista vacía de empresas', async () => {
    const response = await request(app)
      .get('/api/v1/companies')
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.data).toEqual([]);
    expect(response.body.count).toBe(0);
  });

  it('debería crear una empresa', async () => {
    const newCompany = {
      name: 'Test Company',
      taxId: '12345678901',
      email: 'test@company.com',
      phone: '+1234567890',
      city: 'Lima',
      country: 'Peru'
    };

    const response = await request(app)
      .post('/api/v1/companies')
      .send(newCompany)
      .expect(201);

    expect(response.body.success).toBe(true);
    expect(response.body.data.name).toBe(newCompany.name);
    expect(response.body.data.taxId).toBe(newCompany.taxId);
    expect(response.body.data.id).toBeDefined();

    companyId = response.body.data.id;
  });

  it('debería obtener una empresa por ID', async () => {
    // Primero crear
    const created = await request(app)
      .post('/api/v1/companies')
      .send({
        name: 'Test Company 2',
        taxId: '98765432101',
        email: 'test2@company.com'
      });

    // Luego obtener
    const response = await request(app)
      .get(`/api/v1/companies/${created.body.data.id}`)
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.data.id).toBe(created.body.data.id);
  });

  it('debería actualizar una empresa', async () => {
    // Crear empresa
    const created = await request(app)
      .post('/api/v1/companies')
      .send({
        name: 'Original Name',
        taxId: '11111111111',
        email: 'original@company.com'
      });

    // Actualizar
    const response = await request(app)
      .put(`/api/v1/companies/${created.body.data.id}`)
      .send({ name: 'Updated Name' })
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.data.name).toBe('Updated Name');
  });

  it('debería eliminar una empresa (soft delete)', async () => {
    // Crear empresa
    const created = await request(app)
      .post('/api/v1/companies')
      .send({
        name: 'To Delete',
        taxId: '22222222222',
        email: 'delete@company.com'
      });

    // Eliminar
    const response = await request(app)
      .delete(`/api/v1/companies/${created.body.data.id}`)
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.data.isActive).toBe(false);
  });

  it('debería devolver 404 para empresa inexistente', async () => {
    const response = await request(app)
      .get('/api/v1/companies/9999')
      .expect(404);

    expect(response.body.success).toBe(false);
  });
});