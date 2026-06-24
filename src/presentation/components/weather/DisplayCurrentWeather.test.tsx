import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/react';
import { DisplayCurrentWeather } from './DisplayCurrentWeather';
import type { CurrentWeather } from '@/domain/entities/weather.entity';
import type { LocationEntity } from '@/domain/entities/location.entity';
import type { Units } from '@/presentation/interfaces';

const mockWeather: CurrentWeather = {
    time: 'Tuesday, Aug 5, 2025',
    temperature: 23,
    humidity: 60,
    feelsLike: 25,
    precipitation: 0,
    windSpeed: 10,
    iconWeather: { description: 'Clear sky', iconUrl: 'icon-sunny.webp' },
};

const mockLocation: LocationEntity = {
    city: 'Ecatepec',
    country: 'Mexico',
    latitude: 19.601,
    longitude: -99.049,
    state: 'Estado de México',
};

const kmhUnits: Units = { temperature_unit: 'celsius', wind_speed_unit: 'kmh', precipitation_unit: 'mm' };
const mphUnits: Units = { temperature_unit: 'fahrenheit', wind_speed_unit: 'mph', precipitation_unit: 'inch' };

describe('DisplayCurrentWeather', () => {

    test('should render city, country and temperature', () => {
        const { getByText } = render(
            <DisplayCurrentWeather weather={mockWeather} location={mockLocation} units={kmhUnits} />
        );

        expect(getByText('Ecatepec, Mexico')).toBeTruthy();
        expect(getByText('23°')).toBeTruthy();
        expect(getByText('Tuesday, Aug 5, 2025')).toBeTruthy();
    });

    test('should render the weather icon with correct alt text', () => {
        const { getByAltText } = render(
            <DisplayCurrentWeather weather={mockWeather} location={mockLocation} units={kmhUnits} />
        );

        expect(getByAltText('Clear sky')).toBeTruthy();
    });

    test('should show km/h when wind_speed_unit is kmh', () => {
        const { getByText } = render(
            <DisplayCurrentWeather weather={mockWeather} location={mockLocation} units={kmhUnits} />
        );

        expect(getByText('10 km/h')).toBeTruthy();
    });

    test('should show mph when wind_speed_unit is mph', () => {
        const { getByText } = render(
            <DisplayCurrentWeather weather={mockWeather} location={mockLocation} units={mphUnits} />
        );

        expect(getByText('10 mph')).toBeTruthy();
    });

    test('should show mm when precipitation_unit is mm', () => {
        const { getByText } = render(
            <DisplayCurrentWeather weather={mockWeather} location={mockLocation} units={kmhUnits} />
        );

        expect(getByText('0 mm')).toBeTruthy();
    });

    test('should show inch when precipitation_unit is inch', () => {
        const { getByText } = render(
            <DisplayCurrentWeather weather={mockWeather} location={mockLocation} units={mphUnits} />
        );

        expect(getByText('0 inch')).toBeTruthy();
    });
});
