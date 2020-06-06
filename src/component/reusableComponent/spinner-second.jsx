import React from "react";
import Loader from "react-loader-spinner";

const SpinnerSecond = () => {
  return (
    <div className="loader">
      <Loader
        type="ThreeDots"
        color="#088DCD"
        height={50}
        width={50}
        timeout={10000} //3 secs
      />
    </div>
  );
};

export default SpinnerSecond;
