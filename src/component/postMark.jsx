import React from "react";
import Joi from "joi-browser";
import Form from "./reusableComponent/form";
import { getCourses, getExams, postMark } from "../services/teacherService";
import { toast } from "react-toastify";
import Spinner from "./reusableComponent/spinner";

class PostMark extends Form {
  state = {
    data: {
      name: "",
      examName: "",
      mark: "",
      grade: "",
      remark: "",
    },
    subject: [],
    exams: [],
    loading: true,
    error: {},
  };

  schema = {
    _id: Joi.string(),
    name: Joi.string().required().label("Subject"),
    examName: Joi.string().required().label("Exam name"),
    mark: Joi.number().min(0).required().label("Mark"),
    grade: Joi.string().max(12).label("Grade"),
    remark: Joi.string().max(25).label("Remark"),
  };

  async componentDidMount() {
    try {
      const { data } = await getCourses();
      const { data: exams } = await getExams();
      this.setState({ subject: data, exams, loading: false });
    } catch (ex) {
      this.setState({ loading: false });
      if (ex.response && ex.response.status === 404)
        return this.props.history.replace("/not-found");
    }
  }

  doSubmit = async () => {
    try {
      this.setState({ loading: true });
      const { data } = await postMark(
        this.props.match.params.id,
        this.state.data
      );
      toast.success("Mark successfully posted for " + data.studentName);
      this.setState({ loading: false });
      this.props.history.goBack();
    } catch (ex) {
      this.setState({ loading: false });
      if (ex.response && ex.response.status === 404) {
        const error = { ...this.state.error };
        error.grade = ex.response.data;
        this.setState({ error });
      }
    }
  };

  render() {
    const { subject, exams } = this.state;
    const { location } = this.props;
    return this.state.loading ? (
      <Spinner />
    ) : (
      <React.Fragment>
        <div></div>
        <div className="card height-auto">
          <div className="card-body">
            <div className="heading-layout1">
              <div className="item-title">
                {location.pathname === "/post-mark/new" ? (
                  <h3>Post mark</h3>
                ) : (
                  <h3>Update Mark Detail</h3>
                )}
              </div>
            </div>
            <form onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="col-xl-3 col-lg-6 col-12 form-group">
                  <label>Subject *</label>
                  {this.renderSelect("name", ["", ...subject])}
                </div>
                <div className="col-xl-3 col-lg-6 col-12 form-group">
                  <label>Exam name *</label>
                  {this.renderSelect("examName", ["", ...exams])}
                </div>
                <div className="col-xl-3 col-lg-6 col-12 form-group">
                  <label>Score *</label>
                  {this.renderInput("", "mark", "text", "form-control")}
                </div>
                <div className="col-xl-3 col-lg-6 col-12 form-group">
                  <label>Grade *</label>
                  {this.renderInput("", "grade", "text", "form-control")}
                </div>
                <div className="col-xl-3 col-lg-6 col-12 form-group">
                  <label>Remark *</label>
                  {this.renderTextArea("", "remark", "text", "form-control")}
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

export default PostMark;
