# Weather App - Prueba Tecnica Tatoo
Jhomara Párraga

Aplicación web de consulta de clima desarrollada con React y Laravel.

Permite consultar el clima de una ciudad, visualizar temperatura y humedad, y gestionar comentarios mediante autenticación.

>>Tecnologías

- React
- TypeScript
- Vite
- CSS
- PHP
- Laravel
- Laravel Sanctum
- Laravel Breeze
- SQLite
- OpenWeatherMap

>>Funcionalidades

- Consulta del clima por ciudad.
- Temperatura en °C y °F.
- Humedad y condición meteorológica.
- Indicadores visuales según el clima.
- Ciudades de acceso rápido.
- Estados de carga y manejo de errores.
- Registro e inicio de sesión.
- Creación y eliminación de comentarios.
- Los usuarios solo pueden eliminar sus propios comentarios.
- Diseño responsive.

>>Estructura

***Frontend

Los componentes principales son:

- CitySearch
- WeatherCard
- CommentSection
- AuthForm

Las llamadas a la API están centralizadas en:

- weatherService.ts
- commentService.ts
- authService.ts

***Backend

- WeatherController
- WeatherService
- Comentario
- ComentarioController

La consulta a OpenWeatherMap se realiza mediante "WeatherService".

## Endpoints principales

>>>>text
GET    /api/weather?city={ciudad}
GET    /api/comentarios?clima_id={id}
POST   /api/comentarios
DELETE /api/comentarios/{id}

POST   /register
POST   /login
POST   /logout
GET    /api/user

------------------------
Las operaciones de comentarios requieren autenticación.
>> Instalación
BACKEND
cd backend
composer install
php artisan key:migrate
php artisan migrate
php artisan serve

Configurar previamente el archivo .env con la clave de OpenWeatherMap
Backend:    http://localhost:8000

FRONTEND
En otra terminal
cd frontend
npm install
npm run dev

Frontend:  http://localhost:5173
-------
Decisiones técnicas
* TypeScript para el tipado del frontend
* Servicios separados para las llamadas a la API
* Componentes reutilizables
* WeatherService para separar la integración con OpenWeatherMap del controlador
* Laravel Sanctum para las operaciones protegidas

---------
Estado
* La funcionalidad principal solicitada está implementada, con más tiempo se podrian agregar pruebas automtizadas, caché de consultas y edición de comentarios.