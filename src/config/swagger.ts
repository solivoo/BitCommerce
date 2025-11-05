import { OpenAPIRegistry, OpenApiGeneratorV3 } from '@asteasolutions/zod-to-openapi';
import { createUserSchema, updateUserSchema } from '../schemas/user.schema.js';
import { createCompanySchema, updateCompanySchema } from '../schemas/company.schema.js';

// Crear el registro de OpenAPI
const registry = new OpenAPIRegistry();

// Registrar schemas de Users
registry.register('CreateUserInput', createUserSchema);
registry.register('UpdateUserInput', updateUserSchema);

// Registrar schemas de Companies
registry.register('CreateCompanyInput', createCompanySchema);
registry.register('UpdateCompanyInput', updateCompanySchema);

// Registrar rutas de Users
registry.registerPath({
  method: 'get',
  path: '/api/v1/users',
  summary: 'Obtener todos los usuarios',
  description: 'Retorna una lista de todos los usuarios activos e inactivos en el sistema',
  tags: ['Users'],
  responses: {
    200: {
      description: 'Lista de usuarios obtenida exitosamente',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              success: { type: 'boolean', example: true },
              data: { type: 'array', items: { type: 'object' } },
              count: { type: 'integer', example: 10 }
            }
          }
        }
      }
    }
  }
});

registry.registerPath({
  method: 'get',
  path: '/api/v1/users/{id}',
  summary: 'Obtener usuario por ID',
  description: 'Retorna un usuario específico según su ID',
  tags: ['Users'],
  responses: {
    200: {
      description: 'Usuario encontrado exitosamente',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              success: { type: 'boolean', example: true },
              data: { type: 'object' }
            }
          }
        }
      }
    },
    404: {
      description: 'Usuario no encontrado'
    }
  }
});

registry.registerPath({
  method: 'post',
  path: '/api/v1/users',
  summary: 'Crear un nuevo usuario',
  description: 'Crea un nuevo usuario con los datos proporcionados. Email y password son requeridos.',
  tags: ['Users'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: createUserSchema
        }
      }
    }
  },
  responses: {
    201: {
      description: 'Usuario creado exitosamente',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              success: { type: 'boolean', example: true },
              data: { type: 'object' }
            }
          }
        }
      }
    },
    400: {
      description: 'Datos de entrada inválidos'
    }
  }
});

registry.registerPath({
  method: 'put',
  path: '/api/v1/users/{id}',
  summary: 'Actualizar un usuario existente',
  description: 'Actualiza parcial o totalmente los datos de un usuario. Todos los campos son opcionales.',
  tags: ['Users'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: updateUserSchema
        }
      }
    }
  },
  responses: {
    200: {
      description: 'Usuario actualizado exitosamente',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              success: { type: 'boolean', example: true },
              data: { type: 'object' }
            }
          }
        }
      }
    },
    404: {
      description: 'Usuario no encontrado'
    }
  }
});

registry.registerPath({
  method: 'delete',
  path: '/api/v1/users/{id}',
  summary: 'Eliminar un usuario (soft delete)',
  description: 'Desactiva un usuario marcándolo como inactivo (isActive = false). No se elimina físicamente de la base de datos.',
  tags: ['Users'],
  responses: {
    200: {
      description: 'Usuario desactivado exitosamente',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              success: { type: 'boolean', example: true },
              data: { type: 'object' }
            }
          }
        }
      }
    },
    404: {
      description: 'Usuario no encontrado'
    }
  }
});

// Registrar rutas de Companies
registry.registerPath({
  method: 'get',
  path: '/api/v1/companies',
  summary: 'Obtener todas las empresas',
  description: 'Retorna una lista de todas las empresas registradas en el sistema',
  tags: ['Companies'],
  responses: {
    200: {
      description: 'Lista de empresas obtenida exitosamente',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              success: { type: 'boolean', example: true },
              data: { type: 'array', items: { type: 'object' } },
              count: { type: 'integer', example: 5 }
            }
          }
        }
      }
    }
  }
});

registry.registerPath({
  method: 'get',
  path: '/api/v1/companies/{id}',
  summary: 'Obtener empresa por ID',
  description: 'Retorna una empresa específica según su ID',
  tags: ['Companies'],
  responses: {
    200: {
      description: 'Empresa encontrada exitosamente',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              success: { type: 'boolean', example: true },
              data: { type: 'object' }
            }
          }
        }
      }
    },
    404: {
      description: 'Empresa no encontrada'
    }
  }
});

registry.registerPath({
  method: 'post',
  path: '/api/v1/companies',
  summary: 'Crear una nueva empresa',
  description: 'Crea una nueva empresa con los datos proporcionados. Name, taxId y email son requeridos.',
  tags: ['Companies'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: createCompanySchema
        }
      }
    }
  },
  responses: {
    201: {
      description: 'Empresa creada exitosamente',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              success: { type: 'boolean', example: true },
              data: { type: 'object' }
            }
          }
        }
      }
    },
    400: {
      description: 'Datos de entrada inválidos'
    }
  }
});

registry.registerPath({
  method: 'put',
  path: '/api/v1/companies/{id}',
  summary: 'Actualizar una empresa existente',
  description: 'Actualiza parcial o totalmente los datos de una empresa. Todos los campos son opcionales.',
  tags: ['Companies'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: updateCompanySchema
        }
      }
    }
  },
  responses: {
    200: {
      description: 'Empresa actualizada exitosamente',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              success: { type: 'boolean', example: true },
              data: { type: 'object' }
            }
          }
        }
      }
    },
    404: {
      description: 'Empresa no encontrada'
    }
  }
});

registry.registerPath({
  method: 'delete',
  path: '/api/v1/companies/{id}',
  summary: 'Eliminar una empresa (soft delete)',
  description: 'Desactiva una empresa marcándola como inactiva (isActive = false). No se elimina físicamente de la base de datos.',
  tags: ['Companies'],
  responses: {
    200: {
      description: 'Empresa desactivada exitosamente',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              success: { type: 'boolean', example: true },
              data: { type: 'object' }
            }
          }
        }
      }
    },
    404: {
      description: 'Empresa no encontrada'
    }
  }
});

// Generar la especificación OpenAPI
const generator = new OpenApiGeneratorV3(registry.definitions);

export const swaggerSpec = generator.generateDocument({
  openapi: '3.0.0',
  info: {
    title: 'Backend BCP - API Documentation',
    version: '1.0.0',
    description: 'Documentación completa de la API REST para Backend BCP. Incluye gestión de usuarios y empresas con validaciones Zod, autenticación y soft deletes.',
    contact: {
      name: 'API Support',
      email: 'support@backenbcp.com'
    },
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT'
    }
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Servidor de desarrollo'
    },
    {
      url: 'https://api.backenbcp.com',
      description: 'Servidor de producción'
    }
  ],
  tags: [
    {
      name: 'Users',
      description: 'Operaciones CRUD para gestión de usuarios'
    },
    {
      name: 'Companies',
      description: 'Operaciones CRUD para gestión de empresas'
    }
  ]
});
