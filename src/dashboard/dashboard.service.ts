import { HttpService } from '@nestjs/axios';
import { Injectable, BadRequestException } from '@nestjs/common';
import { firstValueFrom, catchError } from 'rxjs';
import { DashboardResponse } from './interfaces/DashboardResponse';
import { format } from 'date-fns';
import { AxiosError } from 'axios';
import { throwError } from 'rxjs';
import { WeatherApiError } from './interfaces/WeatherApiError';

@Injectable()
export class DashboardService {
  constructor(private readonly httpService: HttpService) {}

  async getWeather(q: string, key: string) {
    const url = `https://api.weatherapi.com/v1/forecast.json?q=${encodeURIComponent(q)}&days=5&key=${encodeURIComponent(key)}`;

    try {
      const response = await firstValueFrom(
        this.httpService.get<DashboardResponse>(url).pipe(
          catchError((error: AxiosError<WeatherApiError>) => {
            const errorMessage =
              error.response?.data?.error?.message ||
              'No matching location found.please try again.';
            return throwError(() => new BadRequestException(errorMessage));
          }),
        ),
      );

      const { location, current, forecast } = response.data;

      const weather = {
        name: location.name,
        lat: location.lat,
        lon: location.lon,
        localtime: format(new Date(location.localtime), 'HH:mm'),
        localdate: format(new Date(location.localtime), 'EEEE, dd MMM'),
      };

      const details = {
        temp_c: current.temp_c,
        temp_f: current.temp_f,
        condition: current.condition,
        wind_kph: current.wind_kph,
        humidity: current.humidity,
        uv: current.uv,
        pressure_mb: current.pressure_mb,
      };

      const forecastData = forecast.forecastday.map((forecastDay) => ({
        date: format(new Date(forecastDay.date), 'EEEE, dd MMM'),
        condition: forecastDay.day.condition,
        avgtemp_c: forecastDay.day.avgtemp_c,
        avgtemp_f: forecastDay.day.avgtemp_f,
      }));

      const astro = forecast.forecastday[0].astro;
      const hour = forecast.forecastday[0].hour.map((h) => ({
        condition: h.condition,
        temp_c: h.temp_c,
        temp_f: h.temp_f,
        time: h.time,
        wind_kph: h.wind_kph,
        wind_degree: h.wind_degree,
        wind_dir: h.wind_dir,
      }));

      return {
        weather,
        details,
        forecast: forecastData,
        astro,
        hour,
      };
    } catch (error) {
      // If it's already a BadRequestException, rethrow it
      if (error instanceof BadRequestException) {
        throw error;
      }
      // Otherwise, create a new BadRequestException
      throw new BadRequestException(
        error?.message || 'An error occurred while processing weather data',
      );
    }
  }
}
