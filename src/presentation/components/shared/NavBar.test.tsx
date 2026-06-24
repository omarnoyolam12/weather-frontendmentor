import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { NavBar } from './NavBar';
import type { Units } from '@/presentation/interfaces';

vi.mock('@headlessui/react', () => ({
    Menu: ({ children }: any) => <div>{children}</div>,
    MenuButton: ({ children, className }: any) => <button className={className}>{children}</button>,
    MenuItems: ({ children }: any) => <div>{children}</div>,
    MenuItem: ({ children }: any) => <div>{children}</div>,
}));

const defaultUnits: Units = {
    temperature_unit: 'celsius',
    wind_speed_unit: 'kmh',
    precipitation_unit: 'mm',
};

const renderNavBar = (units = defaultUnits, setUnits = vi.fn()) =>
    render(<NavBar units={units} setUnits={setUnits} />);


describe('NavBar', () => {

    beforeEach(() => vi.clearAllMocks());

    test('should render the logo', () => {
        const { getByAltText } = renderNavBar();

        expect(getByAltText('Logo Weather Now')).toBeTruthy();
    });

    test('should render section labels', () => {
        const { getByText } = renderNavBar();

        expect(getByText('Temperature')).toBeTruthy();
        expect(getByText('WindSpeed')).toBeTruthy();
        expect(getByText('Precipitation')).toBeTruthy();
    });

    test('should call setUnits with celsius when clicking "Celcius (°C)"', () => {
        const setUnits = vi.fn();
        const { getByText } = renderNavBar(defaultUnits, setUnits);

        fireEvent.click(getByText('Celcius (°C)').closest('button')!);

        expect(setUnits).toHaveBeenCalledWith({ ...defaultUnits, temperature_unit: 'celsius' });
    });

    test('should call setUnits with fahrenheit when clicking "Fahrenheit (°F)"', () => {
        const setUnits = vi.fn();
        const { getByText } = renderNavBar(defaultUnits, setUnits);

        fireEvent.click(getByText('Fahrenheit (°F)').closest('button')!);

        expect(setUnits).toHaveBeenCalledWith({ ...defaultUnits, temperature_unit: 'fahrenheit' });
    });

    test('should call setUnits with kmh when clicking "km/h"', () => {
        const setUnits = vi.fn();
        const { getByText } = renderNavBar(defaultUnits, setUnits);

        fireEvent.click(getByText('km/h').closest('button')!);

        expect(setUnits).toHaveBeenCalledWith({ ...defaultUnits, wind_speed_unit: 'kmh' });
    });

    test('should call setUnits with mph when clicking "mph"', () => {
        const setUnits = vi.fn();
        const { getByText } = renderNavBar(defaultUnits, setUnits);

        fireEvent.click(getByText('mph').closest('button')!);

        expect(setUnits).toHaveBeenCalledWith({ ...defaultUnits, wind_speed_unit: 'mph' });
    });

    test('should call setUnits with mm when clicking "Milimeters"', () => {
        const setUnits = vi.fn();
        const { getByText } = renderNavBar(defaultUnits, setUnits);

        fireEvent.click(getByText('Milimeters').closest('button')!);

        expect(setUnits).toHaveBeenCalledWith({ ...defaultUnits, precipitation_unit: 'mm' });
    });

    test('should call setUnits with inch when clicking "Inch"', () => {
        const setUnits = vi.fn();
        const { getByText } = renderNavBar(defaultUnits, setUnits);

        fireEvent.click(getByText('Inch').closest('button')!);

        expect(setUnits).toHaveBeenCalledWith({ ...defaultUnits, precipitation_unit: 'inch' });
    });

    test('should show checkmark as visible for the active unit and invisible for the inactive', () => {
        const { getByText } = renderNavBar({ ...defaultUnits, temperature_unit: 'fahrenheit' });

        const celsiusCheck = getByText('Celcius (°C)').closest('button')!.querySelector('img');
        const fahrenheitCheck = getByText('Fahrenheit (°F)').closest('button')!.querySelector('img');

        expect(celsiusCheck?.className).toContain('invisible');
        expect(fahrenheitCheck?.className).toContain('visible');
    });
});
