import { describe, test, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { DisplayHourlyForcast } from './DisplayHourlyForcast';
import type { HourlyForecast } from '@/domain/entities/weather.entity';

vi.mock('@headlessui/react', () => ({
    Listbox: ({ children, onChange, value }: any) => (
        <select value={value} onChange={(e) => onChange(e.target.value)}>
            {children}
        </select>
    ),
    ListboxButton: () => null,
    ListboxOptions: ({ children }: any) => <>{children}</>,
    ListboxOption: ({ children, value }: any) => <option value={value}>{children}</option>,
}));

const mockHourly: HourlyForecast[] = [
    { time: '12:00', date: 'Monday', temperature: 23, iconWeather: { description: 'Clear sky', iconUrl: 'icon-sunny.webp' } },
    { time: '13:00', date: 'Monday', temperature: 24, iconWeather: { description: 'Clear sky', iconUrl: 'icon-sunny.webp' } },
    { time: '14:00', date: 'Tuesday', temperature: 20, iconWeather: { description: 'Overcast', iconUrl: 'icon-overcast.webp' } },
];

describe('DisplayHourlyForcast', () => {

    test('should render the "Hourly Forecast" title', () => {
        const { getByText } = render(<DisplayHourlyForcast hourlyForecast={mockHourly} />);

        expect(getByText('Hourly Forecast')).toBeTruthy();
    });

    test('should render only hours matching the default selected day (Monday)', () => {
        const { getByText, queryByText } = render(<DisplayHourlyForcast hourlyForecast={mockHourly} />);

        expect(getByText('12:00')).toBeTruthy();
        expect(getByText('13:00')).toBeTruthy();
        expect(queryByText('14:00')).toBeNull();
    });

    test('should render no cards when no hours match the selected day', () => {
        const { queryByText } = render(<DisplayHourlyForcast hourlyForecast={[]} />);

        expect(queryByText('12:00')).toBeNull();
    });

    test('should filter cards when a different day is selected', () => {
        const { container, getByText, queryByText } = render(<DisplayHourlyForcast hourlyForecast={mockHourly} />);

        fireEvent.change(container.querySelector('select')!, { target: { value: 'Tuesday' } });

        expect(getByText('14:00')).toBeTruthy();
        expect(queryByText('12:00')).toBeNull();
        expect(queryByText('13:00')).toBeNull();
    });
});
