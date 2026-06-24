import { describe, test, expect } from 'vitest';
import { WMO_WEATHER_MAP, getWeatherVisuals } from './weather-conditions';

describe('WMO_WEATHER_MAP', () => {

    test('should have a description and iconUrl string for every entry', () => {
        for (const [code, condition] of Object.entries(WMO_WEATHER_MAP)) {
            expect(typeof condition.description, `code ${code} description`).toBe('string');
            expect(condition.description.length, `code ${code} description empty`).toBeGreaterThan(0);
            expect(typeof condition.iconUrl, `code ${code} iconUrl`).toBe('string');
        }
    });

    test('should contain all expected WMO codes', () => {
        const expectedCodes = [
            0,
            1, 2, 3,
            45, 48,
            51, 53, 55, 56, 57,
            61, 63, 65, 66, 67,
            71, 73, 75, 77,
            80, 81, 82,
            85, 86,
            95, 96, 99,
        ];

        expectedCodes.forEach(code => {
            expect(WMO_WEATHER_MAP[code], `missing code ${code}`).toBeDefined();
        });
    });
});

describe('getWeatherVisuals', () => {

    test('should return the correct condition for a known code', () => {
        expect(getWeatherVisuals(0).description).toBe('Clear sky');
        expect(getWeatherVisuals(3).description).toBe('Overcast');
        expect(getWeatherVisuals(51).description).toBe('Light drizzle');
        expect(getWeatherVisuals(63).description).toBe('Moderate rain');
        expect(getWeatherVisuals(73).description).toBe('Moderate snow fall');
        expect(getWeatherVisuals(95).description).toBe('Thunderstorm');
    });

    test('should return the Clear sky fallback for an unknown code', () => {
        const result = getWeatherVisuals(999);

        expect(result.description).toBe('Clear sky');
        expect(typeof result.iconUrl).toBe('string');
    });
});
