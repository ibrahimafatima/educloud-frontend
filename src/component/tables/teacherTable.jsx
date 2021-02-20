import React, { Component } from "react";
import Table from "../reusableComponent/table";
import Delete from "../reusableComponent/delete";
import { FaUserTie } from "react-icons/fa";
import { Link } from "react-router-dom";

class TeacherTable extends Component {
  state = {
    columns: [
      { path: "username", title: "Username" }, //MORE COLUMN WILL COME LIKE: number of class teaching,
      { path: "registrationID", title: "Registration ID" }, // number of student per class, subject teaching,
      { path: "className", title: "Class In Charge" }, // number of assignment given
      { path: "numberOfSubject", title: "Subject" },
      { path: "addedBy", title: "Added By" },
      {
        path: "teacher",
        teacher: path => (
          <Link to={`/teacher/${path}`}>
            <FaUserTie />
          </Link>
        )
      },
      {
        path: "delete",
        value: teacher => (
          <Delete onDoubleClick={() => this.props.onDelete(teacher)} />
        )
      }
    ]
  };

  render() {
    const { teachers } = this.props;
    const { columns } = this.state;
    return (
      <Table columns={columns} elements={teachers} routePath="add-teacher" />
    );
  }
}

export default TeacherTable;
