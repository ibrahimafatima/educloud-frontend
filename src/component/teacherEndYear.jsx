import React, { Component } from "react";
import { TiWarning } from "react-icons/ti";
import { GoSmiley } from "react-icons/go";
import {
  updateYearAssignment,
  updateYearMark,
} from "../services/teacherService";
import { toast } from "react-toastify";

class TeacherEndYear extends Component {
  state = {
    bit: 0,
    loading: false,
  };

  handleClick = async () => {
    try {
      this.setState({ loading: true });
      await updateYearAssignment();
      await updateYearMark();
      this.setState({ bit: 1, loading: false });
      toast.success("End of year successfully made. Enjoy the holidays!");
    } catch (ex) {
      toast.error(ex.response.data);
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="card height-auto">
          {this.state.bit === 1 && (
            <div class="alert alert-success" role="alert">
              End of year successfully made. Enjoy the holidays!
            </div>
          )}
          <div className="card-body">
            <div className="heading-layout1">
              <h3 style={{ color: "red" }}>
                <u>
                  <b>
                    <TiWarning color="red" size="50" /> WARNING :{" "}
                    <i>
                      {" "}
                      Please read this very carefully before performing the
                      following action{" "}
                    </i>
                  </b>
                </u>
              </h3>
              <hr />
            </div>
            <h4>
              {" "}
              By clicking the end of year button, informations students in the
              class you have inn charge such as marks, assignments, fees payment
              etc... will now be part of their history they can access on the
              platform. This action makes sure they get accurate information
              about they new year.
              <br />
              Also make sure you promote all students in the class you have in
              charge before performing this operation. If in case you have not
              done that kindly go to student promotion module and complete it
              before ending the year.
              <br />
              <span style={{ color: "red" }}>
                Note that this action is not reversible
              </span>
            </h4>
            <hr />
            <h3>
              <GoSmiley color="green" size="40" /> Hope you had a great year at
              school
            </h3>
            <hr />
            <div>
              <button
                className="btn btn-info btn-lg"
                title="Are you sure ?"
                onClick={this.handleClick}
              >
                End of Year
              </button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default TeacherEndYear;
