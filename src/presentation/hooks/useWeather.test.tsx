import { describe, test, expect, vi, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { useWeather } from './useWeather';
import type { LocationEntity } from '@/domain/entities/location.entity';

vi.mock('@/infrastructure/actions/get-weather.action', () => ({
    getWeatherAction: vi.fn().mockResolvedValue({
        current: { temperature: 23, humidity: 60, feelsLike: 25, precipitation: 0, windSpeed: 10, time: 'Tuesday, Aug 5, 2025', iconWeather: { description: 'Clear sky', iconUrl: '' } },
        hourly: [],
        daily: [],
    }),
}));

import { getWeatherAction } from '@/infrastructure/actions/get-weather.action';

const mockCity: LocationEntity = {
    city: 'Ecatepec',
    country: 'Mexico',
    latitude: 19.601,
    longitude: -99.049,
    state: 'Estado de México',
};

const createWrapper = () => {
    const queryClient = new QueryClient({
        defaultOptions: { queries: { retry: false } },
    });
    return ({ children }: { children: ReactNode }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
};

beforeEach(() => vi.clearAllMocks());

describe('useWeather', () => {

    test('should initialize with default state', () => {
        const { result } = renderHook(() => useWeather(), { wrapper: createWrapper() });

        expect(result.current.city).toBeUndefined();
        expect(result.current.units).toEqual({
            temperature_unit: 'celsius',
            precipitation_unit: 'mm',
            wind_speed_unit: 'kmh',
        });
        expect(result.current.useQueryWeather.fetchStatus).toBe('idle');
    });

    test('should not fetch weather when no city is selected', () => {
        renderHook(() => useWeather(), { wrapper: createWrapper() });

        expect(vi.mocked(getWeatherAction)).not.toHaveBeenCalled();
    });

    test('should set city and coordinates when onSelectCity is called', () => {
        const { result } = renderHook(() => useWeather(), { wrapper: createWrapper() });

        act(() => result.current.onSelectCity(mockCity));

        expect(result.current.city).toEqual(mockCity);
    });

    test('should fetch weather with correct params after onSelectCity', async () => {
        const { result } = renderHook(() => useWeather(), { wrapper: createWrapper() });

        act(() => result.current.onSelectCity(mockCity));

        await waitFor(() => expect(vi.mocked(getWeatherAction)).toHaveBeenCalledWith({
            lat: 19.601,
            lon: -99.049,
            temperature_unit: 'celsius',
            wind_speed_unit: 'kmh',
            precipitation_unit: 'mm',
        }));
    });

    test('should update units when setUnits is called', () => {
        const { result } = renderHook(() => useWeather(), { wrapper: createWrapper() });

        act(() => result.current.setUnits({
            temperature_unit: 'fahrenheit',
            wind_speed_unit: 'mph',
            precipitation_unit: 'inch',
        }));

        expect(result.current.units).toEqual({
            temperature_unit: 'fahrenheit',
            wind_speed_unit: 'mph',
            precipitation_unit: 'inch',
        });
    });
});
