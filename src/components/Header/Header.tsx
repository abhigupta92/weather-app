import React, { useContext } from "react";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";

import { WeatherAppContext } from "../../context/WeatherAppContext";

import { AppBar, Box, Toolbar, Typography, Stack } from "../mui";
import LocationSearch from "../LocationSearch";
import AntSwitch from "../AntSwitch";

import { LocationSuggestion } from "../../service/weather/types";
import { Actions, DataMetricEnum } from "../../context/reducer";

import { msg } from "../../constants";
import "./index.css";

const Header = (): React.ReactElement => {
  const { dispatch } = useContext(WeatherAppContext);

  const onChange = (option: LocationSuggestion) => {
    const locationName = get(option, "name", "");
    if (!isEmpty(locationName))
      dispatch({ type: Actions.SET_LOCATION, data: locationName });
  };

  const onChangeMetric = (
    _event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    if (checked)
      dispatch({ type: Actions.SET_METRIC, data: DataMetricEnum.FAHRENHEIT });
    else dispatch({ type: Actions.SET_METRIC, data: DataMetricEnum.CELSIUS });
  };

  return (
    <Box sx={{ flexGrow: 1 }} data-testid="weather-header">
      <AppBar position="static">
        <Toolbar className="app-header-container">
          <Box display="flex">
            <Typography variant="h6" className="header-label">
              {msg.appHeaderLabel}
            </Typography>
            <Stack
              className="toggle-container"
              direction="row"
              spacing={1}
              alignItems="center"
            >
              <Typography>{msg.celsius}</Typography>
              <AntSwitch
                onChange={onChangeMetric}
                inputProps={{ "aria-label": "ant design" }}
              />
              <Typography>{msg.fahrenheit}</Typography>
            </Stack>
          </Box>
          <LocationSearch onChange={onChange} />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
