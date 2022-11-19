import React from "react";
import { BallTriangle } from "react-loader-spinner";
import { Backdrop } from "@material-ui/core";

const SubmittingSpinner: React.VFC<{ progress: boolean }> = (props) => {
  const { progress } = props;

  return (
    <Backdrop open={progress} style={{ zIndex: 99 }}>
      <BallTriangle color="#00BFFF" height={80} width={80} />
    </Backdrop>
  );
};
export default SubmittingSpinner;
