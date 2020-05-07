import React from "react";

const TextArea = ({ name, type, onChange, value, label, error, className }) => {
  return (
    <div>
      <label htmlFor={name} style={{ fontSize: "14px" }}>
        {label}
      </label>
      <textarea
        name={name}
        type={type}
        className={className}
        id={name}
        onChange={onChange}
        value={value}
        rows="5"
        columns="12"
        fontSize="25px"
      />
      <i className="mtrl-select"></i>
      {error && (
        <p className="error_message">{name !== "passwordAgain" && error}</p>
      )}
    </div>
  );
};

export default TextArea;
