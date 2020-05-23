import React from "react";
import Joi from "joi-browser";
import { Link } from "react-router-dom";
import Form from "../component/reusableComponent/form";
import { getClasses } from "../services/adminService";
import {
  addTimetable,
  getCourses,
  getATimetable,
} from "../services/teacherService";
import { toast } from "react-toastify";
import Spinner from "./reusableComponent/spinner";

class AddTimetable extends Form {
  state = {
    data: { className: "", name: "", day: "", startTime: "", endTime: "" },
    classe: [],
    subject: [],
    day: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    time: [
      "00:00 AM",
      "6:00 AM",
      "6:30 AM",
      "7:00 AM",
      "7:30 AM",
      "8:00 AM",
      "8:30 AM",
      "9:00 AM",
      "9:30 AM",
      "10:00 AM",
      "10:30 AM",
      "11:00 AM",
    ],
    loading: true,
    error: {},
  };

  schema = {
    _id: Joi.string(),
    className: Joi.string().min(3).max(12).required().label("Class name"),
    name: Joi.string().max(20).required().label("Subject"),
    day: Joi.string()

      .required()
      .label("Day"),
    startTime: Joi.string().required(),
    endTime: Joi.string().required(),
  };

  async componentDidMount() {
    const { data: classe } = await getClasses();
    const { data: subject } = await getCourses();
    this.setState({ classe, subject });
    if (this.props.location.pathname === "/add-timetable/new") {
      this.setState({ loading: false });
      return;
    }
    try {
      const { data: timetable } = await getATimetable(
        this.props.match.params.id
      );
      const data = {
        _id: timetable._id,
        className: timetable.className,
        name: timetable.name,
        day: timetable.day,
        startTime: timetable.startTime,
        endTime: timetable.endTime,
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
      await addTimetable(this.state.data);
      this.setState({
        data: { className: "", name: "", day: "", startTime: "", endTime: "" },
      });
      toast.success("Timetable updated successfully...");
      this.setState({ loading: false });
    } catch (ex) {
      this.setState({ loading: false });
      if (ex.response && ex.response.status === 400) {
        const error = { ...this.state.error };
        error.subject = ex.response.data;
        this.setState({ error });
      }
    }
  };

  render() {
    const { classe, subject, day, time } = this.state;
    const { location } = this.props;
    return this.state.loading ? (
      <Spinner />
    ) : (
      <React.Fragment>
        <div>
          <h4>
            Go To <Link to="/my-timetable">My Timetable</Link>
          </h4>
        </div>
        <div className="card height-auto">
          <div className="card-body">
            <div className="heading-layout1">
              <div className="item-title">
                {location.pathname === "/add-timetable/new" ? (
                  <h3>Add To Timetable</h3>
                ) : (
                  <h3>Update Timetable</h3>
                )}
              </div>
            </div>
            <form onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="col-xl-3 col-lg-6 col-12 form-group">
                  <label>Class name *</label>
                  {this.renderSelect("className", ["", ...classe])}
                </div>
                <div className="col-xl-3 col-lg-6 col-12 form-group">
                  <label>Subject *</label>
                  {this.renderSelect("name", ["", ...subject])}
                </div>
                <div className="col-xl-3 col-lg-6 col-12 form-group">
                  <label>Day *</label>
                  {this.renderSelect("day", day)}
                </div>
                <div className="col-xl-3 col-lg-6 col-12 form-group">
                  <label>Start Time *</label>
                  {this.renderSelect("startTime", time)}
                </div>
                <div className="col-xl-3 col-lg-6 col-12 form-group">
                  <label>End Time *</label>
                  {this.renderSelect("endTime", time)}
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

export default AddTimetable;
