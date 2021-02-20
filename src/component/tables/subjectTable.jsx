import React, { Component } from "react";
import { FaUserGraduate, FaFacebookMessenger } from "react-icons/fa";
import { Link } from "react-router-dom";
import Table from "../reusableComponent/table";
import auth from "../../services/authService";
import Delete from "../reusableComponent/delete";

class SubjectTable extends Component {
  state = {
    columns: [
      { path: "name", title: "Subject Name" }, //MORE COLUMN WILL COME LIKE: number of student for sub,
      { path: "className", title: "Class Name" }, // number of exam, number of assignment,
      { path: "registrationID", title: "Registration ID" },
    ],
  };

  studentIcon = {
    path: "allStudents",
    content: (path) => (
      <Link to={`/all-student/${path}`}>
        <FaUserGraduate />
      </Link>
    ),
  };

  discussionBtn = {
    path: "discussion",
    content: (path) => (
      <Link to={`/discussion/${path}`}>
        <button className="btn btn-info">
          <FaFacebookMessenger /> Discussion
        </button>
      </Link>
    ),
  };

  deleteIcon = {
    path: "delete",
    value: (subject) => (
      <Delete onDoubleClick={() => this.props.onDelete(subject)} />
    ),
  };

  constructor() {
    super();
    if (auth.getCurrentUser().isTeacher) {
      this.state.columns.push(this.discussionBtn);
      this.state.columns.push(this.studentIcon);
      this.state.columns.push(this.deleteIcon);
    }
  }

  render() {
    const { subjects } = this.props;
    const { columns } = this.state;
    return (
      <Table columns={columns} elements={subjects} routePath="add-subject" />
    );
  }
}

export default SubjectTable;
