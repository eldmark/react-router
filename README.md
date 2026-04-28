# Movie Blog

Nivel objetivo: Senior / 100

Aplicación de películas hecha con Vite, React y `react-router-dom` v6. Incluye listado, detalle, búsqueda, 404, favoritos con persistencia real, historial de películas vistas, historial de búsquedas y modo claro/oscuro.

## Requisitos

- Node.js 24 o superior recomendado.
- Una clave de OMDb API en un archivo `.env`.

## Variables de entorno

Crear un archivo `.env` en la raíz con:

```env
VITE_OMDB_API_KEY=tu_clave_aqui
```

## Scripts

```bash
npm run dev
npm run server
npm run build
```

## Cómo correr el proyecto

1. Instala dependencias.
2. Ejecuta el backend con `npm run server`.
3. Ejecuta el frontend con `npm run dev`.
4. Abre la URL que te muestra Vite.

## Rutas

- `/` Home con últimas búsquedas, películas recientes y acceso rápido.
- `/items` Buscador y listado de películas.
- `/items/:id` Detalle completo de una película.
- `*` Página 404.

## Persistencia real

El backend guarda datos en SQLite dentro de `server/data/movie-blog.sqlite`.

- Favoritos persistentes.
- Historial de búsquedas.
- Historial de películas vistas.

## Estado global y tema

- Favoritos con Context API.
- Historial de búsquedas y vistas sincronizado desde el backend.
- Modo claro/oscuro guardado en `localStorage`.

## Componentes reutilizables

- `Navbar`: navegación principal y toggle de tema.
- `SearchBar`: formulario reusable para búsquedas.
- `MovieCard`: tarjeta reusable para cada película.
- `RandomButton`: navegación a una película aleatoria.

## Video demo

Coloca el video de demostración en la carpeta `demo/` y asegúrate de mostrar las rutas `/`, `/items` y `/items/:id` funcionando.
