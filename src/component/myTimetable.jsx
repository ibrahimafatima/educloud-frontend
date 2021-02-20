import React, { Component } from "react";
import { getTimetable, removeTimetable } from "../services/teacherService";
import auth from "../services/authService";
import TimeTable from "./tables/timeTable";
import Search from "./reusableComponent/search";
import { toast } from "react-toastify";

class MyTimetable extends Component {
  state = {
    timetables: []
  };

  async componentDidMount() {
    try {
      const { data: timetables } = await getTimetable();
      this.setState({ timetables });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("Couldnt load timetable data");
    }
  }

  handleDelete = async timetable => {
    const originalState = this.state.timetables;
    this.setState({
      timetables: this.state.timetables.filter(t => t._id !== timetable._id)
    });
    try {
      await removeTimetable(timetable._id);
      toast.success("Removed successfully");
    } catch (ex) {
      toast.error("Error occured couldnt remove...");
      this.setState({ timetables: originalState });
    }
  };

  handleChange = async e => {
    const currentInput = e.currentTarget.value;
    if (currentInput === "") {
      const { data } = await getTimetable();
      this.setState({ timetables: data });
    } else {
      this.setState({
        timetables: this.state.timetables.filter(t =>
          t.className.toLowerCase().startsWith(currentInput.toLowerCase())
        )
      });
    }
  };

  render() {
    const { timetables } = this.state;
    return (
      <React.Fragment>
        {auth.getCurrentUser().isAdmin && (
          <form className="mg-b-20">
            <div className="row gutters-8">
              <div className="col-4-xxxl col-xl-4 col-lg-3 col-12 form-group"></div>
              <div className="col-4-xxxl col-xl-3 col-lg-3 col-12 form-group">
                <Search
                  onChange={this.handleChange}
                  placeholder="Search by class ..."
                />
              </div>
            </div>
          </form>
        )}
        <div className="card height-auto">
          <div className="card-body">
            <div className="heading-layout1">
              <div className="item-title">
                <h3>My Timetable</h3>
              </div>
            </div>
            {timetables.length === 0 ? (
              <h1>No Timetable scheduled for now </h1>
            ) : (
              <TimeTable timetables={timetables} onDelete={this.handleDelete} />
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default MyTimetable;
