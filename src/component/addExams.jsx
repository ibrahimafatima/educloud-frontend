import React from "react";
import Joi from "joi-browser";
import { Link } from "react-router-dom";
import Form from "../component/reusableComponent/form";
import { getClasses } from "../services/adminService";
import { scheduleExam } from "../services/teacherService";
import { toast } from "react-toastify";
import { getExam } from "./../services/teacherService";
import Spinner from "./reusableComponent/spinner";
import TimePicker from "react-time-picker";
import DatePicker from "react-date-picker";


class AddExams extends Form {
  state = {
    data: {
      className: "",
      subject: "",
      examName: "",
      scheduledDate: new Date(),
      scheduledTime: "",
      duration: "",
    },
    classes: [],
    loading: true,
    error: {},
  };

  schema = {
    _id: Joi.string(),
    className: Joi.string().required().label("Class name"),
    subject: Joi.string().min(3).required(),
    examName: Joi.string().min(3).max(20).required().label("Exam name"),
    scheduledDate: Joi.required().label("Schedule date"),
    scheduledTime: Joi.string().required().label("Schedule time"),
    duration: Joi.string().required().label("Duration"),
  };

  async componentDidMount() {
    const { data: classes } = await getClasses();
    this.setState({ classes });
    if (this.props.location.pathname === "/add-exams/new") {
      this.setState({ loading: false });
      return;
    }
    try {
      const { data: exam } = await getExam(this.props.match.params.id);
      const data = {
        _id: exam._id,
        subject: exam.subject,
        className: exam.className,
        examName: exam.examName,
        scheduledDate: exam.scheduledDate,
        scheduledTime: exam.scheduledTime,
        duration: exam.duration,
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
      await scheduleExam(this.state.data);
      this.setState({
        data: {
          className: "",
          subject: "",
          examName: "",
          scheduledDate: "",
          scheduledTime: "",
          duration: "",
        },
      });
      this.setState({ loading: false });
      toast("Exam scheduled successfully");
    } catch (ex) {
      this.setState({ loading: false });
      if (
        ex.response &&
        (ex.response.status === 400 || ex.response.status === 401)
      ) {
        const error = { ...this.state.error };
        error.scheduledTime = ex.response.data;
        this.setState({ error });
      }
    }
  };

  render() {
    const { location } = this.props;
    return this.state.loading ? (
      <Spinner />
    ) : (
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
                  {this.renderInput("", "examName", "text", "form-control")}
                </div>
                <div className="col-xl-3 col-lg-6 col-12 form-group">
                  <label>Class *</label>
                  {this.renderSelect("className", ["", ...this.state.classes])}
                </div>
                <div style={{marginTop:"80px", marginRight: "20px"}}>
                  <label>Exam Schedule Date *</label>
                  {/* {this.renderInput(
                    "mm/dd/yyyy",
                    "scheduledDate",
                    "text",
                    "form-control"
                  )} */}
                  <DatePicker onChange={(scheduledDate) => {this.setState({ data: { ...this.state.data, scheduledDate} })} } value={this.state.data.scheduledDate} />

                </div>
                <div style={{marginTop:"80px", marginBottom: "20px", marginRight: "20px"}}>
                  <label>Schedule Time *   </label>
                  {/* {this.renderSelect("scheduledTime", this.state.time)} */}
                  <TimePicker onChange={(scheduledTime) => this.setState({data: {...this.state.data, scheduledTime}})} value="00:00" />
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
