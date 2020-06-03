import React from "react";
import { AiFillLike } from "react-icons/ai";

const Like = () => {
  return (
    <li>
      <span className="like" data-toggle="tooltip" title="like">
        <i>
          <AiFillLike color="#088DCD" />{" "}
        </i>
        <ins>2</ins>
      </span>
    </li>
  );
};

export default Like;
