import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';

// Mock data for the weather API response
const mockWeatherResponse = {
  data: {
    location: {
      name: 'Amman',
      lat: 31.95,
      lon: 35.93,
      localtime: '2025-04-29 15:30',
    },
    current: {
      temp_c: 22.5,
      temp_f: 72.5,
      condition: {
        text: 'Sunny',
        icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
      },
      wind_kph: 12.6,
      humidity: 55,
      uv: 5,
      pressure_mb: 1012,
    },
    forecast: {
      forecastday: [
        {
          date: '2025-04-29',
          day: {
            condition: {
              text: 'Sunny',
              icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
            },
            avgtemp_c: 23,
            avgtemp_f: 73.4,
          },
          astro: {
            sunrise: '05:45 AM',
            sunset: '07:15 PM',
          },
          hour: [
            {
              time: '2025-04-29 00:00',
              temp_c: 19.5,
              temp_f: 67.1,
              condition: {
                text: 'Clear',
                icon: '//cdn.weatherapi.com/weather/64x64/night/113.png',
              },
              wind_kph: 8.6,
              wind_degree: 220,
              wind_dir: 'SW',
            },
            // More hours would be here...
          ],
        },
        // More forecast days would be here...
      ],
    },
  },
};

describe('DashboardController (e2e)', () => {
  let app: INestApplication;
  let httpService: HttpService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(HttpService)
      .useValue({
        get: jest.fn(() => of(mockWeatherResponse)),
      })
      .compile();

    app = moduleFixture.createNestApplication();
    httpService = moduleFixture.get<HttpService>(HttpService);
    await app.init();
  });

  it('/dashboard/weather?q=Amman (GET)', async () => {
    const res = await request(app.getHttpServer())
      .get('/dashboard/weather?q=Amman')
      .expect(200);

    // Verify the response structure matches what we expect
    expect(res.body).toHaveProperty('weather');
    expect(res.body).toHaveProperty('details');
    expect(res.body.weather.name).toBe('Amman');
    expect(res.body.details.temp_c).toBe(22.5);
    expect(res.body.forecast).toBeInstanceOf(Array);
  });

  afterAll(async () => {
    await app.close();
  });
});
