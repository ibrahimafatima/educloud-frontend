import React, { Component } from "react";
import teacher from "../images/teacher.jpg";
import teacher1 from "../images/teacher1.jpg";
import { getTeacher } from "../services/adminService";
import { getCourse } from "../services/teacherService";

class TeacherDetails extends Component {
  state = {
    data: {},
    subjects: [],
    values: [
      { title: "Username", path: "username" },
      { title: "First name", path: "firstName" },
      { title: "Last name", path: "lastName" },
      { title: "Gender", path: "gender" },
      { title: "Date of Birth", path: "dob" },
      { title: "Teacher ID", path: "teacherID" },
      { title: "Email", path: "email" },
      { title: "Phone", path: "phone" },
      { title: "Address", path: "address" },
      { title: "Subject", path: "numberOfSubject" }
    ]
  };

  async componentDidMount() {
    try {
      const { data } = await getTeacher(this.props.match.params.id);
      const { data: subjects } = await getCourse(data.teacherID);
      this.setState({ data, subjects });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        return this.props.history.replace("/not-found");
    }
  }

  render() {
    const { data, values, subjects } = this.state;
    return (
      <React.Fragment>
        <div></div>

        <div className="card height-auto">
          <div className="card-body">
            <div className="heading-layout1">
              <div className="item-title">
                <h3>About {data.username}</h3>
              </div>
            </div>
            <div className="single-info-details">
              <div className="item-img">
                <img
                  src={data.gender === "Female" ? teacher : teacher1}
                  alt="teacher"
                ></img>
              </div>
              <div className="item-content">
                <div className="header-inline item-header">
                  <h3 className="text-dark-medium font-medium">
                    {data.username}
                  </h3>
                </div>
                <div className="info-table table-responsive">
                  <table className="table text-nowrap">
                    <tbody>
                      {values.map(value => (
                        <tr key={value.title}>
                          <td>{value.title} :</td>
                          <td
                            className="font-medium text-dark-medium"
                            style={{
                              color:
                                data[value.path] !== "Not Specified"
                                  ? "blue"
                                  : "red"
                            }}
                          >
                            {data[value.path]}
                          </td>
                        </tr>
                      ))}
                      <tr>
                        <td>All subjects:</td>
                        {subjects.length === 0 ? (
                          <td className="font-medium text-dark-medium">
                            None (For now)
                          </td>
                        ) : (
                          subjects.map(subject => (
                            <td
                              key={subject._id}
                              className="font-medium text-dark-medium"
                            >
                              {subject.name}
                            </td>
                          ))
                        )}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default TeacherDetails;
