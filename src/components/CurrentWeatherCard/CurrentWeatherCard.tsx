import React from "react";

import get from "lodash/get";

import { DataMetricEnum, LoadingStateEnum } from "../../context/reducer";

import { Box, Divider, Typography } from "../mui";
import CardContainer from "../CardContainer";
import WithLoader from "../WithLoader";

import { Weather } from "../../service/weather/types";

import { msg } from "../../constants";
import "./index.css";

type Props = {
  weather?: Weather;
  metric: DataMetricEnum;
};
const CurrentWeatherCard = (props: Props): React.ReactElement => {
  const { weather, metric } = props;

  const getTemperature = () => {
    if (!weather) return "";
    const key = metric === DataMetricEnum.FAHRENHEIT ? "temp_f" : "temp_c";
    const unit = metric === DataMetricEnum.FAHRENHEIT ? "F" : "C";
    return `${get(weather, key)}°${unit}`;
  };

  return (
    <CardContainer headerLabel={msg.currentWeather}>
      <WithLoader loadingKey={LoadingStateEnum.CURRENT_WEATHER}>
        <Box className="weather-card-container">
          <Box className="weather-card-section1">
            <img alt="condition" src={weather?.condition.icon} width="30%" />
            <Typography variant="h3">{getTemperature()}</Typography>
          </Box>
          <Typography>{weather?.condition.text}</Typography>
          <Divider />
          <Box className="weather-card-info-container">
            <InfoSection
              label={msg.humidity}
              value={`${get(weather, "humidity", "")}%`}
            />
          </Box>
          <Divider />
          <Box className="weather-card-info-container">
            <InfoSection
              label={msg.wind}
              value={`${get(weather, "wind_kph", "")} kmph, ${get(
                weather,
                "wind_dir",
                ""
              )}`}
            />
          </Box>
        </Box>
      </WithLoader>
    </CardContainer>
  );
};

const InfoSection = (props: {
  label: string;
  value: string;
}): React.ReactElement => {
  const { label, value } = props;
  return (
    <Box className="info-section-container">
      <Typography variant="h4">{label}</Typography>
      <Typography variant="h5">{value}</Typography>
    </Box>
  );
};

export default CurrentWeatherCard;
