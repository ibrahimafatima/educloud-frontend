import React, { Component } from "react";
import { toast } from "react-toastify";
import { getCourses, removeSubject } from "../services/teacherService";
import SubjectTable from "../component/subjectTable";

class AllSubject extends Component {
  state = {
    subjects: [],
  };

  async componentDidMount() {
    try {
      const { data } = await getCourses();
      this.setState({ subjects: data });
    } catch (ex) {
      if (ex.response && ex.response.status === 400)
        toast.error(ex.response.data);
    }
  }

  handleDelete = async (subject) => {
    const originalState = this.state.subjects;
    this.setState({
      subjects: this.state.subjects.filter((s) => s._id !== subject._id),
    });
    try {
      await removeSubject(subject._id);
      toast.success("Subject deleted successfully");
    } catch (ex) {
      toast.error(ex.response.data);
      this.setState({ subjects: originalState });
    }
  };

  render() {
    const { subjects } = this.state;
    return (
      <div className="card height-auto">
        <div className="card-body">
          <div className="heading-layout1">
            <div className="item-title">
              <h3>All subjects you teach</h3>
            </div>
          </div>
          {subjects.length === 0 ? (
            <h1>You have no subject added yet </h1>
          ) : (
            <SubjectTable subjects={subjects} onDelete={this.handleDelete} />
          )}
        </div>
      </div>
    );
  }
}

export default AllSubject;
