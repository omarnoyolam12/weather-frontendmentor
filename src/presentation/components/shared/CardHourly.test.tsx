import { describe, expect, test } from "vitest";
import { render } from "@testing-library/react";
import { CardHourly } from "./CardHourly";
import { getWeatherVisuals } from '@/config/weather-conditions';

describe('CardDaily', () => {

    const hourlyForecast = {
        time: '15:00',
        date: 'Wednesday',
        temperature: 24,
        iconWeather: getWeatherVisuals(61), // 61 = Slight rain
    };

    test('should render values', () => {

        const { container } = render(<CardHourly hourly={hourlyForecast} />);

        const img = container.querySelector('img');
        const paragraphs = container.querySelectorAll('p');

        expect(img?.src).toContain(hourlyForecast.iconWeather.iconUrl);
        expect(img?.alt).toContain(hourlyForecast.iconWeather.description);

        expect(paragraphs[0].textContent).toBe(hourlyForecast.time);
        expect(paragraphs[1].textContent).toBe(`${hourlyForecast.temperature}°`);

    });

    test('should match snapshot', () => {
        const { container } = render(<CardHourly hourly={hourlyForecast} />);
        expect(container).toMatchSnapshot();
    });
});