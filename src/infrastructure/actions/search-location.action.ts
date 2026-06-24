import axios from "axios";
import type { LocationEntity } from "@/domain/entities/location.entity";
import { LocationResponseSchema, type LocationDTO } from "@/domain/dtos/location.dto";
import { locationMapper } from "@/infrastructure/mappers/location.mapper";

export const searchLocationAction = async (name: string): Promise<LocationEntity[]> => {

    try {

        const { data } = await axios.get<LocationDTO>(import.meta.env.VITE_URL_LOCATION, {
            params: {
                name,
                count: 5,
                language: 'es'
            }
        });

        const validatedData = LocationResponseSchema.safeParse(data);
        if (validatedData.error) throw new Error('The data is not correct');

        return validatedData.data.results.map(locationMapper);

    } catch (error) {

        if (axios.isAxiosError(error)) {
            throw new Error('Try later');
        }

        if (error instanceof Error) {
            throw error;
        }

        throw new Error('An unknown error occurred while searching for the location');
    }

}