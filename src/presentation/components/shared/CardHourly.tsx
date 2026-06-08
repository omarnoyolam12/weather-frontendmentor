import type { FC } from 'react';
import type { HourlyForecast } from '@/domain/entities/weather.entity';
import { Text } from '@/presentation/components/shared';

interface Props {
    hourly: HourlyForecast;
}

export const CardHourly: FC<Props> = ({ hourly }) => {
    return (
        <div className='flex justify-between items-center gap-4 bg-brand-700 px-4 py-2 border border-brand-600 rounded-xl'>
            <div className='flex items-center gap-4'>
                <img
                    src={hourly.iconWeather.iconUrl}
                    className='w-12 h-12'
                    alt={hourly.iconWeather.description}
                />

                <Text
                    fontType='dm-sans'
                    className='text-white text-lg font-light'
                >
                    {hourly.time}
                </Text>
            </div>

            <Text
                fontType='dm-sans'
                className='text-sm text-white'
            >
                {hourly.temperature}°
            </Text>
        </div>
    )
}
