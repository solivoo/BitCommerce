import { describe, it, expect } from 'vitest';
import request from 'supertest';
import express from 'express';
import cors from 'cors';
import v1Routes from '../../src/routes/v1/index.js';

// Setup de la app
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/v1', v1Routes);

describe.sequential('Users API', () => {
  it('debería obtener lista vacía de usuarios', async () => {
    const response = await request(app)
      .get('/api/v1/users')
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.data).toEqual([]);
  });

  it('debería crear un usuario', async () => {
    const newUser = {
      email: 'test@example.com',
      password: 'password123',
      username: 'testuser',
      name: 'Test',
      lastName: 'User',
      phone: '+51987654321',
      city: 'Lima',
      country: 'Peru',
      role: 'user'
    };

    const response = await request(app)
      .post('/api/v1/users')
      .send(newUser)
      .expect(201);

    expect(response.body.success).toBe(true);
    expect(response.body.data.email).toBe(newUser.email);
    expect(response.body.data.username).toBe(newUser.username);
    expect(response.body.data.name).toBe(newUser.name);
    expect(response.body.data.id).toBeDefined();
  });

  it('debería obtener un usuario por ID', async () => {
    // Primero crear
    const created = await request(app)
      .post('/api/v1/users')
      .send({
        email: 'user2@example.com',
        password: 'password123',
        username: 'testuser2',
        name: 'John'
      });

    // Luego obtener
    const response = await request(app)
      .get(`/api/v1/users/${created.body.data.id}`)
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.data.id).toBe(created.body.data.id);
    expect(response.body.data.email).toBe('user2@example.com');
  });

  it('debería actualizar un usuario', async () => {
    // Crear usuario
    const created = await request(app)
      .post('/api/v1/users')
      .send({
        email: 'update@example.com',
        password: 'password123',
        name: 'Original Name'
      });

    // Actualizar
    const response = await request(app)
      .put(`/api/v1/users/${created.body.data.id}`)
      .send({ 
        name: 'Updated Name',
        city: 'Arequipa'
      })
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.data.name).toBe('Updated Name');
    expect(response.body.data.city).toBe('Arequipa');
  });

  it('debería eliminar un usuario (soft delete)', async () => {
    // Crear usuario
    const created = await request(app)
      .post('/api/v1/users')
      .send({
        email: 'delete@example.com',
        password: 'password123'
      });

    // Eliminar
    const response = await request(app)
      .delete(`/api/v1/users/${created.body.data.id}`)
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.data.isActive).toBe(false);
  });

  it('debería devolver 404 para usuario inexistente', async () => {
    const response = await request(app)
      .get('/api/v1/users/9999')
      .expect(404);

    expect(response.body.success).toBe(false);
  });

  it('debería crear usuario solo con campos mínimos requeridos', async () => {
    const response = await request(app)
      .post('/api/v1/users')
      .send({
        email: 'minimal@example.com',
        password: 'password123'
      })
      .expect(201);

    expect(response.body.success).toBe(true);
    expect(response.body.data.email).toBe('minimal@example.com');
    expect(response.body.data.role).toBe('user'); // Default
    expect(response.body.data.isActive).toBe(true); // Default
    expect(response.body.data.status).toBe('active'); // Default
  });
});