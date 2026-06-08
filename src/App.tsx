import { NavBar } from "@/presentation/components/shared";
import { SearchBar, DisplayCurrentWeather, DisplayDailyForecast, DisplayHourlyForcast } from "@/presentation/components/weather";
import type { DailyForecast } from "@/domain/entities/weather.entity";
import { mockHourlyForecast } from "@/data/hourly-forecast.mock";

import iconPrueba from "@/assets/images/weather/icon-sunny.webp"

const dailyForecastMock: DailyForecast[] = [
  { date: 'Mon', maxTemperature: 22, minTemperature: 14, iconWeather: { description: 'Sunny', iconUrl: iconPrueba } },
  { date: 'Tue', maxTemperature: 20, minTemperature: 13, iconWeather: { description: 'Partly cloudy', iconUrl: iconPrueba } },
  { date: 'Wed', maxTemperature: 18, minTemperature: 12, iconWeather: { description: 'Rain', iconUrl: iconPrueba } },
  { date: 'Thu', maxTemperature: 21, minTemperature: 15, iconWeather: { description: 'Cloudy', iconUrl: iconPrueba } },
  { date: 'Fri', maxTemperature: 23, minTemperature: 16, iconWeather: { description: 'Sunny', iconUrl: iconPrueba } },
  { date: 'Sat', maxTemperature: 24, minTemperature: 17, iconWeather: { description: 'Warm', iconUrl: iconPrueba } },
  { date: 'Sun', maxTemperature: 19, minTemperature: 13, iconWeather: { description: 'Breezy', iconUrl: iconPrueba } },
];

export const App = () => {
  return (
    <div className="bg-brand-950 w-full min-h-dvh px-5 py-10">
      <div className="mx-auto container max-w-7xl">
        <NavBar />

        <h1 className="text-white text-center text-4xl md:text-5xl font-bricolage font-semibold my-20">
          How's the sky looking today?
        </h1>

        <header className="mx-auto w-full sm:max-w-1/2">
          <SearchBar />
        </header>

        <div className="grid grid-cols-3 gap-5 mt-20 justify-items-stretch">

          <div className="col-span-2 space-y-10">
            <DisplayCurrentWeather
              location={{
                city: 'Berlin',
                country: 'Germany',
                latitude: 0,
                longitude: 0,
                state: ''
              }}
              weather={{
                feelsLike: 18,
                humidity: 46,
                windSpeed: 14,
                precipitation: 0,
                iconWeather: { description: 'Icono de prueba', iconUrl: iconPrueba },
                temperature: 20,
                time: 'Tuesday, Aug 5, 2025',
              }}
            />

            <DisplayDailyForecast
              forecast={dailyForecastMock}
            />
          </div>

          <div className="col-span-1 relative">
            <div className="absolute inset-0 overflow-hidden bg-brand-800 rounded-xl p-4 flex flex-col gap-5">
              <DisplayHourlyForcast hourlyForecast={mockHourlyForecast} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
