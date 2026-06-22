import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from "use-debounce";

import { searchLocationAction } from '@/infrastructure/actions/search-location.action';

export const useLocation = () => {

    const [query, setQuery] = useState('');
    const [debouncedQuery] = useDebounce(query, 500);

    const useQueryLocation = useQuery({
        queryKey: ['localitation', debouncedQuery],
        queryFn: () => searchLocationAction(debouncedQuery),
        enabled: debouncedQuery.trim().length > 2,
        staleTime: 1000 * 60 * 10,
        gcTime: 1000 * 60 * 30
    });

    return {
        useQueryLocation,
        query,
        setQuery
    }
}
