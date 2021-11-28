import React from "react";

import { Card, CardContent, Typography, Divider } from "../mui";

import "./CardContainer.css";

type Props = {
  headerLabel: string;
  children: React.ReactElement;
};
const CardContainer = (props: Props): React.ReactElement => {
  const { headerLabel, children } = props;
  return (
    <Card className="card-container">
      <CardContent
        className="card-container-inner"
        sx={{ margin: { xs: "16px 0px" } }}
      >
        <Typography variant="h5">{headerLabel}</Typography>
        <Divider />
        {children}
      </CardContent>
    </Card>
  );
};

export default CardContainer;
