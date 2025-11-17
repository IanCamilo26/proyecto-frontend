# Frontend - Registro de Usuarios

Aplicación web frontend para el registro y visualización de usuarios, desarrollada con HTML, CSS y JavaScript.

## Requisitos Previos

- Navegador web moderno (Chrome, Firefox, Edge, Safari)
- Python 3.x (para servidor HTTP local)
- Backend API ejecutándose (ver README del backend)

## Instalación Local

### 1. Clonar el repositorio

```bash
cd proyecto-frontend
```

### 2. Configurar la URL de la API

Edita el archivo `js/config.js` y configura la URL base de la API:

```javascript
// js/config.js
window.API_BASE = "http://localhost:8000/api";
```

O si usas el archivo `js/main.js` directamente:

```javascript
const API_BASE = 'http://localhost:8000/api';
const USERS_ENDPOINT = `${API_BASE}/users/`;
```

## Ejecutar el Servidor

### Opción 1: Servidor HTTP de Python (Recomendado)

```bash
python -m http.server 5500
```

La aplicación estará disponible en: `http://localhost:5500`

### Opción 2: Servidor HTTP con Python 2

```bash
python -m SimpleHTTPServer 5500
```

### Opción 3: Abrir directamente en el navegador

Puedes abrir el archivo `index.html` directamente en tu navegador, pero esto puede causar problemas con CORS. Se recomienda usar un servidor local.

### Opción 4: Live Server (VS Code)

Si usas Visual Studio Code:

1. Instala la extensión "Live Server"
2. Click derecho en `index.html`
3. Selecciona "Open with Live Server"

## Funcionalidades

- Crear nuevos usuarios
- Listar usuarios registrados
- Validación de formularios
- Feedback visual al usuario
- Manejo de errores

## 📁 Estructura del Proyecto

```
proyecto-frontend/
├── index.html           # Página principal
├── css/
│   └── style.css       # Estilos de la aplicación
├── js/
│   ├── config.js       # Configuración (API URL)
│   └── main.js         # Lógica principal
├── Dockerfile
└── README.md
```

## Configuración

### Variables de Configuración

Edita `js/config.js` o `js/main.js`:

```javascript
// URL del backend API
const API_BASE = 'http://localhost:8000/api';

// O si usas API Gateway
const API_BASE = 'https://p5zd4xx8te.execute-api.us-east-1.amazonaws.com/prod/api';

// O si usas un dominio personalizado
const API_BASE = 'https://iancamilo-users-app.cloud-ip.cc/api';
```

## Construir Imagen Docker

### Dockerfile básico

```dockerfile
FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html
COPY . .
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Construir imagen

```bash
docker build -t proyecto-frontend:latest .
```

### Ejecutar contenedor

```bash
docker run -p 80:80 proyecto-frontend:latest
```

## Despliegue

### Nginx (Producción)

Archivo `nginx.conf`:

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://backend:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## Personalización

### Modificar estilos

Edita `css/style.css` para cambiar:
- Colores de la aplicación
- Fuentes
- Espaciado
- Responsive breakpoints

### Modificar comportamiento

Edita `js/main.js` para:
- Agregar validaciones adicionales
- Modificar mensajes de error
- Agregar nuevas funcionalidades
- Cambiar el manejo de eventos

## Pruebas Locales

### 1. Verificar Backend

Asegúrate de que el backend esté ejecutándose:

```bash
curl http://localhost:8000/api/users/
```

### 2. Probar Formulario

1. Abre `http://localhost:5500`
2. Completa el formulario de registro
3. Verifica que el usuario aparezca en la lista
4. Revisa la consola del navegador para debug

## Solución de Problemas

### Error de CORS

Si obtienes errores de CORS:

1. Verifica que el backend tenga configurado CORS correctamente
2. Asegúrate de estar usando un servidor HTTP local (no abrir archivo directo)
3. Verifica que la URL del frontend esté en `CORS_ALLOWED_ORIGINS` del backend

### No se cargan los usuarios

1. Abre DevTools (F12)
2. Ve a la pestaña "Network"
3. Verifica las peticiones HTTP
4. Revisa la consola por errores JavaScript

### Formulario no responde

1. Verifica la consola del navegador
2. Comprueba que el backend esté accesible
3. Revisa que las URLs en `config.js` sean correctas

## Consideraciones de Seguridad

- Validación de datos en frontend y backend
- Sanitización de inputs
- HTTPS en producción
- No almacenar datos sensibles en localStorage

## Recursos Adicionales

- [MDN Web Docs](https://developer.mozilla.org/)
- [JavaScript Info](https://javascript.info/)
- [CSS Tricks](https://css-tricks.com/)


## Ejemplo de Uso

```javascript
// Crear usuario
const newUser = {
    name: "María García",
    email: "maria@example.com",
    phone: "099876543"
};

fetch('http://localhost:8000/api/users/', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUser)
})
.then(response => response.json())
.then(data => console.log('Usuario creado:', data))
.catch(error => console.error('Error:', error));
```


## Autores

- Ian Camilo - Proyecto Final