# Firebase CRUD API

API REST en TypeScript con Express, Prisma y PostgreSQL. Pensada para operaciones CRUD con autenticación vía Firebase Admin.

## Requisitos

- Node.js 22+
- pnpm 11+
- Docker y Docker Compose (para PostgreSQL)

## Instalación

```bash
pnpm install
```

## Configuración

Copia el archivo de plantilla y ajusta los valores:

```bash
cp .env.template .env
```

Variables de entorno:

| Variable | Descripción |
|----------|-------------|
| `PORT` | Puerto del servidor Express |
| `POSTGRES_USER` | Usuario de PostgreSQL |
| `POSTGRES_PASSWORD` | Contraseña de PostgreSQL |
| `POSTGRES_DB` | Nombre de la base de datos |
| `POSTGRES_PORT` | Puerto expuesto de PostgreSQL |
| `DATABASE_URL` | URL de conexión para Prisma |

## Base de datos

Levanta PostgreSQL con Docker:

```bash
docker compose up -d
```

Ejecuta las migraciones de Prisma:

```bash
pnpm prisma:generate
pnpm prisma:migrate
```

## Scripts

| Comando | Descripción |
|---------|-------------|
| `pnpm dev` | Servidor en modo desarrollo con recarga automática |
| `pnpm build` | Compila TypeScript a `dist/` |
| `pnpm start` | Ejecuta la versión compilada |
| `pnpm prisma:generate` | Genera el cliente de Prisma |
| `pnpm prisma:migrate` | Aplica migraciones en desarrollo |
| `pnpm prisma:studio` | Abre Prisma Studio |

## Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/health` | Verifica que el servidor esté activo |

## Estructura del proyecto

```
src/
  config/
    env.ts      # Variables de entorno
  main.ts       # Punto de entrada de Express
```

## Autor

Iram Alvarez Rocha
