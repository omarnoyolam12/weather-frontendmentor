export const formatWeatherDate = (isoString: string): string => {
    const date = new Date(isoString);

    return new Intl.DateTimeFormat('en-US', {
        weekday: 'long',  // "Tuesday"
        month: 'short',    // "Aug"
        day: 'numeric',   // "5"
        year: 'numeric'   // "2025"
    }).format(date);
};

export const formatWeatherHour = (isoString: string): string => {
    const date = new Date(isoString);

    return new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    }).format(date);
};

export const formatWeatherDay = (isoString: string): string => {
    const date = new Date(isoString);

    return new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
    }).format(date);
};