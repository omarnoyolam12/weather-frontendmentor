import type { FC, ComponentPropsWithoutRef } from 'react';

interface Props extends ComponentPropsWithoutRef<'p'> {
    fontType: 'dm-sans' | 'gricolage',
}

export const Text: FC<Props> = ({ fontType, className, children, ...props }) => {
    return (
        <p
            className={`${fontType === 'dm-sans' ? 'font-dmsans' : 'font-bricolage'} ${className}`}
            {...props}
        >
            {children}
        </p>
    )
}
