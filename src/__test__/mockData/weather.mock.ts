import {
  LocationSuggestion,
  ForecastWeather,
} from "../../service/weather/types";

export const mockLocationSuggestions: Array<LocationSuggestion> = [
  { name: "Singapore", country: "Singapore" },
];

export const mockWeatherForecast: ForecastWeather = {
  location: { name: "Singapore", country: "Singapore" },
  current: {
    temp_c: 30,
    temp_f: 86,
    condition: {
      code: 123,
      icon: "",
      text: "Cloudy",
    },
    wind_mph: 5.6,
    wind_kph: 9,
    wind_dir: "WSW",
    humidity: 66,
    cloud: 75,
    uv: 7,
  },
  forecast: {
    forecastday: [
      {
        date: "",
        hour: [],
        day: { uv: 1, condition: { code: 123, icon: "", text: "" } },
      },
    ],
  },
};
