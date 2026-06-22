import axios from "axios";
import type { WeatherEntity } from "@/domain/entities/weather.entity";
import { WeatherResponseSchema, type WeatherDTO } from "@/domain/dtos/weather.dto";
import { weatherMapper } from '@/infrastructure/mappers/weather.mapper';

interface Params {
    lon: number;
    lat: number;
    temperature_unit: 'fahrenheit' | 'celsius';
    wind_speed_unit: 'mph' | 'kmh';
    precipitation_unit: 'inch' | 'mm'
}

export const getWeatherAction = async ({
    lat,
    lon,
    temperature_unit,
    wind_speed_unit,
    precipitation_unit
}: Params): Promise<WeatherEntity> => {

    try {

        const { data } = await axios.get<WeatherDTO>(import.meta.env.VITE_URL_WEATHER, {
            params: {
                latitude: lat,
                longitude: lon,
                current: 'temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,wind_speed_10m,weather_code',
                hourly: 'temperature_2m,weather_code',
                daily: 'weather_code,temperature_2m_max,temperature_2m_min',
                temperature_unit,
                wind_speed_unit,
                precipitation_unit
            }
        });

        const validatedData = WeatherResponseSchema.safeParse(data);
        if (validatedData.error) throw new Error('The data is not correct');

        return weatherMapper(validatedData.data);

    } catch (error) {
        if (error instanceof Error) {
            throw error;
        }

        if (axios.isAxiosError(error)) {
            throw new Error('Try later');
        }

        throw new Error('An unknown error occurred while searching for the forecast');
    }

}