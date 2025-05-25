
# 1. Usa una imagen base con Node
FROM node:18-alpine

# 2. Crea un directorio de trabajo
WORKDIR /app

# 3. Copia package.json y lock
COPY package.json package-lock.json* ./

# 4. Instala TODAS las dependencias (incluye devDependencies)
RUN npm install

# 5. Copia el resto del código
COPY . .

# 6. Compila la app
RUN npm run build

# 7. Expone el puerto
EXPOSE 3000

# 8. Comando para producción
CMD ["npm", "start"]
