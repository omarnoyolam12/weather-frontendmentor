// 1. Lo que necesita la tarjeta grande azul y las 4 métricas pequeñas
export interface CurrentWeather {
    time: string;
    temperature: number;      // El 73.0°F grande
    humidity: number;         // 49%
    feelsLike: number;        // 74.9°F
    precipitation: number;    // 0.004 in
    windSpeed: number;        // 3.7 mph
    weatherCode: number;      // Código WMO limpio
}

// 2. Lo que necesita cada fila de la barra de la derecha (3 PM, 4 PM...)
export interface HourlyForecast {
    time: string;             // Ya formateado o listo para formatear (ej: "15:00")
    date: string;             // El Mapper ya inyectará aquí: "Tuesday", "Wednesday", etc.
    temperature: number;      // 68°
    weatherCode: number;      // Para elegir el icono de esa hora
}

// 3. Lo que necesita cada tarjeta de los 7 días de abajo
export interface DailyForecast {
    date: string;             // Nombre del día o fecha (ej: "Tue", "Wed")
    weatherCode: number;      // Para el icono del día
    maxTemperature: number;   // 73.3°
    minTemperature: number;   // 57.0°
}

// 4. LA ENTIDAD GLOBAL: El objeto final que tu hook entregará a la UI
export interface WeatherEntity {
    current: CurrentWeather;
    hourly: HourlyForecast[]; // Un array limpio de horas
    daily: DailyForecast[];   // Un array limpio de 7 días
}