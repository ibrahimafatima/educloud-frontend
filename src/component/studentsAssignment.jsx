import React, { Component } from "react";
import Moment from "react-moment";
import { getStudentAssignment } from "../services/teacherService";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

class StudentAssignment extends Component {
  state = {
    assignments: [],
  };

  async componentDidMount() {
    try {
      const { data } = await getStudentAssignment(this.props.match.params.id);
      this.setState({ assignments: data });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) toast(ex.response.data);
    }
  }

  render() {
    const { assignments } = this.state;
    return (
      <React.Fragment>
        <h4>
          Go To <Link to="/">Dashboard</Link>
        </h4>
        <h6>Assignment history</h6>
        <div>
          <h6>
            Total Assignment given :{" "}
            <span style={{ color: "green" }}>{assignments.length}</span>
          </h6>
        </div>
        {assignments.length === 0 ? (
          <div className="card height-auto">
            <div className="card-body">
              <div className="heading-layout1">
                <div className="item-title">
                  <h3>No Assignment has been given to you yet.</h3>
                </div>
              </div>
            </div>
          </div>
        ) : (
          assignments.map((assignment) => (
            <div key={assignment._id} className="card height-auto">
              <div className="card-body">
                <div className="heading-layout1">
                  <div className="item-title">
                    <h6>
                      {" "}
                      Posted By:{" "}
                      <i style={{ color: "blue" }}> M. {assignment.postedBy}</i>
                    </h6>
                    <h6>
                      {" "}
                      To be submitted On :{" "}
                      <i style={{ color: "green" }}>
                        <Moment format="Do MMMM YYYY">
                          {assignment.toBeSubmittedOn}
                        </Moment>
                      </i>
                    </h6>
                    <h6>
                      {" "}
                      Title: <i style={this.styleC}>{assignment.title}</i>
                    </h6>
                    <h6>
                      <hr />
                      <i style={{ color: "gray" }}>{assignment.aMessage}</i>
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </React.Fragment>
    );
  }
}

export default StudentAssignment;
