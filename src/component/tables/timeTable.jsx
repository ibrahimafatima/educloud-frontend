import React, { Component } from "react";
import Table from "../reusableComponent/table";
import Delete from "../reusableComponent/delete";
import auth from "../../services/authService";

class TimeTable extends Component {
  columns = [
    { path: "className", title: "Class Name" },
    { path: "name", title: "Subject" },
    { path: "day", title: "Day" },
    { path: "startTime", title: "Start At" },
    { path: "endTime", title: "End At" },
    { path: "username", title: "Teacher" }
  ];

  deleteBtn = {
    path: "timetable",
    value: time => <Delete onDoubleClick={() => this.props.onDelete(time)} />
  };

  constructor() {
    super();
    if (!auth.getCurrentUser().isStudent) {
      this.columns.push(this.deleteBtn);
    }
  }

  render() {
    const { timetables } = this.props;
    return (
      <Table
        elements={timetables}
        columns={this.columns}
        routePath="add-timetable"
      />
    );
  }
}

export default TimeTable;
