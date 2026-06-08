import type { HourlyForecast } from '@/domain/entities/weather.entity';
import { WMO_WEATHER_MAP } from '@/config/weather-conditions';

export const mockHourlyForecast: HourlyForecast[] = [
    {
        time: '06:00',
        date: 'Tuesday',
        temperature: 62,
        iconWeather: WMO_WEATHER_MAP[0], // Clear sky
    },
    {
        time: '07:00',
        date: 'Tuesday',
        temperature: 64,
        iconWeather: WMO_WEATHER_MAP[1], // Mainly clear
    },
    {
        time: '08:00',
        date: 'Tuesday',
        temperature: 66,
        iconWeather: WMO_WEATHER_MAP[2], // Partly cloudy
    },
    {
        time: '09:00',
        date: 'Tuesday',
        temperature: 68,
        iconWeather: WMO_WEATHER_MAP[2], // Partly cloudy
    },
    {
        time: '10:00',
        date: 'Tuesday',
        temperature: 70,
        iconWeather: WMO_WEATHER_MAP[1], // Mainly clear
    },
    {
        time: '11:00',
        date: 'Tuesday',
        temperature: 72,
        iconWeather: WMO_WEATHER_MAP[0], // Clear sky
    },
    {
        time: '12:00',
        date: 'Tuesday',
        temperature: 74,
        iconWeather: WMO_WEATHER_MAP[0], // Clear sky
    },
    {
        time: '13:00',
        date: 'Tuesday',
        temperature: 75,
        iconWeather: WMO_WEATHER_MAP[0], // Clear sky
    },
    {
        time: '14:00',
        date: 'Tuesday',
        temperature: 76,
        iconWeather: WMO_WEATHER_MAP[2], // Partly cloudy
    },
    {
        time: '15:00',
        date: 'Tuesday',
        temperature: 75,
        iconWeather: WMO_WEATHER_MAP[2], // Partly cloudy
    },
    {
        time: '16:00',
        date: 'Tuesday',
        temperature: 73,
        iconWeather: WMO_WEATHER_MAP[3], // Overcast
    },
    {
        time: '17:00',
        date: 'Tuesday',
        temperature: 71,
        iconWeather: WMO_WEATHER_MAP[51], // Light drizzle
    },
    {
        time: '18:00',
        date: 'Tuesday',
        temperature: 68,
        iconWeather: WMO_WEATHER_MAP[61], // Slight rain
    },
    {
        time: '19:00',
        date: 'Tuesday',
        temperature: 66,
        iconWeather: WMO_WEATHER_MAP[61], // Slight rain
    },
    {
        time: '20:00',
        date: 'Tuesday',
        temperature: 64,
        iconWeather: WMO_WEATHER_MAP[3], // Overcast
    },
    {
        time: '21:00',
        date: 'Tuesday',
        temperature: 62,
        iconWeather: WMO_WEATHER_MAP[2], // Partly cloudy
    },
    {
        time: '22:00',
        date: 'Tuesday',
        temperature: 60,
        iconWeather: WMO_WEATHER_MAP[1], // Mainly clear
    },
    {
        time: '23:00',
        date: 'Tuesday',
        temperature: 59,
        iconWeather: WMO_WEATHER_MAP[0], // Clear sky
    },
];
