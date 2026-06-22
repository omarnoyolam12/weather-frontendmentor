import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getWeatherAction } from '@/infrastructure/actions/get-weather.action';
import type { WeatherEntity } from '@/domain/entities/weather.entity';
import type { LocationEntity } from '@/domain/entities/location.entity';

import type { Units } from '@/presentation/interfaces';

interface Coordinates {
    lat: number | undefined;
    lon: number | undefined;
}

export const useWeather = () => {

    const [city, setCity] = useState<LocationEntity>();

    const [coordinates, setCoordinates] = useState<Coordinates>({
        lat: undefined,
        lon: undefined
    });

    const [units, setUnits] = useState<Units>({
        temperature_unit: 'celsius',
        precipitation_unit: 'mm',
        wind_speed_unit: 'kmh'
    });

    const hasValidCoordinates = coordinates.lat !== undefined && coordinates.lon !== undefined;

    const useQueryWeather = useQuery<WeatherEntity>({
        queryKey: ['weather', { coordinates, units }],
        queryFn: () =>
            getWeatherAction({
                lat: coordinates.lat!,
                lon: coordinates.lon!,
                temperature_unit: units.temperature_unit,
                wind_speed_unit: units.wind_speed_unit,
                precipitation_unit: units.precipitation_unit,
            }),
        enabled: hasValidCoordinates,
        staleTime: 1000 * 60 * 10,
        gcTime: 1000 * 60 * 30,
    });

    const onSelectCity = (city: LocationEntity) => {
        setCity(city);
        setCoordinates({ lat: city.latitude, lon: city.longitude });
    }

    return {
        city,
        onSelectCity,
        units,
        setUnits,
        useQueryWeather
    };
};
