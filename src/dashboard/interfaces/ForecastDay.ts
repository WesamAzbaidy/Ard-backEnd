import { WeatherCondition } from './WeatherCondition';

export interface ForecastDay {
  date: string;
  day: {
    avgtemp_c: number;
    avgtemp_f: number;
    condition: WeatherCondition;
  };
  astro: {
    sunrise: string;
    sunset: string;
  };
  hour: Array<{
    time: string;
    temp_c: number;
    temp_f: number;
    condition: WeatherCondition;
    wind_kph: number;
    wind_degree: number;
    wind_dir: string;
  }>;
}
