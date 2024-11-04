# Usa una imagen base de Node.js
FROM node:18

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos del backend (Node.js)
COPY package*.json ./
COPY . .

# Instala las dependencias para el servidor Node.js
RUN npm install

# Instala Angular CLI de forma global
RUN npm install -g @angular/cli

# Instala las dependencias de Angular
WORKDIR /app/client
RUN npm install

# Vuelve al directorio del servidor
WORKDIR /app

# Expone los puertos necesarios
EXPOSE 3000 4200

# Comando para ejecutar ambos procesos
CMD ["sh", "-c", "npm run serve & cd client && ng serve --host 0.0.0.0"]
