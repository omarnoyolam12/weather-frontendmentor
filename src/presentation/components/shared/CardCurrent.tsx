import type { FC } from 'react';
import { Text } from '@/presentation/components/shared';

interface Props {
    title: string;
    value: string;
}

export const CardCurrent: FC<Props> = ({ title, value }) => {
    return (
        <div className='bg-brand-800 p-4 rounded-lg border border-brand-600 space-y-5'>
            <Text
                fontType='dm-sans'
                className='text-brand-200'
            >
                {title}
            </Text>

            <Text
                fontType='dm-sans'
                className='text-white font-extralight text-2xl'
            >
                {value}
            </Text>
        </div>
    )
}
