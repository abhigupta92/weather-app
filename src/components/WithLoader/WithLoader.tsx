import React, { useContext } from "react";
import { WeatherAppContext } from "../../context/WeatherAppContext";
import { LoadingStateEnum } from "../../context/reducer";

import { Box, CircularProgress } from "../mui";

import "./index.css";

type Props = {
  children: any;
  loadingKey: LoadingStateEnum;
};
const WithLoader = (props: Props): React.ReactElement => {
  const { loadingKey, children } = props;
  const { state } = useContext(WeatherAppContext);
  const { loadingStates } = state;

  if (loadingStates && loadingStates[loadingKey])
    return (
      <Box className="with-loader-container">
        <CircularProgress />
      </Box>
    );

  return children;
};

export default WithLoader;
