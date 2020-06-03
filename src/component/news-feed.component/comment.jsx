import React from "react";
import { FaRegComments } from "react-icons/fa";

const Comment = () => {
  return (
    <li>
      <span className="comment" data-toggle="tooltip" title="Comments">
        <i>
          <FaRegComments />
        </i>
        <ins>52</ins>
      </span>
    </li>
  );
};

export default Comment;
