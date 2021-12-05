import { DataMetricEnum, InitialState } from "../../context/reducer";
import { WeatherCondition } from "../../service/weather/types";

export const condition: WeatherCondition = {
  code: 1,
  icon: "testIcon",
  text: "testText",
};

export const state: InitialState = {
  location: "Singapore",
  metric: DataMetricEnum.CELSIUS,
  alert: "",
  loadingStates: { CURRENT_WEATHER: false },
  currentWeather: {
    current: {
      uv: 10,
      cloud: 100,
      condition,
      humidity: 10,
      temp_c: 10,
      temp_f: 10,
      wind_dir: "SW",
      wind_kph: 10,
      wind_mph: 10,
    },
    forecast: {
      forecastday: [
        {
          date: "",
          day: {
            condition,
            uv: 10,
          },
          hour: [
            {
              chance_of_rain: 10,
              chance_of_snow: 10,
              condition,
              temp_c: 10,
              time: "",
            },
          ],
        },
      ],
    },
    location: {
      country: "Singapore",
      name: "Singapore",
      localtime: "Singapore",
    },
    alerts: { alert: [] },
  },
};
