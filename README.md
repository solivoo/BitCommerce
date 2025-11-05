# Backend BCP 🚀

API REST profesional desarrollada con Node.js, TypeScript, Express, Prisma y PostgreSQL. Incluye validaciones con Zod, documentación automática con Swagger, testing con Vitest y logging con Winston.

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Stack Tecnológico](#-stack-tecnológico)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Ejecución](#-ejecución)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [API Endpoints](#-api-endpoints)
- [Documentación](#-documentación)
- [Testing](#-testing)
- [Buenas Prácticas](#-buenas-prácticas)
- [Docker](#-docker)
- [Autor](#-autor)

## ✨ Características

- ✅ **TypeScript** con configuración estricta
- ✅ **API REST** con versionado (`/api/v1`)
- ✅ **Validación de datos** con Zod
- ✅ **Documentación automática** con Swagger/OpenAPI generada desde schemas Zod
- ✅ **ORM Prisma** para interacción type-safe con PostgreSQL
- ✅ **Testing** de integración con Vitest y Supertest
- ✅ **Logging profesional** con Winston
- ✅ **Soft deletes** en operaciones de eliminación
- ✅ **Docker** y Docker Compose para desarrollo y producción
- ✅ **ESM** (ES Modules) con `nodenext`
- ✅ **Arquitectura limpia** con separación de responsabilidades

## 🛠 Stack Tecnológico

### Backend
- **Node.js** - Entorno de ejecución
- **TypeScript** - Tipado estático
- **Express.js** - Framework web minimalista
- **Prisma** - ORM moderno para TypeScript

### Base de Datos
- **PostgreSQL 18** - Base de datos relacional

### Validación y Documentación
- **Zod** - Validación de datos con inferencia de tipos
- **@asteasolutions/zod-to-openapi** - Generación automática de Swagger desde Zod
- **Swagger UI Express** - Interfaz interactiva para documentación API

### Testing
- **Vitest** - Framework de testing ultrarrápido
- **Supertest** - Testing de endpoints HTTP

### Logging
- **Winston** - Sistema de logging profesional con múltiples niveles

### DevOps
- **Docker** - Containerización
- **Docker Compose** - Orquestación de contenedores

## 📦 Requisitos Previos

- **Node.js** >= 18.x
- **npm** >= 9.x
- **PostgreSQL** >= 14.x (o Docker)
- **Docker** >= 20.x (opcional)

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/backend-bcp.git
cd backend-bcp
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
# Database
DATABASE_URL="postgresql://postgres:root@localhost:5432/bitcommerce?schema=public"

# Server
PORT=3000
NODE_ENV=development

# Logging
SHOW_PRISMA_QUERIES=true
SHOW_LOGS=true
SHOW_TEST_LOGS=false
```

### 4. Ejecutar migraciones de Prisma

```bash
# Generar el cliente de Prisma
npx prisma generate

# Ejecutar migraciones
npx prisma migrate dev
```

## ⚙️ Configuración

### Base de datos

El proyecto usa PostgreSQL. Puedes configurar la conexión modificando `DATABASE_URL` en el archivo `.env`.

### Variables de entorno disponibles

| Variable | Descripción | Valores | Default |
|----------|-------------|---------|---------|
| `DATABASE_URL` | URL de conexión a PostgreSQL | string | - |
| `PORT` | Puerto del servidor | number | 3000 |
| `NODE_ENV` | Entorno de ejecución | development/production/test | development |
| `SHOW_PRISMA_QUERIES` | Mostrar queries de Prisma en consola | true/false | false |
| `SHOW_LOGS` | Mostrar logs de Winston | true/false | true |
| `SHOW_TEST_LOGS` | Mostrar logs durante tests | true/false | false |

## 🏃 Ejecución

### Desarrollo

```bash
# Iniciar servidor en modo desarrollo
npm run dev
```

El servidor estará disponible en `http://localhost:3000`

### Producción

```bash
# Compilar TypeScript
npm run build

# Iniciar servidor de producción
npm start
```

### Testing

```bash
# Ejecutar tests en modo watch
npm run test

# Ejecutar tests una vez
npm run test:run

# Ejecutar tests con UI
npm run test:ui

# Generar coverage
npm run test:coverage
```

## 📁 Estructura del Proyecto

```
backend-bcp/
├── prisma/
│   ├── schema.prisma          # Definición del schema de base de datos
│   └── migrations/            # Migraciones de base de datos
├── src/
│   ├── config/
│   │   ├── database.ts        # Configuración de Prisma Client
│   │   └── swagger.ts         # Configuración de Swagger/OpenAPI
│   ├── controllers/
│   │   ├── user.controller.ts
│   │   └── company.controller.ts
│   ├── middlewares/
│   │   └── validate.middleware.ts  # Middleware de validación Zod
│   ├── routes/
│   │   └── v1/
│   │       ├── index.ts
│   │       ├── users.routes.ts
│   │       └── companies.routes.ts
│   ├── schemas/
│   │   ├── user.schema.ts     # Schemas Zod para Users
│   │   └── company.schema.ts  # Schemas Zod para Companies
│   ├── services/
│   │   ├── user.service.ts
│   │   └── company.service.ts
│   ├── utils/
│   │   └── logger.ts          # Configuración de Winston
│   └── index.ts               # Punto de entrada de la aplicación
├── test/
│   ├── integration/
│   │   ├── users.test.ts
│   │   └── companies.test.ts
│   └── setup.ts               # Configuración de tests
├── .dockerignore
├── .env                       # Variables de entorno (no incluido en git)
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── package.json
├── tsconfig.json
└── vitest.config.ts
```

## 🌐 API Endpoints

### Users

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/v1/users` | Obtener todos los usuarios |
| GET | `/api/v1/users/:id` | Obtener usuario por ID |
| POST | `/api/v1/users` | Crear nuevo usuario |
| PUT | `/api/v1/users/:id` | Actualizar usuario |
| DELETE | `/api/v1/users/:id` | Eliminar usuario (soft delete) |

### Companies

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/v1/companies` | Obtener todas las empresas |
| GET | `/api/v1/companies/:id` | Obtener empresa por ID |
| POST | `/api/v1/companies` | Crear nueva empresa |
| PUT | `/api/v1/companies/:id` | Actualizar empresa |
| DELETE | `/api/v1/companies/:id` | Eliminar empresa (soft delete) |

### Formato de respuesta

#### Éxito
```json
{
  "success": true,
  "data": { ... },
  "count": 10
}
```

#### Error
```json
{
  "success": false,
  "error": "Mensaje de error"
}
```

#### Error de validación
```json
{
  "success": false,
  "error": "Datos de entrada inválidos",
  "details": [
    {
      "field": "email",
      "message": "Email inválido"
    }
  ]
}
```

## 📚 Documentación

La documentación completa de la API está disponible mediante **Swagger UI**.

### Acceder a Swagger

1. Iniciar el servidor: `npm run dev`
2. Abrir en el navegador: [`http://localhost:3000/api-docs`](http://localhost:3000/api-docs)

### Características de Swagger

- ✅ Documentación interactiva generada automáticamente desde schemas Zod
- ✅ Prueba de endpoints directamente desde el navegador
- ✅ Schemas completos con validaciones y ejemplos
- ✅ Códigos de respuesta HTTP documentados
- ✅ Sincronización automática con el código

## 🧪 Testing

El proyecto incluye tests de integración que validan el funcionamiento completo de la API.

### Ejecutar tests

```bash
# Modo watch (recomendado para desarrollo)
npm run test

# Ejecutar una vez
npm run test:run

# Con interfaz visual
npm run test:ui

# Con coverage
npm run test:coverage
```

### Cobertura de tests

- ✅ Tests de integración para todos los endpoints
- ✅ Validación de responses HTTP
- ✅ Pruebas de validación de datos
- ✅ Tests de soft deletes
- ✅ Manejo de errores 404 y 400

### Ejemplo de test

```typescript
it('debería crear un usuario', async () => {
  const newUser = {
    email: 'test@example.com',
    password: 'password123',
    username: 'testuser'
  };

  const response = await request(app)
    .post('/api/v1/users')
    .send(newUser)
    .expect(201);

  expect(response.body.success).toBe(true);
  expect(response.body.data.email).toBe(newUser.email);
});
```

## 🎯 Buenas Prácticas

### Arquitectura

- ✅ **Separación de responsabilidades**: Controllers → Services → Prisma
- ✅ **Versionado de API**: `/api/v1`, `/api/v2`
- ✅ **Validación centralizada**: Middleware Zod
- ✅ **Documentación como código**: Generada desde schemas Zod

### TypeScript

- ✅ **Strict mode** activado
- ✅ **Tipos inferidos** de Zod y Prisma
- ✅ **Sin `any`**: Uso de tipos específicos
- ✅ **ES Modules**: `nodenext` module resolution

### Base de datos

- ✅ **Migraciones versionadas** con Prisma
- ✅ **Soft deletes**: No se eliminan físicamente los registros
- ✅ **Índices optimizados**: En campos frecuentemente consultados
- ✅ **Timestamps automáticos**: `createdAt`, `updatedAt`

### Validación

- ✅ **Validación en runtime** con Zod
- ✅ **Mensajes de error claros** en español
- ✅ **Validación de parámetros** de URL
- ✅ **Validación de body** en POST/PUT

### Logging

- ✅ **Niveles de log**: debug, info, warn, error
- ✅ **Logging contextual**: Diferentes niveles por entorno
- ✅ **Logs estructurados**: Formato consistente
- ✅ **Sin logs en tests**: Para output limpio

### Testing

- ✅ **Tests secuenciales**: Evita race conditions
- ✅ **Cleanup automático**: Limpieza de DB entre tests
- ✅ **Tests aislados**: Cada test es independiente
- ✅ **Ambiente de test**: Variable `NODE_ENV=test`

## 🐳 Docker

### Desarrollo con Docker

```bash
# Iniciar servicios (PostgreSQL + Backend)
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener servicios
docker-compose down

# Detener y eliminar volúmenes
docker-compose down -v
```

### Servicios disponibles

| Servicio | Puerto | Descripción |
|----------|--------|-------------|
| backend | 3000 | API REST |
| postgres | 5433 | PostgreSQL 18 |

### Ejecutar comandos en el contenedor

```bash
# Migraciones
docker-compose exec backend npx prisma migrate dev

# Generar cliente Prisma
docker-compose exec backend npx prisma generate

# Ver logs de Prisma
docker-compose exec backend npx prisma studio
```

## 📝 Scripts disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Inicia el servidor en modo desarrollo |
| `npm run build` | Compila TypeScript a JavaScript |
| `npm start` | Inicia el servidor de producción |
| `npm run test` | Ejecuta tests en modo watch |
| `npm run test:run` | Ejecuta tests una vez |
| `npm run test:ui` | Ejecuta tests con interfaz visual |
| `npm run test:coverage` | Genera reporte de cobertura |

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add: AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👤 Autor

**Sergio Olivo**

- Email: olivosergio09@gmail.com
- Website: [sergiolivo.com](https://sergiolivo.com)
- GitHub: [@sergiolivo](https://github.com/sergiolivo)

---

⭐️ Si este proyecto te fue útil, considera darle una estrella en GitHub

# BitCommerce
