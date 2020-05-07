import React, { Component } from "react";
import { getStudents } from "../services/adminService";
import { toast } from "react-toastify";
import Search from "./reusableComponent/search";
import StudentTable from "./studentTable";

class StudentFee extends Component {
  state = {
    students: []
  };

  async componentDidMount() {
    try {
      const { data: students } = await getStudents();
      this.setState({ students });
    } catch (ex) {
      if (ex.response && ex.response.status === 400)
        toast.error(ex.reponse.data);
    }
  }

  handleChange = async e => {
    const currentInput = e.currentTarget.value;
    if (currentInput === "") {
      const { data } = await getStudents();
      this.setState({ students: data });
    } else {
      this.setState({
        students: this.state.students.filter(s =>
          s.registration_number
            .toLowerCase()
            .startsWith(currentInput.toLowerCase())
        )
      });
    }
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
                placeholder="Search student by regist..."
              />
            </div>
          </div>
        </form>
        <div className="card height-auto">
          <div className="card-body">
            <div className="heading-layout1">
              <div className="item-title">
                <h3>Students fee payment</h3>
              </div>
            </div>
            {students.length === 0 ? (
              <h1>Student list is empty for now </h1>
            ) : (
              <StudentTable students={students} path={this.props.match.path} />
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default StudentFee;
