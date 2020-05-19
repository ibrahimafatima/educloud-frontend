import React from "react";
import Loader from "react-loader-spinner";

const Spinner = () => {
  return (
    <div className="loader">
      <Loader
        type="Oval"
        color="#042954"
        height={100}
        width={100}
        timeout={10000} //3 secs
      />
    </div>
  );
};

export default Spinner;
