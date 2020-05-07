import React from "react";

const OutlineButton = ({ title, style, onClick }) => {
  return (
    <p>
      <button
        style={style}
        onClick={onClick}
        className="btn btn-ln btn-size bg-blue-dark btn-hover-yellow"
      >
        {title}
      </button>
    </p>
  );
};

export default OutlineButton;
