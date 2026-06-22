# 🌤️ Weather App - Clean Architecture & SOLID

Aplicación de clima construida en React + TypeScript aplicando los principios de **Clean Architecture** (Arquitectura Limpia) adaptados de forma pragmática al Frontend y guiada por los principios **SOLID**.

## 🚀 Objetivo del Proyecto
Mantener una separación estricta entre la **lógica de negocio pura** (independiente de frameworks) y la **capa de presentación** (React, Tailwind, etc.). Esto permite que la aplicación sea altamente testeable, escalable y tolerante a cambios en las APIs externas.

---

## 📂 Estructura de Carpetas

```text
src/
├── domain/                          # --- CAPA DE NEGOCIO PURA ---
│   └── entities/
│       ├── weather.entity.ts        # Modelos e interfaces de datos del dominio
│       └── location.entity.ts       # Interfaces de ubicación del dominio
│
├── data/                            # --- CAPA DE INFRAESTRUCTURA / DATOS ---
│   ├── dtos/
│   │   ├── weather.dto.ts           # Esquemas Zod + Tipos crudos de la API externa
│   │   └── location.dto.ts          # Esquemas Zod de la respuesta de ubicación
│   ├── mappers/
│   │   └── weather.mapper.ts        # Transformadores de datos: DTO -> Entity
│   ├── datasources/
│   │   └── weather.api.ts           # Configuración del cliente HTTP (Axios)
│   └── services/
│       └── weather.service.ts       # Servicio que conecta API con mappers
│
├── presentation/                    # --- CAPA DE INTERFAZ DE USUARIO (REACT) ---
│   ├── components/
│   │   ├── SearchBar.tsx            # Componentes atómicos y reutilizables
│   │   ├── CurrentWeather.tsx
│   │   └── ForecastCard.tsx
│   ├── hooks/
│   │   ├── useWeather.ts            # Custom Hook (Actúa como el Caso de Uso de la app)
│   │   └── useUnits.ts              # Control del estado global de unidades (°C / °F)
│   ├── context/
│   │   └── UnitsContext.tsx         # Proveedor del estado de unidades
│   └── pages/
│       └── WeatherPage.tsx          # Vista principal / Contenedor
│
├── config/
│   └── constants.ts                 # API Keys, URLs base y constantes globales
│
├── App.tsx
└── main.tsx
```

---

## 📌 Enfoque Pragmático: Servicios + TanStack Query

Para esta aplicación, hemos optado por un enfoque **simplificado pero estructurado**:

- **Servicios** (`src/data/services/`) — Encapsulan la lógica de llamadas HTTP + transformación de datos (DTOs → Entities)
- **TanStack Query** — Gestiona el estado, caching y sincronización de datos desde los hooks
- **Sin repositorios** — Evitamos la complejidad de interfaces e inyección de dependencias en una app pequeña

**Ejemplo:**

```typescript
// src/data/services/weather.service.ts
export const weatherService = {
  async getWeatherByLocation(location: string) {
    const dto = await weatherAPI.fetchWeather(location);
    return weatherMapper.toDomain(dto);
  }
};

// src/presentation/hooks/useWeather.ts
export const useWeather = (location: string) => {
  return useQuery({
    queryKey: ['weather', location],
    queryFn: () => weatherService.getWeatherByLocation(location)
  });
};
```

Así mantenemos **separación de capas** sin complejidad innecesaria.