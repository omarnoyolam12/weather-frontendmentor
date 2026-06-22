# Weather App

Aplicación de clima responsiva construida como solución al reto de [Frontend Mentor](https://www.frontendmentor.io), consumiendo la [API de Open-Meteo](https://open-meteo.com/) para mostrar pronósticos en tiempo real con una interfaz oscura y pulida.

---

## Vista general

La app permite buscar cualquier ciudad del mundo y ver al instante las condiciones actuales, un panel horario y el pronóstico de 7 días, todo intercambiable entre unidades métricas e imperiales.

### Funcionalidades

- **Búsqueda de ciudades** con autocompletado en tiempo real vía la API de Geocodificación y entrada con debounce
- **Clima actual** — temperatura, sensación térmica, humedad, velocidad del viento y precipitación
- **Pronóstico por hora** — panel desplazable con temperatura e ícono por hora, filtrable por día
- **Pronóstico de 7 días** — tarjetas con máximas, mínimas e ícono del estado del clima
- **Toggle de unidades** — cambio entre °C / °F, km/h / mph y mm / in en cualquier momento
- **Skeleton de carga** — layout de marcadores mientras se obtienen los datos
- **Totalmente responsiva** — diseño mobile-first que se adapta a escritorio con una grilla de 3 columnas
- **Accesible** — búsqueda construida con el `Combobox` de Headless UI para soporte completo de teclado y lectores de pantalla

---

## Stack tecnológico

| Capa | Tecnología |
|---|---|
| Framework | React 19 |
| Lenguaje | TypeScript 6 |
| Estilos | Tailwind CSS v4 |
| Build tool | Vite 8 |
| Fetching de datos | TanStack Query v5 |
| Cliente HTTP | Axios |
| Validación de esquemas | Zod v4 |
| Primitivos de UI | Headless UI v2 |
| Rendimiento | React Compiler (Babel) + `use-debounce` |
| Gestor de paquetes | pnpm |

---

## Arquitectura

El proyecto sigue una **arquitectura por capas orientada al dominio**, manteniendo cada responsabilidad aislada:

```
src/
├── domain/
│   ├── entities/       # Formas de datos centrales (WeatherEntity, LocationEntity)
│   └── dtos/           # Esquemas de respuesta de la API validados con Zod
├── infrastructure/
│   ├── actions/        # Llamadas con Axios — una función por endpoint
│   └── mappers/        # Transformación de DTO → Entity
└── presentation/
    ├── components/     # UI — primitivos compartidos + componentes específicos del clima
    ├── hooks/          # useWeather, useLocation — wrappers de TanStack Query
    ├── interfaces/     # Tipos TypeScript compartidos para la capa de UI
    └── utils/          # Helpers de formateo de fechas
```

**Flujo de datos:** `API → DTO (validado con Zod) → Mapper → Entity → Hook → Componente`

Esta separación garantiza que la UI nunca conozca la estructura de la API, y que los cambios en la API solo requieran actualizar el esquema DTO y el mapper.

---

## APIs utilizadas

| API | Propósito |
|---|---|
| [Open-Meteo Forecast](https://open-meteo.com/en/docs) | Clima actual, pronóstico horario y diario |
| [Open-Meteo Geocoding](https://open-meteo.com/en/docs/geocoding-api) | Búsqueda de ciudades por nombre |

Ambas APIs son **gratuitas y no requieren API key**.

---

## Cómo ejecutarlo

```bash
# Instalar dependencias
pnpm install

# Crear el archivo de variables de entorno
cp .env.example .env

# Iniciar el servidor de desarrollo
pnpm dev
```

### Variables de entorno

```env
VITE_URL_WEATHER=https://api.open-meteo.com/v1/forecast
VITE_URL_LOCATION=https://geocoding-api.open-meteo.com/v1/search
```

---

## Decisiones técnicas destacadas

**Caché con TanStack Query** — las respuestas del clima se almacenan en caché por 10 minutos (`staleTime`) y se mantienen en memoria por 30 minutos (`gcTime`), por lo que cambiar entre ciudades buscadas recientemente es instantáneo.

**Validación con Zod en el boundary** — cada respuesta de la API se parsea con un esquema Zod antes de llegar al mapper. Si la estructura cambia, la app lanza un error tipado en lugar de romper silenciosamente la UI.

**React Compiler** — habilitado vía el plugin de Babel, memoiza componentes automáticamente y elimina la necesidad de `useMemo` / `useCallback` manuales en todo el código.

**Búsqueda con debounce** — la consulta de geolocalización se dispara solo después de que el usuario deja de escribir (300 ms), evitando peticiones innecesarias en cada tecla.

---

## Origen del reto

Este proyecto es una solución al reto **Weather App** de [Frontend Mentor](https://www.frontendmentor.io). El diseño original y los criterios de aceptación están en [`INSTRUCTIONS.md`](./INSTRUCTIONS.md).
