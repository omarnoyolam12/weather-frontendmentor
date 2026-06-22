export interface Units {
    temperature_unit: Temperatue
    wind_speed_unit: Speed
    precipitation_unit: Precipitation
}

export type Temperatue = 'fahrenheit' | 'celsius';
export type Speed = 'mph' | 'kmh';
export type Precipitation = 'inch' | 'mm';