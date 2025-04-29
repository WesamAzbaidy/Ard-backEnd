import { WeatherLocation } from './WeatherLocation';
import { WeatherCurrent } from './WeatherCurrent';
import { WeatherForecast } from './WeatherForecast';

export interface DashboardResponse {
  location: WeatherLocation;
  current: WeatherCurrent;
  forecast: WeatherForecast;
}
