import React from "react";

const Select = ({ name, options, onChange, value, error }) => {
  return (
    <React.Fragment>
      <select
        className="select2"
        name={name}
        options={options}
        onChange={onChange}
        value={value}
      >
        {options.map(option =>
          option[name] ? (
            <option key={option[name]} value={option[name]}>
              {option[name]}
            </option>
          ) : (
            <option key={option} value={option}>
              {option}
            </option>
          )
        )}
      </select>
      <i className="mtrl-select"></i>
      {error && <p className="error_message">{error}</p>}
    </React.Fragment>
  );
};

export default Select;
