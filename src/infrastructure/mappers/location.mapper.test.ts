import { describe, test, expect } from 'vitest';
import { locationMapper } from './location.mapper';
import type { LocationItemDTO } from '@/domain/dtos/location.dto';

const baseDto: LocationItemDTO = {
    id: 1,
    name: 'Coacalco',
    latitude: 19.626,
    longitude: -99.097,
    elevation: 2250,
    feature_code: 'PPL',
    country_code: 'MX',
    timezone: 'America/Mexico_City',
    country_id: 3996063,
    country: 'Mexico',
    admin1: 'Estado de México',
};

describe('locationMapper', () => {

    test('should map all DTO fields to the entity correctly', () => {
        const entity = locationMapper(baseDto);

        expect(entity.city).toBe('Coacalco');
        expect(entity.country).toBe('Mexico');
        expect(entity.latitude).toBe(19.626);
        expect(entity.longitude).toBe(-99.097);
        expect(entity.state).toBe('Estado de México');
    });

    test('should default state to empty string when admin1 is undefined', () => {
        const dto: LocationItemDTO = { ...baseDto, admin1: undefined };
        const entity = locationMapper(dto);

        expect(entity.state).toBe('');
    });
});
