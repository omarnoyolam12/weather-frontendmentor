import { describe, expect, test, beforeEach, afterEach } from "vitest";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { searchLocationAction } from "./search-location.action";

const mockLocationResponse = {
    generationtime_ms: 1.2,
    results: [
        {
            id: 1,
            name: 'Ecatepec',
            latitude: 19.601,
            longitude: -99.049,
            elevation: 2250,
            feature_code: 'PPL',
            country_code: 'MX',
            timezone: 'America/Mexico_City',
            country_id: 3996063,
            country: 'Mexico',
            admin1: 'Estado de México',
        }
    ],
};

describe('searchLocationAction', () => {

    const mock = new MockAdapter(axios);

    beforeEach(() => mock.reset());
    afterEach(() => mock.reset());

    test('should return an array of LocationEntity on success', async () => {
        mock.onGet().reply(200, mockLocationResponse);

        const data = await searchLocationAction('Ecatepec');

        expect(data).toHaveLength(1);
        expect(data[0].city).toBe('Ecatepec');
        expect(data[0].country).toBe('Mexico');
        expect(data[0].latitude).toBe(19.601);
        expect(data[0].longitude).toBe(-99.049);
        expect(data[0].state).toBe('Estado de México');
    });

    test('should return an empty array when the API returns no results', async () => {
        mock.onGet().reply(200, { ...mockLocationResponse, results: [] });

        const data = await searchLocationAction('xyzzy');

        expect(data).toHaveLength(0);
    });

    test('should throw "The data is not correct" when the response fails Zod validation', async () => {
        mock.onGet().reply(200, { invalid: true });

        await expect(searchLocationAction('Ecatepec')).rejects.toThrow('The data is not correct');
    });

    test('should throw "Try later" on a network error', async () => {
        mock.onGet().networkError();

        await expect(searchLocationAction('Ecatepec')).rejects.toThrow('Try later');
    });
});