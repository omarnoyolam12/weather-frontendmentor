import { describe, expect, test } from "vitest";
import { render } from "@testing-library/react";

import { getWeatherVisuals } from '@/config/weather-conditions';
import iconPartlyCloudy from '@/assets/images/weather/icon-partly-cloudy.webp';
import { CardDaily } from "./CardDaily";

describe('CardDaily', () => {

    test('should render values', () => {

        const weatherVisual = { description: 'Partly cloudy', iconUrl: iconPartlyCloudy };

        const dailyForecast = {
            date: 'Wed',
            maxTemperature: 28,
            minTemperature: 18,
            iconWeather: getWeatherVisuals(2),
        };

        const { container } = render(<CardDaily daily={dailyForecast} />)

        const img = container.querySelector('img');
        const paragraphs = container.querySelectorAll('p');

        expect(paragraphs[0].textContent).toContain(dailyForecast.date);
        expect(paragraphs[1].textContent).toContain(dailyForecast.maxTemperature);
        expect(paragraphs[2].textContent).toContain(dailyForecast.minTemperature);

        expect(img?.src).toContain(weatherVisual.iconUrl);
        expect(img?.alt).toContain(weatherVisual.description);
    });
});