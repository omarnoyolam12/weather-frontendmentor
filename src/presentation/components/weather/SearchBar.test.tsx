import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { SearchBar } from './SearchBar';
import type { LocationEntity } from '@/domain/entities/location.entity';

vi.mock('@headlessui/react', () => {
    let comboboxOnChange: any;

    return {
        Combobox: ({ children, onChange }: any) => {
            comboboxOnChange = onChange;
            return <div>{children}</div>;
        },
        ComboboxInput: ({ displayValue, onChange, placeholder }: any) => (
            <input placeholder={placeholder} defaultValue={displayValue?.()} onChange={onChange} />
        ),
        ComboboxOptions: ({ children }: any) => <div>{children}</div>,
        ComboboxOption: ({ children, value }: any) => (
            <div role="option" onClick={() => comboboxOnChange?.(value)}>{children}</div>
        ),
    };
});

vi.mock('@/presentation/hooks/useLocation', () => ({
    useLocation: vi.fn(),
}));

import { useLocation } from '@/presentation/hooks/useLocation';

const mockCity: LocationEntity = {
    city: 'Ecatepec',
    country: 'Mexico',
    latitude: 19.601,
    longitude: -99.049,
    state: 'Estado de México',
};

const baseHook = {
    useQueryLocation: { data: [], isLoading: false },
    query: '',
    setQuery: vi.fn(),
} as any;

beforeEach(() => {
    vi.mocked(useLocation).mockReturnValue(baseHook);
});

describe('SearchBar', () => {

    test('should render the search input with placeholder', () => {
        const { getByPlaceholderText } = render(
            <SearchBar city={undefined} onSelectCity={vi.fn()} />
        );

        expect(getByPlaceholderText('Search for a place...')).toBeTruthy();
    });

    test('should show "Searching cities..." when isLoading is true', () => {
        vi.mocked(useLocation).mockReturnValue({
            ...baseHook,
            useQueryLocation: { data: [], isLoading: true },
        });

        const { getByText } = render(<SearchBar city={undefined} onSelectCity={vi.fn()} />);

        expect(getByText('Searching cities...')).toBeTruthy();
    });

    test('should show "No cities found." when query > 2 chars and no results', () => {
        vi.mocked(useLocation).mockReturnValue({
            ...baseHook,
            query: 'abc',
            useQueryLocation: { data: [], isLoading: false },
        });

        const { getByText } = render(<SearchBar city={undefined} onSelectCity={vi.fn()} />);

        expect(getByText('No cities found.')).toBeTruthy();
    });

    test('should render city options when cities are available', () => {
        vi.mocked(useLocation).mockReturnValue({
            ...baseHook,
            useQueryLocation: { data: [mockCity], isLoading: false },
        });

        const { getByText } = render(<SearchBar city={undefined} onSelectCity={vi.fn()} />);

        expect(getByText('Ecatepec')).toBeTruthy();
        expect(getByText('Estado de México, Mexico')).toBeTruthy();
    });

    test('should display selected city value in the input', () => {
        const { getByDisplayValue } = render(
            <SearchBar city={mockCity} onSelectCity={vi.fn()} />
        );

        expect(getByDisplayValue('Ecatepec, Mexico')).toBeTruthy();
    });

    test('should display query in the input when no city is selected', () => {
        vi.mocked(useLocation).mockReturnValue({ ...baseHook, query: 'Eco' });

        const { getByDisplayValue } = render(<SearchBar city={undefined} onSelectCity={vi.fn()} />);

        expect(getByDisplayValue('Eco')).toBeTruthy();
    });

    test('should call setQuery when typing in the input', () => {
        const setQuery = vi.fn();
        vi.mocked(useLocation).mockReturnValue({ ...baseHook, setQuery });

        const { getByPlaceholderText } = render(<SearchBar city={undefined} onSelectCity={vi.fn()} />);

        fireEvent.change(getByPlaceholderText('Search for a place...'), { target: { value: 'Mon' } });

        expect(setQuery).toHaveBeenCalledWith('Mon');
    });

    test('should call onSelectCity when a city option is clicked', () => {
        const onSelectCity = vi.fn();
        vi.mocked(useLocation).mockReturnValue({
            ...baseHook,
            useQueryLocation: { data: [mockCity], isLoading: false },
        });

        const { getByRole } = render(<SearchBar city={undefined} onSelectCity={onSelectCity} />);

        fireEvent.click(getByRole('option'));

        expect(onSelectCity).toHaveBeenCalledWith(mockCity);
    });

    test('should call onSelectCity when Search button is clicked with a city selected', () => {
        const onSelectCity = vi.fn();

        const { getByText } = render(<SearchBar city={mockCity} onSelectCity={onSelectCity} />);

        fireEvent.click(getByText('Search'));

        expect(onSelectCity).toHaveBeenCalledWith(mockCity);
    });

    test('should not call onSelectCity when Search button is clicked without a city', () => {
        const onSelectCity = vi.fn();

        const { getByText } = render(<SearchBar city={undefined} onSelectCity={onSelectCity} />);

        fireEvent.click(getByText('Search'));

        expect(onSelectCity).not.toHaveBeenCalled();
    });
});
