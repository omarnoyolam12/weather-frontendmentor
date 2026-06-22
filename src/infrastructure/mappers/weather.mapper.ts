import type { WeatherDTO } from "@/domain/dtos/weather.dto";
import type { WeatherEntity } from "@/domain/entities/weather.entity";
import { formatWeatherDate, formatWeatherDay, formatWeatherHour } from "@/presentation/utils/date.util";
import { getWeatherVisuals } from "@/config/weather-conditions";

export const weatherMapper = (weatherDto: WeatherDTO): WeatherEntity => {

    const hourlyCount = weatherDto.hourly.time.length;
    const dailyCount = weatherDto.daily.time.length;

    return {
        current: {
            feelsLike: weatherDto.current.apparent_temperature,
            humidity: weatherDto.current.relative_humidity_2m,
            precipitation: weatherDto.current.precipitation,
            temperature: weatherDto.current.temperature_2m,
            time: formatWeatherDate(weatherDto.current.time),
            windSpeed: weatherDto.current.wind_speed_10m,
            iconWeather: getWeatherVisuals(weatherDto.current.weather_code),
        },
        hourly: Array.from({ length: hourlyCount }, (_, index) => ({
            time: formatWeatherHour(weatherDto.hourly.time[index]),
            date: formatWeatherDay(weatherDto.hourly.time[index]),
            temperature: weatherDto.hourly.temperature_2m[index],
            iconWeather: getWeatherVisuals(weatherDto.hourly.weather_code[index]),
        })),
        daily: Array.from({ length: dailyCount }, (_, index) => ({
            date: formatWeatherDay(weatherDto.daily.time[index]),
            maxTemperature: weatherDto.daily.temperature_2m_max[index],
            minTemperature: weatherDto.daily.temperature_2m_min[index],
            iconWeather: getWeatherVisuals(weatherDto.daily.weather_code[index]),
        })),
    };
};