import React, { Component } from "react";
import { toast } from "react-toastify";
import {
  getTeacherAssignment,
  removeAssignment,
} from "../services/teacherService";
import AssignmentTable from "./tables/assignmentTable";

class AllAssignment extends Component {
  state = {
    assignments: [],
  };

  async componentDidMount() {
    try {
      const { data } = await getTeacherAssignment();
      this.setState({ assignments: data });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        return this.props.history.replace("/not-found");
    }
  }

  handleDelete = async (assign) => {
    const originalState = this.state.assignments;
    this.setState({
      assignments: this.state.assignments.filter((a) => a._id !== assign._id),
    });
    try {
      await removeAssignment(assign._id);
      toast.success("Assignment deleted successfully");
    } catch (ex) {
      toast.error("Error occured couldnt delete...");
      this.setState({ assignments: originalState });
    }
  };

  render() {
    const { assignments } = this.state;
    return (
      <React.Fragment>
        <div className="card height-auto">
          <div className="card-body">
            <div className="heading-layout1">
              <div className="item-title">
                <h3>All Assignments</h3>
              </div>
            </div>
            {assignments.length === 0 ? (
              <h1>You have given no assignment yet. </h1>
            ) : (
              <AssignmentTable
                assignments={assignments}
                onDelete={this.handleDelete}
              />
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AllAssignment;
