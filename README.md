# Weather App

Aplicación web de consulta de clima desarrollada con React y Laravel.

Permite consultar el clima de una ciudad, visualizar temperatura y humedad, y gestionar comentarios mediante autenticación.

## Tecnologías

### Frontend
- React
- TypeScript
- Vite
- CSS

### Backend
- PHP
- Laravel
- Laravel Sanctum
- Laravel Breeze
- SQLite
- OpenWeatherMap

## Funcionalidades

- Consulta del clima por ciudad.
- Temperatura en °C y °F.
- Humedad y condición meteorológica.
- Indicadores visuales según la condición climática.
- Ciudades de acceso rápido.
- Estados de carga y manejo de errores.
- Registro e inicio de sesión.
- Creación y eliminación de comentarios.
- Los usuarios solo pueden eliminar sus propios comentarios.
- Diseño responsive para dispositivos móviles y escritorio.

## Estructura del proyecto

### Frontend

```text
frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── AuthForm.tsx
│   │   ├── CitySearch.tsx
│   │   ├── CommentSection.tsx
│   │   └── WeatherCard.tsx
│   ├── services/
│   │   ├── authService.ts
│   │   ├── commentService.ts
│   │   └── weatherService.ts
│   ├── App.tsx
│   └── main.tsx
└── package.json

backend/
├── app/
│   ├── Http/
│   │   └── Controllers/
│   │       └── Api/
│   │           ├── ComentarioController.php
│   │           └── WeatherController.php
│   ├── Models/
│   │   ├── Clima.php
│   │   └── Comentario.php
│   └── Services/
│       └── WeatherService.php
├── database/
│   └── migrations/
├── routes/
│   └── api.php
└── composer.json

###API
###Clima
GET /api/weather?city={ciudad}

Consulta el clima de una ciudad utilizando la API de OpenWeatherMap.

La consulta devuelve información como:

Ciudad
Temperatura en °C
Humedad
Condición climática
Temperatura en °F

###Comentarios

GET /api/comentarios?clima_id={id}

Obtiene los comentarios asociados a una consulta de clima.

POST /api/comentarios

Crea un nuevo comentario. Requiere autenticación.

DELETE /api/comentarios/{id}

Elimina un comentario. Solo el usuario propietario puede eliminarlo.

### Autenticación
POST /register
POST /login
POST /logout
GET /api/user

La autenticación utiliza Laravel Breeze y Laravel Sanctum.

Las operaciones de creación y eliminación de comentarios requieren que el usuario esté autenticado.

### Requisitos previos

Antes de ejecutar el proyecto se necesita tener instalado:

- PHP 8.3 o superior
- Composer
- Node.js
- npm
- Una API Key de OpenWeatherMap

### Instalación
1. Clonar el repositorio
git clone <URL_DEL_REPOSITORIO>
cd weather-app
2. Configurar el backend
cd backend
composer install

Crear el archivo .env a partir de .env.example y configurar las variables necesarias.

Agregar la API Key de OpenWeatherMap:

OPENWEATHER_API_KEY=tu_api_key

También configurar la URL del frontend:

FRONTEND_URL=http://localhost:5173

Generar la clave de Laravel:

php artisan key:generate

### Ejecutar las migraciones:

php artisan migrate

Iniciar el servidor:

php artisan serve

El backend estará disponible en:

http://localhost:8000

3. Configurar el frontend

En otra terminal:

cd frontend
npm install

Iniciar el servidor de desarrollo:

npm run dev

El frontend estará disponible en:

http://localhost:5173

### Decisiones técnicas
Se utilizó TypeScript para mejorar la definición de tipos y facilitar el mantenimiento del código.
La lógica de consumo de la API se separó en servicios (weatherService, commentService y authService) para evitar concentrar las peticiones HTTP dentro de los componentes.
Se utilizaron componentes reutilizables para separar responsabilidades entre búsqueda de ciudades, visualización del clima, autenticación y comentarios.
Se utilizaron useState y useEffect de React para manejar estados, formularios, carga de información y autenticación.
La consulta externa a OpenWeatherMap se centralizó en WeatherService dentro del backend.
Laravel Sanctum se utilizó para proteger las rutas que requieren autenticación.
Los comentarios están relacionados con el usuario autenticado para controlar quién puede eliminarlos.
SQLite se utilizó como base de datos para facilitar la configuración y ejecución del proyecto.
Validaciones y manejo de errores

El proyecto contempla diferentes estados de la aplicación:

Campo de ciudad vacío.
Ciudad no encontrada.
Error al consultar la API.
Estado de carga durante las consultas.
Validación del formulario de comentarios.
Errores de autenticación.
Restricción de eliminación de comentarios pertenecientes a otros usuarios.
Pruebas

Las pruebas automatizadas del backend fueron ejecutadas correctamente y cubren funcionalidades de autenticación y del backend.

Para ejecutar las pruebas:

cd backend
php artisan test
Estado del proyecto

La funcionalidad principal solicitada en la prueba técnica está implementada.

Como posibles mejoras futuras se podrían agregar:

Pruebas automatizadas para el frontend.
Caché de consultas de clima.
Edición de comentarios.
Mayor cobertura de validaciones y casos de error.