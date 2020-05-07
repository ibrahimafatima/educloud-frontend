import React from "react";
import Joi from "joi-browser";
import { Link } from "react-router-dom";
import Form from "../component/reusableComponent/form";
import { getClasses } from "../services/adminService";
import { scheduleExam } from "../services/teacherService";
import { toast } from "react-toastify";
import { getExam } from "./../services/teacherService";

class AddExams extends Form {
  state = {
    data: {
      className: "",
      subject: "",
      exam_name: "",
      schedule_date: "",
      schedule_time: "",
      duration: "",
    },
    classes: [],
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
    error: {},
  };

  schema = {
    _id: Joi.string(),
    className: Joi.string().required().label("Class name"),
    subject: Joi.string().min(3).required(),
    exam_name: Joi.string().min(3).max(20).required().label("Exam name"),
    schedule_date: Joi.string().required().label("Schedule date"),
    schedule_time: Joi.string().required().label("Schedule time"),
    duration: Joi.string().required().label("Duration"),
  };

  async componentDidMount() {
    const { data: classes } = await getClasses();
    this.setState({ classes });
    if (this.props.location.pathname === "/add-exams/new") return;
    try {
      const { data: exam } = await getExam(this.props.match.params.id);
      const data = {
        _id: exam._id,
        subject: exam.subject,
        className: exam.className,
        exam_name: exam.exam_name,
        schedule_date: exam.schedule_date,
        schedule_time: exam.schedule_time,
        duration: exam.duration,
      };
      this.setState({ data });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        return this.props.history.replace("/not-found");
      }
    }
  }

  doSubmit = async () => {
    try {
      await scheduleExam(this.state.data);
      this.setState({
        data: {
          className: "",
          subject: "",
          exam_name: "",
          schedule_date: "",
          schedule_time: "",
          duration: "",
        },
      });
      toast("Exam scheduled successfully");
    } catch (ex) {
      if (
        ex.response &&
        (ex.response.status === 400 || ex.response.status === 401)
      ) {
        const error = { ...this.state.error };
        error.subject = ex.response.data;
        this.setState({ error });
      }
    }
  };

  render() {
    const { location } = this.props;
    return (
      <React.Fragment>
        <div>
          <h4>
            Go To <Link to="/all-exams">All Exams</Link>
          </h4>
        </div>
        <div className="card height-auto">
          <div className="card-body">
            <div className="heading-layout1">
              <div className="item-title">
                {location.pathname === "/add-exams/new" ? (
                  <h3>Add New Exam</h3>
                ) : (
                  <h3>Update Exam Detail</h3>
                )}
              </div>
            </div>
            <form onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="col-xl-3 col-lg-6 col-12 form-group">
                  <label>Subject *</label>
                  {this.renderInput("", "subject", "text", "form-control")}
                </div>
                <div className="col-xl-3 col-lg-6 col-12 form-group">
                  <label>Exam name *</label>
                  {this.renderInput("", "exam_name", "text", "form-control")}
                </div>
                <div className="col-xl-3 col-lg-6 col-12 form-group">
                  <label>Class *</label>
                  {this.renderSelect("className", this.state.classes)}
                </div>
                <div className="col-xl-3 col-lg-6 col-12 form-group">
                  <label>Exam Schedule Date *</label>
                  {this.renderInput(
                    "mm/dd/yyyy",
                    "schedule_date",
                    "text",
                    "form-control"
                  )}
                </div>
                <div className="col-xl-3 col-lg-6 col-12 form-group">
                  <label>Schedule Time *</label>
                  {this.renderSelect("schedule_time", this.state.time)}
                </div>
                <div className="col-xl-3 col-lg-6 col-12 form-group">
                  <label>Exam duration *</label>
                  {this.renderInput("", "duration", "text", "form-control")}
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

export default AddExams;
