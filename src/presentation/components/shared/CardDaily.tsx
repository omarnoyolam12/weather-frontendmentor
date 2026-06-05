import type { FC } from 'react';
import { Text } from '@/presentation/components/shared';
import type { DailyForecast } from '@/domain/entities/weather.entity';

interface Props {
    daily: DailyForecast;
}

export const CardDaily: FC<Props> = ({ daily }) => {
    return (
        <div
            className='bg-brand-800 border px-3 py-3 h-40 border-brand-600 rounded-xl flex flex-col justify-between items-center'
        >
            <Text
                fontType='dm-sans'
                className='text-white text-center'
            >
                {daily.date}
            </Text>

            <img
                src={daily.iconWeather.iconUrl}
                className='w-16 h-16'
                alt={daily.iconWeather.description}
            />

            <div className='flex justify-between items-center w-full'>
                <Text
                    fontType='dm-sans'
                    className='text-white'
                >
                    {daily.maxTemperature}°
                </Text>

                <Text
                    fontType='dm-sans'
                    className='text-brand-300'
                >
                    {daily.minTemperature}°
                </Text>
            </div>
        </div>
    )
}
