import React, { Component } from "react";
import { getStudent, removeStudent } from "../services/teacherService";
import AddedStudentTable from "../component/tables/addedStudentTable";
import Search from "./reusableComponent/search";
import { toast } from "react-toastify";

class AddedStudent extends Component {
  state = {
    students: [],
    virtualStudents: []
  };

  async componentDidMount() {
    try {
      const { data } = await getStudent(this.props.match.params.id);
      this.setState({ students: data, virtualStudents: data });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        return this.props.history.replace("/not-found");
    }
  }

  handleDelete = async (student) => {
    const originalState = this.state.students;
    this.setState({
      students: this.state.students.filter((s) => s._id !== student._id),
    });
    try {
      await removeStudent(student._id);
      toast.success("Student deleted successfully");
    } catch (ex) {
      toast.error("Error occured couldnt delete...");
      this.setState({ students: originalState });
    }
  };

  handleChange = async (e) => {
    const currentInput = e.currentTarget.value;
      this.setState({
        students: this.state.virtualStudents.filter((s) =>
          s.username.toLowerCase().startsWith(currentInput.toLowerCase())
        ),
      });
  };

  render() {
    const { students } = this.state;
    return (
      <React.Fragment>
        <form className="mg-b-20">
          <div className="row gutters-8">
            <div className="col-4-xxxl col-xl-4 col-lg-3 col-12 form-group"></div>
            <div className="col-4-xxxl col-xl-3 col-lg-3 col-12 form-group">
              <Search
                onChange={this.handleChange}
                placeholder="Search student by username ..."
              />
            </div>
          </div>
        </form>
        <div className="card height-auto">
          <div className="card-body">
            <div className="heading-layout1">
              <div className="item-title">
                <h3>All Students added by you</h3>
              </div>
            </div>
            {students.length === 0 ? (
              <h1>Students list is empty for now </h1>
            ) : (
              <AddedStudentTable
                students={students}
                onDelete={this.handleDelete}
              />
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AddedStudent;
