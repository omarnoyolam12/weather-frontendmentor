// 1. Importas tus recursos visuales usando tu alias "@"
import iconDrizzle from '@/assets/images/icons/icon-drizzle.webp';
import iconFog from '@/assets/images/icons/icon-fog.webp';
import iconOvercast from '@/assets/images/icons/icon-overcast.webp';
import iconPartlyCloudy from '@/assets/images/icons/icon-partly-cloudy.webp';
import iconRain from '@/assets/images/icons/icon-rain.webp';
import iconSnow from '@/assets/images/icons/icon-snow.webp';
import iconStorm from '@/assets/images/icons/icon-storm.webp';
import iconSunny from '@/assets/images/icons/icon-sunny.webp';

export interface WeatherVisualCondition {
    description: string;
    iconUrl: string; // Cambiamos name por url, ya que guardará la ruta real resuelta por Vite
}

export const WMO_WEATHER_MAP: Record<number, WeatherVisualCondition> = {
    0: { description: 'Clear sky', iconUrl: iconSunny },

    1: { description: 'Mainly clear', iconUrl: iconPartlyCloudy },
    2: { description: 'Partly cloudy', iconUrl: iconPartlyCloudy },
    3: { description: 'Overcast', iconUrl: iconOvercast },

    45: { description: 'Fog', iconUrl: iconFog },
    48: { description: 'Depositing rime fog', iconUrl: iconFog },

    51: { description: 'Light drizzle', iconUrl: iconDrizzle },
    53: { description: 'Moderate drizzle', iconUrl: iconDrizzle },
    55: { description: 'Dense drizzle', iconUrl: iconDrizzle },
    56: { description: 'Light freezing drizzle', iconUrl: iconDrizzle },
    57: { description: 'Dense freezing drizzle', iconUrl: iconDrizzle },

    61: { description: 'Slight rain', iconUrl: iconRain },
    63: { description: 'Moderate rain', iconUrl: iconRain },
    65: { description: 'Heavy rain', iconUrl: iconRain },

    66: { description: 'Light freezing rain', iconUrl: iconRain },
    67: { description: 'Heavy freezing rain', iconUrl: iconRain },

    71: { description: 'Slight snow fall', iconUrl: iconSnow },
    73: { description: 'Moderate snow fall', iconUrl: iconSnow },
    75: { description: 'Heavy snow fall', iconUrl: iconSnow },
    77: { description: 'Snow grains', iconUrl: iconSnow },

    80: { description: 'Slight rain showers', iconUrl: iconRain },
    81: { description: 'Moderate rain showers', iconUrl: iconRain },
    82: { description: 'Violent rain showers', iconUrl: iconRain },

    85: { description: 'Slight snow showers', iconUrl: iconSnow },
    86: { description: 'Heavy snow showers', iconUrl: iconSnow },

    95: { description: 'Thunderstorm', iconUrl: iconStorm },
    96: { description: 'Thunderstorm with slight hail', iconUrl: iconStorm },
    99: { description: 'Thunderstorm with heavy hail', iconUrl: iconStorm },
};

export const getWeatherVisuals = (code: number): WeatherVisualCondition => {
    return WMO_WEATHER_MAP[code] ?? { description: 'Clear sky', iconUrl: iconSunny };
};