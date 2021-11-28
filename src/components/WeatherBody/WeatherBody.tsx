import React, { useContext, useEffect } from "react";
import isEmpty from "lodash/isEmpty";

import weatherService from "../../service/weather";
import DateTimeUtil from "../../utils/DateTimeUtil";

import { WeatherAppContext } from "../../context/WeatherAppContext";

import { Box, Typography, IconButton, RefreshIcon, Divider } from "../mui";
import CurrentWeatherCard from "../CurrentWeatherCard";
import UVCard from "../UVCard";
import WeatherAlerts from "../WeatherAlerts";
import HourlyWeather from "../HourlyWeather";

import { ForecastWeather } from "../../service/weather/types";
import { Actions, LoadingStateEnum } from "../../context/reducer";

import "./WeatherBody.css";
import { msg } from "../../constants";

const WeatherBody = (): React.ReactElement => {
  const { state, dispatch } = useContext(WeatherAppContext);
  const { location, currentWeather, metric } = state;

  const handleResponse = (data: ForecastWeather) => {
    dispatch({ type: Actions.SET_CURRENT_WEATHER, data });
    dispatch({
      type: Actions.STOP_LOADING,
      data: LoadingStateEnum.CURRENT_WEATHER,
    });
  };

  const getWeather = (): void => {
    if (!isEmpty(location)) {
      dispatch({
        type: Actions.START_LOADING,
        data: LoadingStateEnum.CURRENT_WEATHER,
      });
      weatherService
        .getCurrentWeather(location)
        .then(handleResponse)
        .catch(() =>
          dispatch({ type: Actions.SHOW_ERROR, data: msg.retryAgain })
        );
    }
  };

  useEffect(() => {
    getWeather();
  }, [location]);

  const onRefresh = () => getWeather();

  return (
    <Box className="weather-container">
      <Box className="header-container">
        <Typography variant="h4">{location}</Typography>
        <IconButton onClick={onRefresh}>
          <RefreshIcon className="icon-refresh" />
        </IconButton>
      </Box>
      <Divider />
      <Box className="section2">
        <CurrentWeatherCard weather={currentWeather?.current} metric={metric} />
        <UVCard uv={currentWeather?.current.uv} />
        <WeatherAlerts alerts={currentWeather?.alerts?.alert} />
      </Box>
      <Divider />
      <Box className="section3">
        <Typography variant="h4">
          {msg.hourlyLabel} - &nbsp;
          {DateTimeUtil.getToday(currentWeather?.location?.localtime)}
        </Typography>
        <HourlyWeather
          location={currentWeather?.location}
          list={currentWeather?.forecast.forecastday[0].hour}
          metric={metric}
        />
      </Box>
    </Box>
  );
};

export default WeatherBody;
