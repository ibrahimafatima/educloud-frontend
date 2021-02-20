import React from "react";
import Loader from "react-loader-spinner";

const Spinner = () => {
  return (
    <div className="loader mySpinner">
      <Loader
        type="Oval"
        color="#042954"
        height={100}
        width={100}
        timeout={10000} //3 secs
      />
      <p style={{ color: "#FFA801" }}>Please wait...</p>
    </div>
  );
};

export default Spinner;
