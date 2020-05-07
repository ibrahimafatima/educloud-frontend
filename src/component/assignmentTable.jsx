import React, { Component } from "react";
import Delete from "./reusableComponent/delete";
import Table from "./reusableComponent/table";

class AssignmentTable extends Component {
  columns = [
    { path: "title", title: "Title" },
    { path: "className", title: "Class" },
    { path: "postedOn", title: "Post date" },
    {
      path: "delete",
      value: (assign) => (
        <Delete onDoubleClick={() => this.props.onDelete(assign)} />
      ),
    },
  ];

  render() {
    const { assignments } = this.props;
    return <Table elements={assignments} columns={this.columns} />;
  }
}

export default AssignmentTable;
