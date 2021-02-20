import React, { Component } from "react";
import { getMarks, removeMark } from "../services/studentService";
import MarkTable from "./tables/markTable";
import { toast } from "react-toastify";

class ViewMark extends Component {
  state = {
    marks: [],
  };

  handleDelete = async (mark) => {
    const originalState = this.state.marks;
    this.setState({
      marks: this.state.marks.filter((m) => m._id !== mark._id),
    });
    try {
      await removeMark(mark._id);
      toast.success("mark deleted successfully");
    } catch (ex) {
      toast.error("Error occured couldnt delete...");
      this.setState({ marks: originalState });
    }
  };

  async componentDidMount() {
    try {
      const { data } = await getMarks(this.props.match.params.id);
      this.setState({ marks: data });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        return this.props.history.replace("/not-found");
    }
  }

  render() {
    const { marks } = this.state;
    return (
      <React.Fragment>
        <div className="card height-auto">
          <div className="card-body">
            <div className="heading-layout1">
              <div className="item-title">
                <h3>All {marks[0] ? marks[0].studentName : ""} marks</h3>
              </div>
            </div>
            {marks.length === 0 ? (
              <h1>No mark posted yet. </h1>
            ) : (
              <MarkTable marks={marks} onDelete={this.handleDelete} />
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ViewMark;
