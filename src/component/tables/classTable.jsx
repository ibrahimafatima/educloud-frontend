import React, { Component } from "react";
import Table from "../reusableComponent/table";
import { FaUserGraduate } from "react-icons/fa";
import { Link } from "react-router-dom";
import Delete from "../reusableComponent/delete";

class ClasseTable extends Component {
  state = {
    columns: [
      { path: "className", title: "Class Name" },
      { path: "classe", title: "Class" },
      { path: "amountToPay", title: "Class Fees" },
      { path: "level", title: "Level" },
      { path: "addedBy", title: "Added By" },
      {
        path: "allStudents",
        content: path => (
          <Link to={`/all-student/${path}`}>
            <FaUserGraduate />
          </Link>
        )
      },
      {
        path: "like",
        value: classe => (
          <Delete onDoubleClick={() => this.props.onDelete(classe)} />
        )
      }
    ]
  };

  render() {
    const { classes } = this.props;
    const { columns } = this.state;
    return <Table elements={classes} columns={columns} routePath="add-class" />;
  }
}

export default ClasseTable;
