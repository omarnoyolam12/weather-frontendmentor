import { type FC } from 'react';
import { Combobox, ComboboxInput, ComboboxOptions, ComboboxOption } from '@headlessui/react';
import { useLocation } from "@/presentation/hooks/useLocation";
import type { LocationEntity } from "@/domain/entities/location.entity";
import searchIcon from "@/assets/images/icons/icon-search.svg";

interface Props {
    city: LocationEntity | undefined;
    onSelectCity: (city: LocationEntity) => void;
}

export const SearchBar: FC<Props> = ({ city: citySelected, onSelectCity }) => {

    const { useQueryLocation, query, setQuery } = useLocation();
    const { data: cities = [], isLoading } = useQueryLocation;

    return (
        <Combobox
            onChange={(city: LocationEntity | null) => city && onSelectCity(city)}
        >
            <div className="w-full relative">
                <form
                    className="flex justify-between items-center gap-5 flex-wrap"
                    onSubmit={(e) => e.preventDefault()} // Evita que recargue la página
                >
                    <label className="flex items-center bg-brand-800 px-5 py-3 grow gap-4 rounded-xl focus-within:ring-1 focus-within:ring-blueapp-500 transition-shadow">
                        <img
                            src={searchIcon}
                            className="cursor-pointer"
                            alt="Icon Search"
                        />

                        <ComboboxInput
                            placeholder="Search for a place..."
                            className="placeholder:text-brand-200 placeholder:font-dmsans text-lg grow focus:outline-none caret-brand-200 text-brand-200 font-dmsans bg-transparent"
                            displayValue={() => citySelected ? `${citySelected.city}, ${citySelected.country}` : query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </label>

                    <button
                        type="button"
                        className="text-white font-dmsans font-light bg-blueapp-500 w-full lg:w-32 p-3 rounded-xl text-lg cursor-pointer hover:bg-blueapp-500/80 transition-all duration-300"
                        onClick={() => citySelected && onSelectCity(citySelected)}
                    >
                        Search
                    </button>
                </form>

                <ComboboxOptions
                    className="absolute mt-2 max-h-60 w-full overflow-auto rounded-xl bg-brand-800 py-2 shadow-2xl focus:outline-none text-sm z-50 border border-brand-700/50 backdrop-blur-md scrollbar-thin scrollbar-thumb-brand-600">

                    {isLoading && (
                        <div className="relative cursor-default select-none py-3 px-5 text-brand-200 font-dmsans italic animate-pulse">
                            Searching cities...
                        </div>
                    )}

                    {cities.length === 0 && query.trim().length > 2 && !isLoading && (
                        <div className="relative cursor-default select-none py-3 px-5 text-brand-200 font-dmsans">
                            No cities found.
                        </div>
                    )}

                    {cities!.map((city) => (
                        <ComboboxOption
                            key={`${city.latitude}-${city.longitude}`}
                            value={city}
                            className="relative cursor-pointer select-none py-3 px-5 font-dmsans transition-colors text-brand-200 focus:bg-blueapp-500 focus:text-white hover:bg-brand-600"
                        >
                            <div className="flex flex-col">
                                <span className="font-medium text-lg">{city.city}</span>
                                <span className="text-xs transition-colors text-brand-200/60 focus-within:text-blueapp-100 group-focus:text-blueapp-100 data-focus:text-blueapp-100">
                                    {city.state ? `${city.state}, ` : ''}{city.country}
                                </span>
                            </div>
                        </ComboboxOption>
                    ))}
                </ComboboxOptions>
            </div>
        </Combobox>
    )
}
