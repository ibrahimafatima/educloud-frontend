import React from "react";

const Input = ({
  name,
  type,
  label,
  className = "",
  value,
  onChange,
  error
}) => {
  return (
    <div className="form-group">
      <input
        style={{ fontSize: "14px", marginTop: "16px" }}
        type={type}
        id={name}
        name={name}
        onChange={onChange}
        className={className}
        value={value}
      />
      <label
        className="control-label"
        htmlFor={name}
        style={{ fontSize: "14px" }}
      >
        {label}
      </label>
      <i className="mtrl-select"></i>
      {error && (
        <p className="error_message">{name !== "passwordAgain" && error}</p>
      )}
    </div>
  );
};

export default Input;
