import React, { Component } from "react";
import { FaUserGraduate, FaUserTie, FaUserFriends } from "react-icons/fa";
import { GiTeacher } from "react-icons/gi";
import { getClasses, getTeachers } from "../../services/adminService";
import { getStudents } from "../../services/teacherService";
import SummeryItem from "./summeryItem";

class Summery extends Component {
  state = {
    id: [0, 1, 2, 3],
    title: ["Students", "Teachers", "Staff", "Classes"],
    count: [],
    textColor: ["green", "blue", "orange", "red"],
    contentColor: ["green", "blue", "yellow", "red"],
    icon: [FaUserGraduate, FaUserTie, FaUserFriends, GiTeacher],
  };

  async componentDidMount() {
    const { data: cls } = await getClasses();
    const { data: students } = await getStudents();
    const { data: teachers } = await getTeachers();
    this.setState({
      count: [
        students.length,
        teachers.length,
        teachers.length + students.length,
        cls.length,
      ],
    });
  }

  render() {
    const { title, count, textColor, contentColor, icon } = this.state;
    return (
      <div className="row gutters-20">
        {this.state.id.map((id) => (
          <SummeryItem
            key={id}
            title={title[id]}
            count={count[id]}
            textColor={textColor[id]}
            contentColor={contentColor[id]}
            icon={icon[id]}
          />
        ))}
      </div>
    );
  }
}

export default Summery;
