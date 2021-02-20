import React, { Component } from "react";
import Moment from "react-moment";
import { getStudentAssignment } from "../services/teacherService";
import { toast } from "react-toastify";
import homeworkBook from "../images/homework.png";

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
                  <h2>No Assignment has been given to you yet.</h2>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="serv">
            <ul>
              {assignments.map((assignment) => (
                <li>
                  <a href={assignment.homeworkURL}>
                    <img className="book" src={homeworkBook} alt="" />
                  </a>
                  <br />
                  <span>
                    <b>Homework :</b>
                    {assignment.title}
                  </span>
                  <br />
                  <span>
                    <b>By :</b>
                    {assignment.postedBy}
                  </span>
                  <br />
                  <span>
                    <b>Submit Date :</b>
                    <Moment format="Do MMMM YYYY">
                      {assignment.toBeSubmittedOn}
                    </Moment>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default StudentAssignment;
