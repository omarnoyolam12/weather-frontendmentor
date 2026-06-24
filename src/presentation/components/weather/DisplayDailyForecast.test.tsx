import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/react';
import { DisplayDailyForecast } from './DisplayDailyForecast';
import type { DailyForecast } from '@/domain/entities/weather.entity';

const mockForecast: DailyForecast[] = [
    { date: 'Tuesday', maxTemperature: 28, minTemperature: 15, iconWeather: { description: 'Clear sky', iconUrl: 'icon-sunny.webp' } },
    { date: 'Wednesday', maxTemperature: 22, minTemperature: 12, iconWeather: { description: 'Slight rain', iconUrl: 'icon-rain.webp' } },
    { date: 'Thursday', maxTemperature: 19, minTemperature: 10, iconWeather: { description: 'Overcast', iconUrl: 'icon-overcast.webp' } },
];

describe('DisplayDailyForecast', () => {

    test('should render the "Daily Forecast" title', () => {
        const { getByText } = render(<DisplayDailyForecast forecast={mockForecast} />);

        expect(getByText('Daily Forecast')).toBeTruthy();
    });

    test('should render one card per forecast item', () => {
        const { getAllByRole } = render(<DisplayDailyForecast forecast={mockForecast} />);

        const images = getAllByRole('img');
        expect(images).toHaveLength(mockForecast.length);
    });

    test('should render nothing when forecast is empty', () => {
        const { queryByRole } = render(<DisplayDailyForecast forecast={[]} />);

        expect(queryByRole('img')).toBeNull();
    });
});
