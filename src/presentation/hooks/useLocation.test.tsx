import { describe, test, expect, vi, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { useLocation } from './useLocation';

vi.mock('use-debounce', () => ({
    useDebounce: (value: string) => [value],
}));

vi.mock('@/infrastructure/actions/search-location.action', () => ({
    searchLocationAction: vi.fn().mockResolvedValue([
        { city: 'Ecatepec', country: 'Mexico', latitude: 19.601, longitude: -99.049, state: 'Estado de México' },
    ]),
}));

import { searchLocationAction } from '@/infrastructure/actions/search-location.action';

const createWrapper = () => {
    const queryClient = new QueryClient({
        defaultOptions: { queries: { retry: false } },
    });
    return ({ children }: { children: ReactNode }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
};

beforeEach(() => vi.clearAllMocks());

describe('useLocation', () => {

    test('should initialize with empty query', () => {
        const { result } = renderHook(() => useLocation(), { wrapper: createWrapper() });

        expect(result.current.query).toBe('');
        expect(typeof result.current.setQuery).toBe('function');
    });

    test('should update query when setQuery is called', () => {
        const { result } = renderHook(() => useLocation(), { wrapper: createWrapper() });

        act(() => result.current.setQuery('Ecatepec'));

        expect(result.current.query).toBe('Ecatepec');
    });

    test('should not fetch when query length is 2 or less', async () => {
        const { result } = renderHook(() => useLocation(), { wrapper: createWrapper() });

        act(() => result.current.setQuery('ab'));

        expect(vi.mocked(searchLocationAction)).not.toHaveBeenCalled();
    });

    test('should fetch when query length is greater than 2', async () => {
        const { result } = renderHook(() => useLocation(), { wrapper: createWrapper() });

        act(() => result.current.setQuery('abc'));

        await waitFor(() => expect(vi.mocked(searchLocationAction)).toHaveBeenCalledWith('abc'));
    });
});
