# Usa una imagen base de Node.js
FROM node:18

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos de configuración del servidor Node.js
COPY package*.json ./

# Instala las dependencias para el servidor Node.js
RUN npm install

# Instala Angular CLI de forma global
RUN npm install -g @angular/cli

# Cambia al directorio del cliente para instalar dependencias de Angular
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install

# Vuelve al directorio del servidor y copia el resto de los archivos del proyecto
WORKDIR /app
COPY . .

# Instala 'concurrently' para ejecutar el servidor Node.js y Angular juntos
RUN npm install concurrently --save

# Expone los puertos necesarios
EXPOSE 3000 4200

# Comando para ejecutar ambos procesos
CMD ["npx", "concurrently", "\"node server.js\"", "\"cd client && ng serve --host 0.0.0.0\""]
