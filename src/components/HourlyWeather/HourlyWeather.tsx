import React from "react";

import get from "lodash/get";

import { Box } from "../mui";
import WithLoader from "../WithLoader";
import HourWeatherCard from "./HourWeatherCard";

import { DataMetricEnum, LoadingStateEnum } from "../../context/reducer";
import {
  HourWeatherSummary,
  LocationSuggestion,
} from "../../service/weather/types";

import "./index.css";

type Props = {
  location?: LocationSuggestion;
  list?: Array<HourWeatherSummary>;
  metric: DataMetricEnum;
};
const HourlyWeather = (props: Props): React.ReactElement => {
  const { list, location, metric } = props;
  const localtime = get(location, "localtime");
  const currentHour = new Date(localtime || "").getHours();
  return (
    <WithLoader loadingKey={LoadingStateEnum.CURRENT_WEATHER}>
      <Box className="hour-list-container">
        {list &&
          list
            .slice(currentHour)
            .map((hourSummary) => (
              <HourWeatherCard
                key={hourSummary.time}
                summary={hourSummary}
                metric={metric}
              />
            ))}
      </Box>
    </WithLoader>
  );
};

export default HourlyWeather;
