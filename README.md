<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://upload.wikimedia.org/wikipedia/commons/3/37/NestJS-logo-wordmark.svg" width="120" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo

> ⚠️ Este proyecto usa **pnpm** como gestor de paquetes (es un monorepo con `pnpm-workspace.yaml`). Usa `pnpm install` para las dependencias del proyecto; no uses `npm install` ni `yarn install` para evitar conflictos con el `pnpm-lock.yaml`.

1. Clonar el repositorio

2. Instalar las dependencias

```bash
pnpm install
```

3. Tener Nest CLI instalado globalmente

```bash
npm i -g @nestjs/cli
```

> 💡 Se recomienda usar **npm** para instalar el CLI de forma global. Con `pnpm add -g @nestjs/cli` pueden surgir errores porque pnpm bloquea por defecto los scripts de instalación (`postinstall`) de las dependencias. Si prefieres usar pnpm, primero debes aprobarlos manualmente con `pnpm approve-builds`.

4. Levantar la base de datos

```bash
docker-compose up -d
```

5. Levantar el proyecto en modo desarrollo

```bash
pnpm run start:dev
```
## Stack implementado
* MongoDB
* Nest