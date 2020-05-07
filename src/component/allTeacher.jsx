import React, { Component } from "react";
import { getTeachers } from "../services/adminService";
import TeacherTable from "../component/teacherTable";
import { toast } from "react-toastify";
import Search from "./reusableComponent/search";
import { removeTeacher } from "../services/adminService";

class AllTeacher extends Component {
  state = {
    teachers: [],
  };

  async componentDidMount() {
    try {
      const { data } = await getTeachers();
      this.setState({ teachers: data });
    } catch (ex) {
      if (ex.response && ex.response.status === 400)
        toast.error(ex.response.data);
    }
  }

  handleDelete = async (teacher) => {
    const originalState = this.state.teachers;
    this.setState({
      teachers: this.state.teachers.filter((t) => t._id !== teacher._id),
    });
    try {
      await removeTeacher(teacher._id);
      toast.success("Teacher removed successfully");
    } catch (ex) {
      toast.error(ex.response.data);
      this.setState({ teachers: originalState });
    }
  };

  handleChange = async (e) => {
    const currentInput = e.currentTarget.value;
    if (currentInput === "") {
      const { data } = await getTeachers();
      this.setState({ teachers: data });
    } else {
      this.setState({
        teachers: this.state.teachers.filter((t) =>
          t.username.toLowerCase().startsWith(currentInput.toLowerCase())
        ),
      });
    }
  };

  render() {
    const { teachers } = this.state;
    return (
      <React.Fragment>
        <form className="mg-b-20">
          <div className="row gutters-8">
            <div className="col-4-xxxl col-xl-4 col-lg-3 col-12 form-group"></div>
            <div className="col-4-xxxl col-xl-3 col-lg-3 col-12 form-group">
              <Search
                onChange={this.handleChange}
                placeholder="Search teacher by username ..."
              />
            </div>
          </div>
        </form>
        <div className="card height-auto">
          <div className="card-body">
            <div className="heading-layout1">
              <div className="item-title">
                <h3>All Teachers</h3>
              </div>
            </div>
            {teachers.length === 0 ? (
              <h1>Teacher list is empty for now </h1>
            ) : (
              <TeacherTable teachers={teachers} onDelete={this.handleDelete} />
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AllTeacher;
