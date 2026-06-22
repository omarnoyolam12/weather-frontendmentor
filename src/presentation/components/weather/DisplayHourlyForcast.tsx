import { type FC, useState, useCallback } from 'react';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';

import { Text, CardHourly } from '@/presentation/components/shared';
import type { HourlyForecast } from '@/domain/entities/weather.entity';
import dropdown from "@/assets/images/icons/icon-dropdown.svg";
import checkmark from "@/assets/images/icons/icon-checkmark.svg";

interface Props {
    hourlyForecast: HourlyForecast[];
}

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const DisplayHourlyForcast: FC<Props> = ({ hourlyForecast }) => {

    const [selected, setSelected] = useState(daysOfWeek[1]);
    const filterForecast = useCallback(() => hourlyForecast.filter(hour => hour.date === selected && hour), [selected]);

    return (
        <div className='flex flex-col h-full min-h-0 gap-5'>
            <div className='flex justify-between items-center gap-2'>
                <Text
                    fontType='dm-sans'
                    className='text-white'
                >
                    Hourly Forecast
                </Text>

                <Listbox value={selected} onChange={setSelected}>
                    <ListboxButton
                        className="bg-brand-600 p-2 text-xs text-white font-dmsans rounded-lg appearance-none bg-no-repeat bg-right pointer-events-auto cursor-pointer flex justify-between items-center gap-3"
                    >
                        <Text fontType='dm-sans'>
                            {selected}
                        </Text>

                        <img src={dropdown} alt="Dropwown" />
                    </ListboxButton>

                    <ListboxOptions
                        anchor="bottom"
                        transition
                        className='rounded-xl w-40 border border-brand-600 bg-brand-800 p-2 [--anchor-gap:--spacing(1)] focus:outline-none
                        transition duration-100 ease-in data-leave:data-closed:opacity-0'
                    >
                        {daysOfWeek.map(day => (
                            <ListboxOption
                                key={day}
                                value={day}
                                className="group flex items-center gap-2 rounded-lg px-3 py-1.5 select-none data-focus:bg-white/10 cursor-pointer"
                            >
                                <img
                                    className="invisible size-4 fill-white group-data-selected:visible"
                                    src={checkmark}
                                    alt="Drop"
                                />
                                <div className="text-sm/6 text-white">{day}</div>
                            </ListboxOption>
                        ))}
                    </ListboxOptions>
                </Listbox>
            </div>

            <div className='space-y-3 flex-1 min-h-0 overflow-y-auto scrollbar-thin scrollbar-thumb-brand-600'>
                {
                    filterForecast().map((hourly, index) => (
                        <CardHourly key={index} hourly={hourly} />
                    ))
                }
            </div>
        </div>
    )
}