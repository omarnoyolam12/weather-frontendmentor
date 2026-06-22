// src/data/dtos/weather.dto.ts
import { z } from 'zod';

export const WeatherResponseSchema = z.object({
    latitude: z.number(),
    longitude: z.number(),
    generationtime_ms: z.number(),
    utc_offset_seconds: z.number(),
    timezone: z.string(),
    timezone_abbreviation: z.string(),
    elevation: z.number(),

    // Validamos los metadatos de las unidades
    current_units: z.object({
        time: z.string(),
        interval: z.string(),
        temperature_2m: z.string(),
        relative_humidity_2m: z.string(),
        apparent_temperature: z.string(),
        precipitation: z.string(),
        wind_speed_10m: z.string(),
        weather_code: z.string(),
    }),

    // 1. SECCIÓN ACTUAL: Clima de hoy y tus 4 tarjetas de métricas
    current: z.object({
        time: z.string(),
        interval: z.number(),
        temperature_2m: z.number(),       // Tu 73.0°F principal
        relative_humidity_2m: z.number(),  // Tarjeta: 49%
        apparent_temperature: z.number(),  // Tarjeta: Feels Like 74.9°F
        precipitation: z.number(),         // Tarjeta: Precipitation 0.004 in
        wind_speed_10m: z.number(),        // Tarjeta: Wind 3.7 mp/h
        weather_code: z.number(),          // Código WMO (en este caso 51 = Llovizna ligera)
    }),

    hourly_units: z.object({
        time: z.string(),
        temperature_2m: z.string(),
        weather_code: z.string(),
    }),

    // 2. SECCIÓN HOURLY: Los listados en paralelo para la barra de la derecha
    hourly: z.object({
        time: z.array(z.string()),           // Array de timestamps string ("2026-06-04T00:00")
        temperature_2m: z.array(z.number()), // Array de temperaturas por hora
        weather_code: z.array(z.number()),   // Array de códigos de clima por hora
    }),

    daily_units: z.object({
        time: z.string(),
        weather_code: z.string(),
        temperature_2m_max: z.string(),
        temperature_2m_min: z.string(),
    }),

    // 3. SECCIÓN DAILY: Las 7 tarjetas de la semana ubicadas abajo
    daily: z.object({
        time: z.array(z.string()),               // Array de fechas ("2026-06-04")
        weather_code: z.array(z.number()),       // Códigos de clima diarios
        temperature_2m_max: z.array(z.number()), // Máximas de cada día (ej: 73.3)
        temperature_2m_min: z.array(z.number()), // Mínimas de cada día (ej: 57.0)
    }),
});

// Extraemos el tipo estático para usarlo en el Repositorio e implementar el Mapper
export type WeatherDTO = z.infer<typeof WeatherResponseSchema>;