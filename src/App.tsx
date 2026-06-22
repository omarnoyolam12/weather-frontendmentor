import { NavBar, ScreenError, SkeletonLayout } from "@/presentation/components/shared";
import { SearchBar, DisplayCurrentWeather, DisplayDailyForecast, DisplayHourlyForcast } from "@/presentation/components/weather";
import { useWeather } from "@/presentation/hooks/useWeather";

export const App = () => {

  const { useQueryWeather, city, onSelectCity, units, setUnits } = useWeather();
  const { data: weather, isLoading, isError } = useQueryWeather;

  return (
    <div className="bg-brand-950 w-full min-h-dvh px-5 py-10">
      <div className="mx-auto container max-w-7xl">
        <NavBar units={units} setUnits={setUnits} />

        <h1 className="text-white text-center text-4xl md:text-5xl font-bricolage font-semibold my-20">
          How's the sky looking today?
        </h1>

        <header className="mx-auto w-full sm:max-w-1/2">
          <SearchBar
            city={city}
            onSelectCity={onSelectCity}
          />
        </header>

        {
          isLoading && (
            <div className="grid lg:grid-cols-3 gap-5 mt-20 justify-items-stretch">
              <SkeletonLayout />
            </div>
          )
        }

        {
          isError && (
            <ScreenError />
          )
        }

        {
          weather && !isLoading && (
            <div className="grid lg:grid-cols-3 gap-5 mt-20 justify-items-stretch">
              <div className="col-span-1 lg:col-span-2 space-y-10">
                <DisplayCurrentWeather
                  location={city!}
                  weather={weather.current}
                  units={units}
                />

                <DisplayDailyForecast
                  forecast={weather.daily}
                />
              </div>

              <div className="col-span-1 relative mt-5 lg:mt-0">
                <div className="lg:absolute lg:inset-0 lg:overflow-hidden bg-brand-800 rounded-xl p-4 flex flex-col gap-5">
                  <DisplayHourlyForcast hourlyForecast={weather.hourly} />
                </div>
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}
