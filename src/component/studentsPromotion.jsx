import React, { Component } from "react";
import auth from "../services/authService";
import { Link } from "react-router-dom";
import { getStudent } from "../services/teacherService";
import StudentPromotionTable from "./studentsPromotionTable";

class StudentPromotion extends Component {
  state = {
    students: [],
  };

  async componentDidMount() {
    try {
      const { data } = await getStudent(this.props.match.params.id);
      this.setState({ students: data });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        return this.props.history.replace("/not-found");
    }
  }

  render() {
    const { students } = this.state;
    return (
      <React.Fragment>
        <form className="mg-b-20">
          <div className="row gutters-8">
            <div className="col-4-xxxl col-xl-4 col-lg-3 col-12 form-group"></div>
            <div className="col-4-xxxl col-xl-3 col-lg-3 col-12 form-group">
              <Link to={`/new-term/${auth.getCurrentUser().className}`}>
                <button className="btn btn-info">All class to next term</button>
              </Link>
            </div>
          </div>
        </form>
        <div className="card height-auto">
          <div className="card-body">
            <div className="heading-layout1">
              <div className="item-title">
                <h3>Promote students</h3>
              </div>
            </div>
            {students.length === 0 ? (
              <h1>Students list is empty for now </h1>
            ) : (
              <StudentPromotionTable students={students} />
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default StudentPromotion;
