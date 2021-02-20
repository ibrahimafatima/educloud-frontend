import React from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import Form from "./reusableComponent/form";
import Spinner from "./reusableComponent/spinner";
import { getClasses } from "../services/adminService";
import { postAssignment, getCourses, uploadHomework } from "../services/teacherService";

class AddAssignment extends Form {
  state = {
    data: { title: "", className: "", toBeSubmittedOn: "", name: ""},
    classes: [],
    homeworkFile: false,
    subjects: [],
    loading: false,
    error: {},
  };

  schema = {
    _id: Joi.string(),
    className: Joi.string().required().label("Class name"),
    title: Joi.string().min(3).max(18).required().label("Title"),
    name: Joi.string().required().label("Subject"),
    toBeSubmittedOn: Joi.string()
      .min(3)
      .max(20)
      .required()
      .label("Submit date"),
    //aMessage: Joi.string().required().label("Assignment text"),
  };

  async componentDidMount() {
    try {
      const { data: classes } = await getClasses();
      const { data: subjects } = await getCourses();
      this.setState({ classes, subjects });
    } catch (ex) {
      toast("Some error occured");
    }
  }

  handleHomeworkSelect = (e) => {
    var homeworkFile = e.target.files[0]
    this.setState({ homeworkFile })
  }

  // doIt = async () => {
  //   const formData = new FormData()
  //     formData.append('file', this.state.homeworkFile, `${new Date()}.png`)
  //     const {data} = await uploadHomework(formData)
  //     console.log("DATA", data.fileLocation)
  // } 

  doSubmit = async () => {
    try {
      this.setState({ loading: true });
      const formData = new FormData()
      formData.append('file', this.state.homeworkFile, `${new Date().getTime()}.file`)
      const {data} = await uploadHomework(formData)

      await postAssignment({...this.state.data, homeworkURL: data.fileLocation});
      this.setState({
        data: { title: "", className: "", toBeSubmittedOn: "", name: "" },
        loading: false,
      });
      toast.success("Assignment successfully posted...");
      //window.location = "dashboard";
    } catch (ex) {
      this.setState({ loading: false });
      if (ex.response && ex.response.status === 400) {
        const error = { ...this.state.error };
        error.className = ex.response.data;
        toast.error(ex.response.data)
        this.setState({ error });
      }
    }
  };

  render() {
    return this.state.loading ? (
      <Spinner />
    ) : (
      <React.Fragment>
        <div></div>
        <div className="card height-auto">
          <div className="card-body">
            <div className="heading-layout1">
              <div className="item-title">
                <h3>Add New Assignment</h3>
              </div>
            </div>
            <form onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="col-xl-3 col-lg-6 col-12 form-group">
                  <label>Title *</label>
                  {this.renderInput("", "title", "text", "form-control")}
                </div>
                <div className="col-xl-3 col-lg-6 col-12">
                  <label>Upload assignment *</label>
                <input type="file" onChange={this.handleHomeworkSelect} />
                </div>
                <div className="col-xl-3 col-lg-6 col-12 form-group">
                  <label>Class *</label>
                  {this.renderSelect("className", ["", ...this.state.classes])}
                </div>
                <div className="col-xl-3 col-lg-6 col-12 form-group">
                  <label>Subject *</label>
                  {this.renderSelect("name", ["", ...this.state.subjects])}
                </div>
                <div className="col-xl-3 col-lg-6 col-12 form-group">
                  <label>Submit Date *</label>
                  {this.renderInput(
                    "mm/dd/yyyy",
                    "toBeSubmittedOn",
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

export default AddAssignment;
