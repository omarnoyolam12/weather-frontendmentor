import { describe, expect, test, beforeEach, afterEach } from "vitest";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { getWeatherAction } from "./get-weather.action";

const mockWeatherDto = {
    latitude: 19.626,
    longitude: -99.097,
    generationtime_ms: 1.2,
    utc_offset_seconds: -21600,
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
        time: ['2025-08-05T12:00', '2025-08-05T13:00'],
        temperature_2m: [23, 24],
        weather_code: [0, 1],
    },
    daily_units: { time: 'iso8601', weather_code: 'wmo code', temperature_2m_max: '°C', temperature_2m_min: '°C' },
    daily: {
        time: ['2025-08-05', '2025-08-06'],
        weather_code: [0, 61],
        temperature_2m_max: [28, 22],
        temperature_2m_min: [15, 12],
    },
};

const baseParams = {
    lat: 19.626,
    lon: -99.097,
    temperature_unit: 'celsius' as const,
    wind_speed_unit: 'kmh' as const,
    precipitation_unit: 'mm' as const,
};

describe('getWeatherAction', () => {

    const mock = new MockAdapter(axios);

    beforeEach(() => mock.reset());
    afterEach(() => mock.reset());

    test('should return WeatherEntity on success', async () => {
        mock.onGet().reply(200, mockWeatherDto);

        const entity = await getWeatherAction(baseParams);

        expect(entity.current.temperature).toBe(23);
        expect(entity.current.humidity).toBe(60);
        expect(entity.current.feelsLike).toBe(25);
        expect(entity.current.windSpeed).toBe(10);
        expect(entity.hourly).toHaveLength(2);
        expect(entity.daily).toHaveLength(2);
    });

    test('should throw "The data is not correct" when response fails validation', async () => {
        mock.onGet().reply(200, { invalid: true });

        await expect(getWeatherAction(baseParams)).rejects.toThrow('The data is not correct');
    });

    test('should throw "Try later" on a network error', async () => {
        mock.onGet().networkError();

        await expect(getWeatherAction(baseParams)).rejects.toThrow('Try later');
    });
});