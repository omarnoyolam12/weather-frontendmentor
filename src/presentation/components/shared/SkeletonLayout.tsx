import type { FC } from 'react';

export const SkeletonLayout: FC = () => {
    return (
        <>
            <div className="col-span-1 lg:col-span-2 space-y-6 animate-pulse">
                <div className="w-full h-64 rounded-xl bg-brand-800" />

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                    <div className="h-24 rounded-lg bg-brand-800" />
                    <div className="h-24 rounded-lg bg-brand-800" />
                    <div className="h-24 rounded-lg bg-brand-800" />
                    <div className="h-24 rounded-lg bg-brand-800" />
                </div>

                <div className="space-y-3">
                    <div className="h-6 w-40 rounded bg-brand-800" />
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="h-28 rounded-lg bg-brand-800" />
                        ))}
                    </div>
                </div>
            </div>

            <div className="col-span-1 relative mt-5 lg:mt-0 animate-pulse">
                <div className="lg:absolute lg:inset-0 lg:overflow-hidden bg-brand-800 rounded-xl p-4 flex flex-col gap-4">
                    <div className="h-6 w-32 rounded bg-brand-700" />
                    <div className="space-y-2 overflow-auto">
                        {Array.from({ length: 12 }).map((_, i) => (
                            <div key={i} className="flex items-center justify-between gap-4">
                                <div className="h-8 w-8 rounded-full bg-brand-700" />
                                <div className="h-4 w-24 rounded bg-brand-700" />
                                <div className="h-4 w-12 rounded bg-brand-700 ml-auto" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default SkeletonLayout;
