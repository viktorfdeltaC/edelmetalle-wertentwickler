# --- Build-Stage: Vite-Build ---
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

# Build-Zeit-Konfiguration. Default = Live; für Staging auf Coolify als Build-Arg
# überschreiben (z. B. VITE_EM_API_BASE=https://dev.wertentwickler.de/api/em).
ARG VITE_EM_API_BASE=https://app.wertentwickler.de/api/em
ARG VITE_EM_REGISTER_URL=https://app.wertentwickler.de/edelmetalle/register
ARG VITE_EM_LOGIN_URL=https://app.wertentwickler.de/edelmetalle/login
ENV VITE_EM_API_BASE=$VITE_EM_API_BASE
ENV VITE_EM_REGISTER_URL=$VITE_EM_REGISTER_URL
ENV VITE_EM_LOGIN_URL=$VITE_EM_LOGIN_URL
RUN npm run build

# --- Runtime-Stage: schlanker Node-Server ---
FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=build /app/dist ./dist
COPY server.js ./
COPY api ./api
EXPOSE 3000
CMD ["node", "server.js"]
