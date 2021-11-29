export type LocationSuggestion = {
  name: string;
  country: string;
  localtime?: string;
};

export type WeatherCondition = {
  text: string;
  icon: string;
  code: number;
};

export type Weather = {
  temp_c: number; // 30;
  temp_f: number; // 86;
  condition: WeatherCondition;
  wind_mph: number; // 5.6;
  wind_kph: number; // 9;
  wind_dir: string; // "WSW";
  humidity: number; // 66;
  cloud: number; // 75;
  uv: number; // 7;
};

export type DayWeatherSummary = {
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
