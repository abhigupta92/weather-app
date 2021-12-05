// @ts-nocheck

import {
  cleanup,
  render,
  act,
  within,
  fireEvent,
} from "@testing-library/react";
import restClient from "../service/restClient/index";
import weatherService from "../service/weather";
import locationService from "../service/location";

import WeatherApp from "../WeatherApp";
import { WeatherAppContext } from "../context/WeatherAppContext";

import { mockCurrentLocation } from "./mockData/currentLocation.mock";
import {
  mockLocationSuggestions,
  mockWeatherForecast,
} from "./mockData/weather.mock";

import { state } from "./mockData/mockContextState";

jest.mock("../service/restClient");
jest.mock("../service/weather");
jest.mock("../service/location");

const customRender = (ui: any, { providerProps, ...renderOptions }: any) => {
  return render(
    <WeatherAppContext.Provider {...providerProps}>
      {ui}
    </WeatherAppContext.Provider>,
    renderOptions
  );
};

describe("Weather App", () => {
  let wrapper: any;
  let providerProps: any;
  afterEach(cleanup);
  beforeEach(async () => {
    await mockRestClient();
    wrapper = undefined;
    providerProps = {
      value: { state, dispatch: () => {} },
    };
  });

  it("App loads correctly with all components", () => {
    act(() => {
      wrapper = customRender(<WeatherApp />, { providerProps });
    });
    expect(wrapper.getByTestId("weather-container")).toBeInTheDocument();
    expect(wrapper.getByTestId("weather-header")).toBeInTheDocument();
    expect(wrapper.getByTestId("weather-body")).toBeInTheDocument();
    expect(wrapper.getByTestId("location_search_input")).toBeInTheDocument();
  });

  it("Search for Location", () => {
    act(() => {
      wrapper = customRender(<WeatherApp />, { providerProps });
    });
    act(() => {
      const autocomplete = wrapper.getByTestId("location_search_input");
      const input = within(autocomplete).getByRole("textbox");
      autocomplete.focus();
      fireEvent.change(input, { target: { value: "Singapore" } });
      fireEvent.keyDown(autocomplete, { key: "ArrowDown" });
      fireEvent.keyDown(autocomplete, { key: "Enter" });
    });
    const label = wrapper.getByTestId("weather-current-location-label");
    expect(label).toHaveTextContent("Singapore");
  });

  it("Search for Location and get current weather", () => {
    act(() => {
      wrapper = customRender(<WeatherApp />, { providerProps });
    });
    act(() => {
      const autocomplete = wrapper.getByTestId("location_search_input");
      const input = within(autocomplete).getByRole("textbox");
      autocomplete.focus();
      fireEvent.change(input, { target: { value: "Singapore" } });
      fireEvent.keyDown(autocomplete, { key: "ArrowDown" });
      fireEvent.keyDown(autocomplete, { key: "Enter" });
    });
    expect(wrapper.getByTestId("current-card-temp")).toHaveTextContent("10");
    expect(wrapper.getByTestId("current-card-weather")).toHaveTextContent(
      "testText"
    );
    expect(wrapper.getByTestId("uv-card-uv")).toHaveTextContent("10");
    expect(wrapper.getByTestId("uv-card-alert")).toHaveTextContent("Extreme");
  });
});

const mockRestClient = () => {
  // restClient.get.mockResolvedValueOnce({});
  // restClient.get.mockImplementationOnce(() => Promise.resolve({ data: {} }));
  jest.mock("axios", () => ({
    get: jest.fn(() => {
      return Promise.resolve();
    }),
  }));
  restClient.get.mockImplementationOnce(() => Promise.resolve({ data: {} }));
  locationService.getCurrentLocation.mockImplementationOnce(() =>
    Promise.resolve({ data: mockCurrentLocation })
  );
  weatherService.getCurrentWeather.mockImplementationOnce(() =>
    Promise.resolve({ data: mockWeatherForecast })
  );
  weatherService.getLocationSuggestions.mockImplementationOnce(() =>
    Promise.resolve({ data: mockLocationSuggestions })
  );
};
