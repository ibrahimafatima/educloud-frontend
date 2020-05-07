import React from "react";

const Search = ({ onChange, placeholder }) => {
  return (
    <input
      type="text"
      onChange={onChange}
      placeholder={placeholder}
      className="form-control"
    ></input>
  );
};

export default Search;
