export type LocationSuggestion = {
  id: number;
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  url: number;
  localtime?: string;
};

export type WeatherCondition = {
  text: string;
  icon: string;
  code: number;
};

export type Weather = {
  last_updated_epoch: number; // 1638069300;
  last_updated: string; // "2021-11-28 11:15";
  temp_c: number; // 30;
  temp_f: number; // 86;
  is_day: number; // 1;
  condition: WeatherCondition;
  wind_mph: number; // 5.6;
  wind_kph: number; // 9;
  wind_degree: number; // 250;
  wind_dir: string; // "WSW";
  pressure_mb: number; // 1010;
  pressure_in: number; // 29.83;
  precip_mm: number; // 0;
  precip_in: number; // 0;
  humidity: number; // 66;
  cloud: number; // 75;
  feelslike_c: number; // 35.7;
  feelslike_f: number; // 96.3;
  vis_km: number; // 10;
  vis_miles: number; // 6;
  uv: number; // 7;
  gust_mph: number; // 2.9;
  gust_kph: number; // 4.7;
};

export type DayWeatherSummary = {
  maxtemp_c: number;
  maxtemp_f: number;
  mintemp_c: number;
  mintemp_f: number;
  avgtemp_c: number;
  avgtemp_f: number;
  maxwind_mph: number;
  maxwind_kph: number;
  totalprecip_in: number;
  totalprecip_mm: number;
  avgvis_km: number;
  avgvis_miles: number;
  avghumidity: number;
  daily_will_it_rain: number;
  daily_chance_of_rain: number;
  daily_will_it_snow: number;
  daily_chance_of_snow: number;
  condition: WeatherCondition;
  uv: number;
};

export type HourWeatherSummary = {
  chance_of_rain: number;
  chance_of_snow: number;
  condition: WeatherCondition;
  temp_c: number;
  time: string;
};

export type ForecastDayWeather = {
  date: string; //"2021-11-28";
  day: DayWeatherSummary;
  hour: Array<HourWeatherSummary>;
};

export type AlertSummary = {
  event: string;
};

export type ForecastWeather = {
  location: LocationSuggestion;
  current: Weather;
  forecast: { forecastday: Array<ForecastDayWeather> };
  alerts?: {
    alert: Array<AlertSummary>;
  };
};
