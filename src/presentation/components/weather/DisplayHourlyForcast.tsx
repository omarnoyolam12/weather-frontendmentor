import type { FC } from 'react';
import { Text, CardHourly } from '@/presentation/components/shared';
import type { HourlyForecast } from '@/domain/entities/weather.entity';

interface Props {
    hourlyForecast: HourlyForecast[];
}

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const DisplayHourlyForcast: FC<Props> = ({ hourlyForecast }) => {
    return (
        <div className='flex flex-col h-full min-h-0 gap-5'>
            <div className='flex justify-between items-center gap-2'>
                <Text
                    fontType='dm-sans'
                    className='text-white'
                >
                    Hourly Forecast
                </Text>

                <select
                    name="days"
                    id="days"
                    value={'Monday'}
                    className='bg-brand-600 p-2 text-xs text-white font-dmsans rounded-lg appearance-none bg-no-repeat bg-right pointer-events-auto cursor-pointer'
                    style={{
                        backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                        backgroundPosition: 'right 0.3rem center',
                        backgroundSize: '1.2em 1.2em'
                    }}
                >
                    {
                        daysOfWeek.map(day => (
                            <option
                                key={day}
                                value={day}
                            >
                                {day}
                            </option>
                        ))
                    }
                </select>
            </div>

            <div className='space-y-3 flex-1 min-h-0 overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-brand-700 [&::-webkit-scrollbar-thumb]:rounded-full'>
                {
                    hourlyForecast.map((hourly, index) => (
                        <CardHourly key={index} hourly={hourly} />
                    ))
                }
            </div>
        </div>
    )
}