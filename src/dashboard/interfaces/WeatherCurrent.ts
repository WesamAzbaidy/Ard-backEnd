import { WeatherCondition } from './WeatherCondition';

export interface WeatherCurrent {
  temp_c: number;
  temp_f: number;
  is_day: number;
  condition: WeatherCondition;
  wind_kph: number;
  humidity: number;
  uv: number;
  feelslike_c: number;
  feelslike_f: number;
  pressure_mb: number;
}
