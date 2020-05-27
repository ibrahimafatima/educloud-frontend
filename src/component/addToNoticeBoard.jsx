import React from "react";
import Joi from "joi-browser";
import Form from "./reusableComponent/form";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { addToNoticeBoard, getANotice } from "../services/adminService";
import Spinner from "./reusableComponent/spinner";

class AddToNoticeBoard extends Form {
  state = {
    data: { event_date: "", event_message: "" },
    loading: true,
    error: {},
  };

  schema = {
    _id: Joi.string(),
    event_date: Joi.string().required().label("Event date"),
    event_message: Joi.string().required().label("Event message"),
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
        event_date: notice.event_date,
        event_message: notice.event_message,
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
      this.setState({ data: { event_date: "", event_message: "" } });
      toast.success("Notice board updated successfully");
      this.setState({ loading: false });
    } catch (ex) {
      this.setState({ loading: false });
      if (ex.response && ex.response.status === 400) {
        const error = { ...this.state.error };
        error.event_date = ex.response.data;
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
                <div className="col-xl-3 col-lg-6 col-12 form-group">
                  <label>Event Date *</label>
                  {this.renderInput(
                    "mm/dd/yyyy",
                    "event_date",
                    "text",
                    "form-control"
                  )}
                </div>
                <div className="col-xl-3 col-lg-6 col-12">
                  <label>Event Message *</label>
                  {this.renderTextArea(
                    "",
                    "event_message",
                    "text",
                    "form-control"
                  )}
                </div>
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
