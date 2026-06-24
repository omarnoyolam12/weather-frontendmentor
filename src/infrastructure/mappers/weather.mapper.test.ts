import { describe, test, expect } from 'vitest';
import { weatherMapper } from './weather.mapper';
import type { WeatherDTO } from '@/domain/dtos/weather.dto';

const baseDto: WeatherDTO = {
    latitude: 19.626,
    longitude: -99.097,
    generationtime_ms: 1.2,
    utc_offset_seconds: 0,
    timezone: 'America/Mexico_City',
    timezone_abbreviation: 'CST',
    elevation: 2250,
    current_units: {
        time: 'iso8601',
        interval: 'seconds',
        temperature_2m: '°C',
        relative_humidity_2m: '%',
        apparent_temperature: '°C',
        precipitation: 'mm',
        wind_speed_10m: 'km/h',
        weather_code: 'wmo code',
    },
    current: {
        time: '2025-08-05T12:00',
        interval: 900,
        temperature_2m: 23,
        relative_humidity_2m: 60,
        apparent_temperature: 25,
        precipitation: 0,
        wind_speed_10m: 10,
        weather_code: 0,
    },
    hourly_units: { time: 'iso8601', temperature_2m: '°C', weather_code: 'wmo code' },
    hourly: {
        time: ['2025-08-05T12:00', '2025-08-05T13:00', '2025-08-05T14:00'],
        temperature_2m: [23, 24, 25],
        weather_code: [0, 1, 3],
    },
    daily_units: { time: 'iso8601', weather_code: 'wmo code', temperature_2m_max: '°C', temperature_2m_min: '°C' },
    daily: {
        time: ['2025-08-05', '2025-08-06'],
        weather_code: [0, 61],
        temperature_2m_max: [28, 22],
        temperature_2m_min: [15, 12],
    },
};

describe('weatherMapper', () => {

    test('should map current weather fields correctly', () => {
        const { current } = weatherMapper(baseDto);

        expect(current.temperature).toBe(23);
        expect(current.humidity).toBe(60);
        expect(current.feelsLike).toBe(25);
        expect(current.precipitation).toBe(0);
        expect(current.windSpeed).toBe(10);
        expect(typeof current.time).toBe('string');
        expect(current.time.length).toBeGreaterThan(0);
        expect(current.iconWeather.description).toBe('Clear sky');
    });

    test('should map hourly array with correct length and fields', () => {
        const { hourly } = weatherMapper(baseDto);

        expect(hourly).toHaveLength(3);

        expect(hourly[0].temperature).toBe(23);
        expect(hourly[1].temperature).toBe(24);
        expect(hourly[2].temperature).toBe(25);

        expect(typeof hourly[0].time).toBe('string');
        expect(typeof hourly[0].date).toBe('string');
        expect(hourly[0].iconWeather.description).toBe('Clear sky');
        expect(hourly[2].iconWeather.description).toBe('Overcast');
    });

    test('should map daily array with correct length and fields', () => {
        const { daily } = weatherMapper(baseDto);

        expect(daily).toHaveLength(2);

        expect(daily[0].maxTemperature).toBe(28);
        expect(daily[0].minTemperature).toBe(15);
        expect(daily[1].maxTemperature).toBe(22);
        expect(daily[1].minTemperature).toBe(12);

        expect(typeof daily[0].date).toBe('string');
        expect(daily[0].iconWeather.description).toBe('Clear sky');
        expect(daily[1].iconWeather.description).toBe('Slight rain');
    });

    test('should return empty arrays when hourly and daily have no entries', () => {
        const dto: WeatherDTO = {
            ...baseDto,
            hourly: { time: [], temperature_2m: [], weather_code: [] },
            daily: { time: [], weather_code: [], temperature_2m_max: [], temperature_2m_min: [] },
        };

        const { hourly, daily } = weatherMapper(dto);

        expect(hourly).toHaveLength(0);
        expect(daily).toHaveLength(0);
    });
});
