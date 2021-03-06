import React from "react";
import Joi from "joi-browser";
import Form from "./reusableComponent/form";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import {
  addToNoticeBoard,
  getANotice,
  sendEventMail,
} from "../services/adminService";
import Spinner from "./reusableComponent/spinner";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

class AddToNoticeBoard extends Form {
  state = {
    data: { eventDate: new Date(), eventMessage: "" },
    notify: false,
    loading: true,
    error: {},
  };

  schema = {
    _id: Joi.string(),
    eventDate: Joi.required().label("Event date"),
    eventMessage: Joi.string().required().label("Event message"),
  };

  async componentDidMount() {
    if (this.props.location.pathname === "/notice-board/new") {
      this.setState({ loading: false });
      return;
    }
    try {
      const { data: notice } = await getANotice(this.props.match.params.id);
      const data = {
        _id: notice._id,
        eventDate: notice.eventDate,
        eventMessage: notice.eventMessage,
      };
      this.setState({ data, loading: false });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        return this.props.history.replace("/not-found");
      }
    }
  }

  doSubmit = async () => {
    try {
      this.setState({ loading: true });
      await addToNoticeBoard(this.state.data);
      var stateData = this.state.data;
      this.setState({ data: { eventDate: "", eventMessage: "" } });
      toast.success("Notice board updated successfully");
      this.setState({ loading: false });
      if (this.state.notify) {
        await sendEventMail(stateData);
      }
    } catch (ex) {
      this.setState({ loading: false });
      if (ex.response && ex.response.status === 400) {
        const error = { ...this.state.error };
        toast.error(ex.response.data);
        error.eventDate = ex.response.data;
        this.setState({ error });
      }
    }
  };

  render() {
    return this.state.loading ? (
      <Spinner />
    ) : (
      <React.Fragment>
        <div>
          <h4>
            Go To <Link to="/all-notice">Notice List</Link>
          </h4>
        </div>
        <div className="card height-auto">
          <div className="card-body">
            <div className="heading-layout1">
              <div className="item-title">
                <h3>Add To Notice Board</h3>
              </div>
            </div>
            <form onSubmit={this.handleSubmit}>
              <div className="row">
                <div style={{ marginTop: "60px", marginRight: "40px" }}>
                  <label>Event Date *</label>
                  <br></br>
                  <DatePicker
                    onChange={(eventDate) => {
                      this.setState({
                        data: { ...this.state.data, eventDate },
                      });
                    }}
                    selected={this.state.data.eventDate}
                  />
                  {/* <label>Event Date *</label>
                  {this.renderInput(
                    "mm/dd/yyyy",
                    "eventDate",
                    "text",
                    "form-control"
                  )} */}
                </div>
                <div className="col-xl-3 col-lg-6 col-12">
                  <label>Event Message *</label>
                  {this.renderTextArea(
                    "",
                    "eventMessage",
                    "text",
                    "form-control"
                  )}
                </div>

                <div className="col-xl-3 col-lg-6 col-12">
                  <label style={{ marginTop: "50px" }}>
                    <input
                      type="checkbox"
                      defaultChecked={this.state.notify}
                      onChange={() =>
                        this.setState({ notify: !this.state.notify })
                      }
                    />{" "}
                    Notify all students about this event.
                  </label>
                </div>
                <br />
                <div className="col-12 form-group mg-t-8">
                  {this.renderButton(
                    "Save",
                    "btn btn-ln btn-size bg-blue-dark btn-hover-yellow"
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AddToNoticeBoard;
