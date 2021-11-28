import React from "react";

import { Box, Typography } from "../mui";
import CardContainer from "../CardContainer";
import WithLoader from "../WithLoader";

import { AlertSummary } from "../../service/weather/types";

import { LoadingStateEnum } from "../../context/reducer";
import { msg } from "../../constants";

import "./index.css";

type Props = {
  alerts?: Array<AlertSummary>;
};
const WeatherAlerts = (props: Props): React.ReactElement => {
  const { alerts = [] } = props;
  return (
    <CardContainer headerLabel={msg.alerts}>
      <WithLoader loadingKey={LoadingStateEnum.CURRENT_WEATHER}>
        <Box className="alerts-content-container">
          {alerts.length === 0 && (
            <Box className="alerts-no-alert-container">
              <Typography variant="h3">{msg.noAlert}</Typography>
            </Box>
          )}
          {alerts.length > 0 && (
            <Box className="alerts-list-container">
              {alerts.map((alert, index) => (
                <Row key={index} alert={alert} />
              ))}
            </Box>
          )}
        </Box>
      </WithLoader>
    </CardContainer>
  );
};

const Row = (props: { alert: AlertSummary }): React.ReactElement => {
  const { alert } = props;
  return (
    <Typography variant="h6" className="alert-event">
      {alert.event}
    </Typography>
  );
};

export default WeatherAlerts;
