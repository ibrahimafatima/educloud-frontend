import React from "react";
import { MdDeleteForever } from "react-icons/md";

const Delete = ({ onDoubleClick, onClick }) => {
  return (
    <MdDeleteForever
      title="Double click to delete"
      color="red"
      className="cur"
      onClick={onClick}
      onDoubleClick={onDoubleClick}
    />
  );
};

export default Delete;
