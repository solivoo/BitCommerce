# Guía de Contribución

¡Gracias por tu interés en contribuir a Backend BCP! 🎉

## 📋 Tabla de Contenidos

- [Código de Conducta](#código-de-conducta)
- [Cómo Contribuir](#cómo-contribuir)
- [Configuración del Entorno](#configuración-del-entorno)
- [Estándares de Código](#estándares-de-código)
- [Proceso de Pull Request](#proceso-de-pull-request)
- [Reportar Bugs](#reportar-bugs)
- [Solicitar Features](#solicitar-features)

## 📜 Código de Conducta

Este proyecto se adhiere a un código de conducta. Al participar, se espera que mantengas este código. Por favor, reporta comportamientos inaceptables.

## 🤝 Cómo Contribuir

1. **Fork el repositorio**
2. **Clona tu fork**
   ```bash
   git clone https://github.com/tu-usuario/backend-bcp.git
   cd backend-bcp
   ```

3. **Crea una rama**
   ```bash
   git checkout -b feature/nombre-descriptivo
   ```

4. **Haz tus cambios**
   - Sigue los estándares de código
   - Agrega tests si es necesario
   - Actualiza la documentación

5. **Commit tus cambios**
   ```bash
   git commit -m "Add: descripción clara del cambio"
   ```

6. **Push a tu fork**
   ```bash
   git push origin feature/nombre-descriptivo
   ```

7. **Crea un Pull Request**

## 🛠 Configuración del Entorno

### Requisitos

- Node.js >= 18.x
- PostgreSQL >= 14.x
- Docker (opcional)

### Setup

```bash
# Instalar dependencias
npm install

# Configurar .env
cp .env.example .env

# Ejecutar migraciones
npx prisma migrate dev

# Iniciar en desarrollo
npm run dev

# Ejecutar tests
npm run test
```

## 📝 Estándares de Código

### TypeScript

- ✅ Usar TypeScript estricto (`strict: true`)
- ✅ Evitar `any`, preferir tipos específicos o `unknown`
- ✅ Exportaciones nombradas (no `default export`)
- ✅ Máximo 200 líneas por archivo
- ✅ Single Responsibility Principle

### Estructura

```typescript
// ✅ Correcto
export const createUser = async (data: CreateUserInput): Promise<User> => {
  // ...
}

// ❌ Incorrecto
export default function (data: any) {
  // ...
}
```

### Nomenclatura

- **Archivos**: `kebab-case.ts` (ej: `user.service.ts`)
- **Variables/Funciones**: `camelCase` (ej: `createUser`)
- **Tipos/Interfaces**: `PascalCase` (ej: `CreateUserInput`)
- **Constantes**: `UPPER_SNAKE_CASE` (ej: `MAX_RETRIES`)

### Organización

```
src/
  ├── config/       # Configuraciones
  ├── controllers/  # Manejo de requests HTTP
  ├── services/     # Lógica de negocio
  ├── routes/       # Definición de rutas
  ├── schemas/      # Validación con Zod
  ├── middlewares/  # Middlewares de Express
  └── utils/        # Funciones utilitarias
```

### Validación

Todos los endpoints deben validar datos usando Zod:

```typescript
// schemas/user.schema.ts
export const createUserSchema = z.object({
  email: z.string().email().openapi({ example: 'user@example.com' }),
  password: z.string().min(6)
}).openapi('CreateUserInput');

// routes/users.routes.ts
router.post('/', validateBody(createUserSchema), controller.create);
```

### Logging

Usar Winston para logging, NO `console.log`:

```typescript
// ✅ Correcto
import { logger } from '../utils/logger.js';
logger.info('Usuario creado exitosamente');
logger.error('Error al crear usuario', error);

// ❌ Incorrecto
console.log('Usuario creado');
```

### Testing

- Todo nuevo feature debe incluir tests
- Tests de integración para endpoints
- Coverage mínimo: 70%

```typescript
describe('Users API', () => {
  it('debería crear un usuario', async () => {
    const response = await request(app)
      .post('/api/v1/users')
      .send({ email: 'test@example.com', password: 'password123' })
      .expect(201);

    expect(response.body.success).toBe(true);
  });
});
```

### Commits

Seguir **Conventional Commits**:

- `feat: ` - Nueva funcionalidad
- `fix: ` - Corrección de bug
- `docs: ` - Cambios en documentación
- `style: ` - Formato, punto y coma faltante, etc
- `refactor: ` - Refactorización de código
- `test: ` - Agregar tests
- `chore: ` - Actualizar dependencias, configs, etc

**Ejemplos:**
```bash
git commit -m "feat: agregar endpoint para actualizar perfil de usuario"
git commit -m "fix: corregir validación de email en registro"
git commit -m "docs: actualizar README con nuevos endpoints"
git commit -m "test: agregar tests para companies API"
```

## 🔄 Proceso de Pull Request

1. **Actualiza tu rama** con `main`
   ```bash
   git checkout main
   git pull upstream main
   git checkout feature/tu-rama
   git rebase main
   ```

2. **Asegúrate que todo funciona**
   ```bash
   npm run test
   npm run build
   ```

3. **Descripción clara del PR**
   - ¿Qué cambia?
   - ¿Por qué es necesario?
   - ¿Cómo se prueba?

4. **Checklist del PR**
   - [ ] Tests pasan (`npm run test`)
   - [ ] Build exitoso (`npm run build`)
   - [ ] Sin errores de linter
   - [ ] Documentación actualizada
   - [ ] Commits descriptivos
   - [ ] Schemas Zod actualizados
   - [ ] Swagger actualizado automáticamente

## 🐛 Reportar Bugs

Usa las **GitHub Issues** con el template:

### Título
`[BUG] Descripción breve del problema`

### Descripción
```
**Comportamiento actual:**
Descripción de lo que sucede

**Comportamiento esperado:**
Descripción de lo que debería suceder

**Pasos para reproducir:**
1. ...
2. ...
3. ...

**Entorno:**
- OS: Windows/Mac/Linux
- Node: v18.x
- PostgreSQL: v14.x

**Logs/Screenshots:**
(si aplica)
```

## 💡 Solicitar Features

Usa las **GitHub Issues** con el template:

### Título
`[FEATURE] Descripción del feature`

### Descripción
```
**Problema/Necesidad:**
¿Qué problema resuelve este feature?

**Solución propuesta:**
¿Cómo funcionaría?

**Alternativas consideradas:**
¿Hay otras formas de resolverlo?

**Impacto:**
¿Qué partes del sistema afecta?
```

## ✅ Checklist antes de Contribuir

- [ ] Leí la guía de contribución
- [ ] Mi código sigue los estándares del proyecto
- [ ] Agregué tests para mi código
- [ ] Todos los tests pasan
- [ ] Actualicé la documentación
- [ ] Mi PR tiene una descripción clara
- [ ] Los commits siguen Conventional Commits

## 📞 Contacto

Si tienes preguntas:
- **Email:** olivosergio09@gmail.com
- **GitHub Issues:** Para discusiones técnicas

---

¡Gracias por contribuir! 🎉

