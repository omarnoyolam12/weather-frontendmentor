// src/data/dtos/location.dto.ts
import { z } from 'zod';

// 1. Primero definimos el esquema para un solo objeto de ubicación (un resultado)
export const LocationItemSchema = z.object({
    id: z.number(),
    name: z.string(),                  // Nombre del municipio/localidad (ej. Coacalco)
    latitude: z.number(),              // Coordenada clave para la API del clima
    longitude: z.number(),             // Coordenada clave para la API del clima
    elevation: z.number(),
    feature_code: z.string(),
    country_code: z.string(),          // Código de país (ej. MX)
    admin1_id: z.number().optional(),
    admin2_id: z.number().optional(),
    timezone: z.string(),
    population: z.number().optional(), // Algunos lugares pequeños no tienen registro de población
    country_id: z.number(),
    country: z.string(),               // Nombre del país (ej. México)
    admin1: z.string().optional(),     // Estado/Provincia (ej. Estado de México)
    admin2: z.string().optional(),     // Municipio/Alcaldía (ej. Coacalco de Berriozábal)
});

// 2. Definimos el esquema de la respuesta global de la API
export const LocationResponseSchema = z.object({
    // Hacemos que results sea opcional. Si la API no encuentra nada, 
    // le decimos a Zod que por defecto nos devuelva un array vacío []
    results: z.array(LocationItemSchema).optional().default([]),
    generationtime_ms: z.number(),
});

// 3. Extraemos los tipos estáticos para TypeScript
export type LocationItemDTO = z.infer<typeof LocationItemSchema>;
export type LocationDTO = z.infer<typeof LocationResponseSchema>;