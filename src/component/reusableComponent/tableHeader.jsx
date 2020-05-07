import React, { Component } from "react";

class TableHeader extends Component {
  state = {};
  render() {
    const { columns } = this.props;
    return (
      <thead>
        <tr>
          {columns.map(column => (
            <th className="table-header-text-color" key={column.path}>
              {column.title}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
