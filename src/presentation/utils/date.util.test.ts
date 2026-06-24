import { describe, test, expect } from "vitest";
import { formatWeatherDate, formatWeatherDay, formatWeatherHour } from "./date.util";

describe('formatWeatherDate', () => {

    test('should return a long en-US date string', () => {
        const result = formatWeatherDate('2025-08-05T12:00:00.000Z');

        expect(typeof result).toBe('string');
        expect(result).toMatch(/^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{1,2}, \d{4}$/);
        expect(result).toContain('Aug');
        expect(result).toContain('2025');
    });
});

describe('formatWeatherHour', () => {

    test('should return a 24h time string in HH:MM format', () => {
        const result = formatWeatherHour('2025-08-05T14:30:00.000Z');

        expect(typeof result).toBe('string');
        expect(result).toMatch(/^\d{2}:\d{2}$/);
    });
});

describe('formatWeatherDay', () => {

    test('should return the full weekday name', () => {
        const result = formatWeatherDay('2025-08-05T12:00:00.000Z');

        expect(typeof result).toBe('string');
        expect(result).toMatch(/^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)$/);
    });
});
