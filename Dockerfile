# Etapa 1: Build
FROM node:18-alpine AS builder

# Usamos /src como directorio de trabajo
WORKDIR /src

# Copiamos los archivos de configuración e instalamos todas las dependencias (producción y desarrollo)
COPY package*.json ./
RUN npm install

# Copiamos el código fuente y compilamos el proyecto
COPY . .
RUN npm run build

# Etapa 2: Imagen de producción
FROM node:18-alpine

WORKDIR /src

# Copiamos los archivos necesarios para producción
COPY package*.json ./
RUN npm install --only=production

# Copiamos los archivos compilados desde la etapa de build
COPY --from=builder /src/dist ./dist

# Exponemos el puerto que utiliza la aplicación (ajusta según sea necesario)
EXPOSE 3000

# Ejecutamos la aplicación
CMD ["npm", "start"]