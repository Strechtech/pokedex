# Pokédex API - NestJS

<p align="center">
  <a href="http://nestjs.com/" target="blank">
    <img src="https://upload.wikimedia.org/wikipedia/commons/3/37/NestJS-logo-wordmark.svg" width="120" alt="Nest Logo" />
  </a>
</p>

API REST para gestionar Pokémon construida con **NestJS** y **MongoDB**.

---

## 🚀 Comenzar en desarrollo

### Requisitos previos

- **Node.js** v18+ instalado
- **Docker** instalado (para MongoDB)
- **pnpm** instalado (`npm i -g pnpm`)

> ⚠️ Este proyecto usa **pnpm** como gestor de paquetes. No uses `npm install` ni `yarn install` para evitar conflictos con `pnpm-lock.yaml`.

---

### Instalación

#### 1. Clonar el repositorio

```bash
git clone <repo-url>
cd pokedex
```

#### 2. Instalar dependencias

```bash
pnpm install
```

#### 3. Configurar variables de entorno

Copia el archivo `.env.template` y renómbralo a `.env`:

```bash
cp .env.template .env
```

Luego completa las variables en `.env`:

```env
MONGODB_URI=mongodb://localhost:27017/nest-pokemon
PORT=3001
```

#### 4. Instalar Nest CLI globalmente

```bash
npm i -g @nestjs/cli
```

> 💡 Se recomienda `npm` para el CLI global. Si usas `pnpm`, puede generar errores con `postinstall` scripts.

#### 5. Levantar MongoDB con Docker

```bash
docker-compose up -d
```

Verifica que el contenedor esté corriendo:

```bash
docker ps
```

#### 6. Ejecutar el servidor en modo desarrollo

```bash
pnpm run start:dev
```

Deberías ver:

```
[Nest] XXXX - LOG [NestApplication] Nest application successfully started
Application running on: http://localhost:3001
```

#### 7. Ejecutar el seed (opcional)

Una vez que el servidor esté corriendo, carga datos iniciales:

```bash
curl http://localhost:3001/api/v3/seed/
```

O accede desde el navegador: `http://localhost:3001/api/v3/seed/`

---

## 📚 Endpoints disponibles

| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/api/v3/pokemon` | Obtener todos los Pokémon |
| `GET` | `/api/v3/pokemon/:term` | Buscar Pokémon por nombre o ID |
| `POST` | `/api/v3/pokemon` | Crear un nuevo Pokémon |
| `PATCH` | `/api/v3/pokemon/:term` | Actualizar un Pokémon |
| `DELETE` | `/api/v3/pokemon/:term` | Eliminar un Pokémon |
| `GET` | `/api/v3/seed` | Ejecutar seed con datos iniciales |

---

## 🛠️ Stack implementado

- **Backend:** NestJS (Framework Node.js)
- **Base de datos:** MongoDB (con Mongoose)
- **Package Manager:** pnpm
- **Containerización:** Docker & Docker Compose
- **Desarrollo:** TypeScript, Hot Reload (`--watch`)

---

## 📝 Scripts disponibles

```bash
# Desarrollo con hot reload
pnpm run start:dev

# Modo producción
pnpm run start:prod

# Linting
pnpm run lint

# Tests
pnpm run test
```

---

## 🐛 Troubleshooting

### "MongoDB connection refused"

Verifica que Docker está corriendo:

```bash
docker-compose up -d
docker ps
```

### "Cannot find module '@nestjs/cli'"

Instala el CLI globalmente:

```bash
npm i -g @nestjs/cli
```

### "pnpm install conflicts"

Limpia node_modules y reinstala:

```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

---

## 📖 Recursos

- [NestJS Docs](https://docs.nestjs.com/)
- [MongoDB Mongoose](https://mongoosejs.com/)
- [pnpm Docs](https://pnpm.io/)