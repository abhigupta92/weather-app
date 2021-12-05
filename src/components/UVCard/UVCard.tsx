import React from "react";

import { Box, Typography } from "../mui";

import CardContainer from "../CardContainer";
import WithLoader from "../WithLoader";

import { msg } from "../../constants";
import { LoadingStateEnum } from "../../context/reducer";

import "./index.css";

const getUVColor = (uv?: number) => {
  if (uv === undefined) return "black";
  if (uv < 3) return "green";
  if (uv < 6) return "#f8ce09";
  if (uv < 8) return "orange";
  if (uv < 11) return "red";
  return "purple";
};

const getUVAlert = (uv?: number) => {
  if (uv === undefined) return "";
  if (uv < 3) return "Low";
  if (uv < 6) return "Moderate";
  if (uv < 8) return "Very High";
  return "Extreme";
};

const UVCard = (props: { uv?: number }): React.ReactElement => {
  const { uv } = props;
  return (
    <CardContainer headerLabel={msg.uvIndex}>
      <WithLoader loadingKey={LoadingStateEnum.CURRENT_WEATHER}>
        <Box className="uv-card-container">
          <Box
            className="uv-card-container-inner"
            style={{ border: `7px solid ${getUVColor(uv)}` }}
          >
            <Typography
              variant="h3"
              style={{ color: getUVColor(uv) }}
              data-testid="uv-card-uv"
            >
              {uv}
            </Typography>
          </Box>
          <Typography
            variant="h3"
            style={{ color: getUVColor(uv) }}
            data-testid="uv-card-alert"
          >
            {getUVAlert(uv)}
          </Typography>
        </Box>
      </WithLoader>
    </CardContainer>
  );
};

export default UVCard;
