import React, { useContext, useEffect } from "react";

import { WeatherAppContext } from "../../context/context";

import Mui from "../../mui";
import LocationSearch from "../LocationSearch";

const Header = (): React.ReactElement => {
  const { state, dispatch } = useContext(WeatherAppContext);
  const { location } = state;

  const onChangeLocation = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { target } = event;
    const searchLocation = target.value;
    console.log("searchLocation :", searchLocation);
  };

  return (
    <Mui.Box sx={{ flexGrow: 1 }}>
      <Mui.AppBar position="static">
        <Mui.Toolbar>
          <Mui.Typography
            variant="h6"
            noWrap
            paddingRight={2}
            display="flex"
            flexGrow={1}
          >
            Weather
          </Mui.Typography>
          <LocationSearch />
        </Mui.Toolbar>
      </Mui.AppBar>
    </Mui.Box>
  );
};

export default Header;
