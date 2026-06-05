import type { FC } from 'react';
import type { CurrentWeather } from '@/domain/entities/weather.entity';
import type { LocationEntity } from '@/domain/entities/location.entity';

import { Text, CardCurrent } from '@/presentation/components/shared';

import bgLarge from "@/assets/images/app/bg-today-large.png";

interface Props {
    weather: CurrentWeather;
    location: LocationEntity;
}

export const DisplayCurrentWeather: FC<Props> = ({ weather, location }) => {

    const listCards = [
        {
            title: 'Feels like',
            value: `${weather.feelsLike}°`
        },
        {
            title: 'Humitidy',
            value: `${weather.humidity}%`
        },
        {
            title: 'Wind',
            value: `${weather.windSpeed} km/h`
        },
        {
            title: 'Precipitation',
            value: `${weather.precipitation} mm`
        },
    ];

    return (
        <section className='space-y-10'>
            <div
                className='flex justify-between items-center bg-center bg-cover w-full h-64 overflow-hidden rounded-xl p-5'
                style={{ backgroundImage: `url(${bgLarge})` }}
            >
                <div className='space-y-2'>
                    <Text
                        fontType='dm-sans'
                        className='text-white text-2xl font-bold'
                    >
                        {`${location.city}, ${location.country}`}
                    </Text>
                    <Text
                        fontType='dm-sans'
                        className='text-brand-200'
                    >
                        {weather.time}
                    </Text>
                </div>

                <div className='flex justify-between items-center gap-5'>
                    <img
                        src={weather.iconWeather.iconUrl}
                        className='w-24 h-24'
                        alt={weather.iconWeather.description}
                    />

                    <p className='text-white text-8xl italic'>
                        {weather.temperature}°
                    </p>
                </div>
            </div>

            <div className='grid grid-cols-2 lg:grid-cols-4 gap-5'>
                {
                    listCards.map(card => (
                        <CardCurrent
                            key={card.title}
                            title={card.title}
                            value={card.value}
                        />
                    ))
                }
            </div>
        </section>
    )
}
