import React from "react";

import get from "lodash/get";

import { Card, CardContent, Box, Typography, SnowIcon } from "../mui";
import { ReactComponent as RainIcon } from "../../assets/images/rain.svg";

import DateTimeUtil from "../../utils/DateTimeUtil";

import { HourWeatherSummary } from "../../service/weather/types";
import { DataMetricEnum } from "../../context/reducer";

import "./index.css";

type Props = {
  summary: HourWeatherSummary;
  metric: DataMetricEnum;
};
const HourWeatherCard = (props: Props): React.ReactElement => {
  const { summary, metric } = props;
  const date = new Date(summary.time);
  const hour = DateTimeUtil.getTimeAMPMFormat(date.getHours());

  const getTemperature = () => {
    if (!summary) return "";
    const key = metric === DataMetricEnum.FAHRENHEIT ? "temp_f" : "temp_c";
    const unit = metric === DataMetricEnum.FAHRENHEIT ? "F" : "C";
    return `${get(summary, key)}°${unit}`;
  };

  return (
    <Card
      className="list-item-container"
      data-testid="weather-hour-card-container"
    >
      <CardContent className="list-item-container-inner">
        <Box className="list-item-hour" display="flex" flex={1}>
          <Typography>{hour}</Typography>
        </Box>
        <Box className="list-item-icon">
          <img src={summary.condition.icon} alt="condition" />
        </Box>
        <Box className="list-item-temp">
          <Typography variant="h4">{getTemperature()}</Typography>
        </Box>
        <Box className="list-item-text">
          <Typography>{summary.condition.text}</Typography>
        </Box>
        <Box className="list-item-rain">
          <RainIcon />
          &nbsp;<Typography>{summary.chance_of_rain}%</Typography>
        </Box>
        <Box className="list-item-snow">
          <SnowIcon style={{ color: "#878787" }} />
          &nbsp;<Typography>{summary.chance_of_snow}%</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default HourWeatherCard;
