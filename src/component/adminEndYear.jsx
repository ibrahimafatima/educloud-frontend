import React, { Component } from "react";
import { TiWarning } from "react-icons/ti";
import { GoSmiley } from "react-icons/go";
import { updatePaymentYear } from "../services/adminService";
import { toast } from "react-toastify";

class AdminEndYear extends Component {
  state = {
    bit: 0,
  };

  handleClick = async () => {
    try {
      await updatePaymentYear();
      this.setState({ bit: 1 });
      toast.success("End of year successfully made. Enjoy the holidays.");
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
              By clicking the end of year button all your students payment
              details of this current year will be treated as old (previous
              year) but they will not be lost you can still have access to them
              but it's a very good pratice to view and print payment report of
              every single class and keep them as record for the next year.
              <br />
              Also beware that all teachers having a class in charge should
              close and promote students before your following year data can
              actually be accurate.
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

export default AdminEndYear;
