import React from "react";
import { Oval } from  "react-loader-spinner";

const LoadingSpinner: React.VFC = () => {
  return (
    <div className="loading">
      <Oval color="#808080" height={30} width={30} />
    </div>
  );
};
export default LoadingSpinner;
