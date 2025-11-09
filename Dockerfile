# proyecto-frontend/Dockerfile
FROM nginx:stable-alpine AS base
WORKDIR /usr/share/nginx/html
# Copiamos los archivos estáticos
COPY . .
# Si usás ARG API_BASE para generar config:
# ARG API_BASE=http://127.0.0.1:8000/api  ← COMENTAR
# Escribimos un pequeño archivo JS de configuración si lo necesitás
# RUN echo "window.API_BASE = '${API_BASE}';" > /usr/share/nginx/html/config.js  ← COMENTAR
# Opcional: custom nginx conf (caching, headers) si lo tenés
# COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
