// @ts-nocheck

import {
  cleanup,
  render,
  act,
  within,
  fireEvent,
  waitFor,
} from "@testing-library/react";

import WeatherApp from "../WeatherApp";
import { WeatherAppProvider } from "../context/WeatherAppContext";

import { currentLocation as mockCurrentLocation } from "./mockData/currentLocation.mock";
import {
  mockLocationSuggestions,
  mockWeatherForecast,
} from "./mockData/weather.mock";

import { URL_GET_LOCATION as mock_URL_GET_LOCATION } from "../service/location";
import {
  URL_GET_LOCATION_SUGGESTIONS as mock_URL_GET_LOCATION_SUGGESTIONS,
  URL_FORECAST_WEATHER as mock_URL_FORECAST_WEATHER,
} from "../service/weather";

describe("Weather App", () => {
  let wrapper;
  afterEach(cleanup);
  beforeEach(() => {
    wrapper = undefined;
  });

  it("App loads correctly with all components", async () => {
    await act(async () => {
      wrapper = render(
        <WeatherAppProvider>
          <WeatherApp />
        </WeatherAppProvider>
      );
    });
    expect(wrapper.getByTestId("weather-container")).toBeInTheDocument();
    expect(wrapper.getByTestId("weather-header")).toBeInTheDocument();
    expect(wrapper.getByTestId("weather-body")).toBeInTheDocument();
    expect(wrapper.getByTestId("location_search_input")).toBeInTheDocument();
  });

  it("Search for Location", async () => {
    await mockAxios();
    act(() => {
      wrapper = render(
        <WeatherAppProvider>
          <WeatherApp />
        </WeatherAppProvider>
      );
      const autocomplete = wrapper.getByTestId("location_search_input");
      const input = within(autocomplete).getByRole("textbox");
      autocomplete.focus();
      fireEvent.change(input, { target: { value: "Singapore" } });
      fireEvent.keyDown(autocomplete, { key: "ArrowDown" });
      fireEvent.keyDown(autocomplete, { key: "Enter" });
    });
    await waitFor(() =>
      expect(
        wrapper.getByTestId("weather-current-location-label")
      ).toBeInTheDocument()
    );
    await waitFor(() => {
      expect(wrapper.queryByText("abcd")).not.toBeInTheDocument();
    });
  });

  it("Search for Location and get current weather", async () => {
    await mockAxios();
    await act(() => {
      wrapper = render(
        <WeatherAppProvider>
          <WeatherApp />
        </WeatherAppProvider>
      );
      const autocomplete = wrapper.getByTestId("location_search_input");
      const input = within(autocomplete).getByRole("textbox");
      autocomplete.focus();
      fireEvent.change(input, { target: { value: "Singapore" } });
      fireEvent.keyDown(autocomplete, { key: "ArrowDown" });
      fireEvent.keyDown(autocomplete, { key: "Enter" });
    });
    expect(
      wrapper.getByTestId("weather-current-location-label")
    ).toBeInTheDocument();
    expect(
      wrapper.getByTestId("weather-hour-list-container")
    ).toBeInTheDocument();
  });
});

const mockAxios = () => {
  jest.mock("axios", () => ({
    get: jest.fn((url) => {
      return new Promise((resolve) => {
        switch (url) {
          case mock_URL_GET_LOCATION:
            return resolve({ data: mockCurrentLocation });
          case mock_URL_GET_LOCATION_SUGGESTIONS:
            return resolve({ data: mockLocationSuggestions });
          case mock_URL_FORECAST_WEATHER:
            return resolve({ data: mockWeatherForecast });
          default:
            return Promise.reject(new Error("not found"));
        }
      });
    }),
  }));
};
