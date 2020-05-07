import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({ elements, columns, routePath }) => {
  return (
    <div className="table-responsive">
      <table className="table display data-table text-nowrap">
        <TableHeader columns={columns} />
        <TableBody
          columns={columns}
          elements={elements}
          routePath={routePath}
        />
      </table>
    </div>
  );
};

export default Table;
