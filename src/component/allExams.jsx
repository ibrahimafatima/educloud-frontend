import React, { Component } from "react";
import {
  getExams,
  removeExam,
  updateExamStatus,
} from "../services/teacherService";
import ExamTable from "./examTable";
import auth from "../services/authService";
import { toast } from "react-toastify";
import Spinner from "./reusableComponent/spinner";

class AllExams extends Component {
  state = {
    exams: [],
    loading: false,
    user: {},
  };

  async componentDidMount() {
    this.setState({ user: auth.getCurrentUser() });
    try {
      const { data: exams } = await getExams();
      this.setState({ exams });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("Exam fetch error");
    }
  }

  handleDelete = async (exam) => {
    const originalState = this.state.exams;
    this.setState({
      exams: this.state.exams.filter((e) => e._id !== exam._id),
    });
    try {
      await removeExam(exam._id);
      toast.success("Successfully removed exam.");
    } catch (ex) {
      toast.error("Error occured couldnt delete...");
      this.setState({ exams: originalState });
    }
  };

  handleExamUpdate = async (exam) => {
    try {
      this.setState({ loading: true });
      await updateExamStatus(exam);
      toast.success("Successfully update exam status.");
      this.setState({ loading: false });
      window.location = "/all-exams";
    } catch (ex) {
      this.setState({ loading: false });
      toast.error("Error occured couldnt update...");
    }
  };

  render() {
    const { exams } = this.state;
    return this.state.loading ? (
      <Spinner />
    ) : (
      <React.Fragment>
        <div className="card height-auto">
          <div className="card-body">
            <div className="heading-layout1">
              <div className="item-title">
                <h3>All Scheduled Exam</h3>
              </div>
            </div>
            {exams.length === 0 ? (
              <h1>No exam scheduled yet. </h1>
            ) : (
              <ExamTable
                exams={exams}
                onDelete={this.handleDelete}
                onUpdate={this.handleExamUpdate}
              />
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AllExams;
