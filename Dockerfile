#Usa Node.js  version LTS
FROM node:22-alpine

#Establecer el directorio de trabajo
WORKDIR /app

#Copia los archivos de dependencias
COPY package*.json ./
COPY prisma ./prisma/

#Instalar las dependencias
RUN npm ci

#Copia el resto de los archivos
COPY . .

#Genera el cliente de Prisma
RUN npx prisma generate

#exponer el puerto 3000
EXPOSE 3000

#Comando para ejecutar la aplicación
CMD ["npm", "run", "dev"]