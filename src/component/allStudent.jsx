import React, { Component } from "react";
import { getStudent } from "../services/teacherService";
import Search from "./reusableComponent/search";
import StudentTable from "./tables/studentTable";
import auth from "../services/authService";

class AllStudent extends Component {
  state = {
    students: [],
    virtualStudents: []
  };

  async componentDidMount() {
    try {
      const { data } = await getStudent(this.props.match.params.id);
      const filteredStudents = data.filter( s => s.registrationID !== auth.getCurrentUser().registrationID)
      this.setState({
        students: filteredStudents, virtualStudents: filteredStudents
      });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        return this.props.history.replace("/not-found");
    }
  }

  handleChange = async e => {
    const currentInput = e.currentTarget.value;
      this.setState({
        students: this.state.virtualStudents.filter(s =>
          s.username.toLowerCase().startsWith(currentInput.toLowerCase())
        )
      });
  };

  render() {
    const { students } = this.state;
    const { match } = this.props;
    return (
      <React.Fragment>
        <form className="mg-b-20">
          <div className="row gutters-8">
            <div className="col-4-xxxl col-xl-4 col-lg-3 col-12 form-group"></div>
            <div className="col-4-xxxl col-xl-3 col-lg-3 col-12 form-group">
              <Search
                onChange={this.handleChange}
                placeholder="Search student by name ..."
              />
            </div>
          </div>
        </form>

        <div className="card height-auto">
          <div className="card-body">
            <div className="heading-layout1">
              <div className="item-title">
                <h3>{`All ${match.params.id} students`}</h3>
              </div>
            </div>
            {students.length === 0 ? (
              <h1>{`No Student was found in ${match.params.id} class`}</h1>
            ) : (
              <StudentTable students={students} />
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AllStudent;
