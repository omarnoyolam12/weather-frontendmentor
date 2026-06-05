import type { FC } from 'react';
import type { DailyForecast } from '@/domain/entities/weather.entity';
import { Text, CardDaily } from '@/presentation/components/shared';

interface Props {
    forecast: DailyForecast[];
}

export const DisplayDailyForecast: FC<Props> = ({ forecast }) => {
    return (
        <section className='space-y-5'>
            <Text
                fontType='dm-sans'
                className='text-white'
            >
                Daily Forecast
            </Text>

            <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3'>
                {
                    forecast.map(daily => (
                        <CardDaily
                            key={daily.date}
                            daily={daily}
                        />
                    ))
                }
            </div>
        </section>
    )
}
