import React, { Component } from "react";
import Summery from "./reusableComponent/summery";
import NoticeBoard from "./noticeBoard";
import StudentGender from "./reusableComponent/studentGender";
import MyTimetable from "./myTimetable";
import auth from "../services/authService";
import AllExams from "./allExams";

class AdminDashboard extends Component {
  state = {
    data: {},
  };
  render() {
    const { user } = this.props;
    return (
      <React.Fragment>
        <Summery />
        <div className="row gutters-20">
          <NoticeBoard user={user} />
          <StudentGender />
        </div>
        {auth.getCurrentUser().isStudent && <MyTimetable />}
        {auth.getCurrentUser().isAdmin && <AllExams />}
        {auth.getCurrentUser().isTeacher && <MyTimetable />}
      </React.Fragment>
    );
  }
}

export default AdminDashboard;
