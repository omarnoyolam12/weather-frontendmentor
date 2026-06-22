import type { LocationItemDTO } from "@/domain/dtos/location.dto";
import type { LocationEntity } from "@/domain/entities/location.entity";

export const locationMapper = (locationDto: LocationItemDTO): LocationEntity => {

    return {
        city: locationDto.name,
        country: locationDto.country,
        latitude: locationDto.latitude,
        longitude: locationDto.longitude,
        state: locationDto.admin1 ?? ''
    }
}