import React, { Component } from "react";
import student from "../images/student.png";
import student1 from "../images/student1.png";
import { getStudent } from "../services/studentService";
import auth from "../services/authService";

class StudentProfile extends Component {
  state = {
    data: {},
    values: [
      { title: "Username", path: "name" },
      { title: "Reg. number", path: "registration_number" },
      { title: "Class", path: "class_name" },
      { title: "Term", path: "term" },
      { title: "Father name", path: "father_name" },
      { title: "Mother name", path: "mother_name" },
      { title: "Gender", path: "gender" },
      { title: "Date of Birth", path: "dob" },
      { title: "Email", path: "email" },
      { title: "Phone", path: "phone" },
      { title: "Address", path: "address" }
    ]
  };

  feeDetail = { title: "School Fee Paid", path: "fee_paid" };

  constructor() {
    super();
    if (!auth.getCurrentUser().isStudent) {
      this.state.values.push(this.feeDetail);
    }
  }

  async componentDidMount() {
    try {
      const { data } = await getStudent(this.props.match.params.id);
      this.setState({ data });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        return this.props.history.replace("/not-found");
    }
  }

  render() {
    const { data, values } = this.state;
    console.log(data);
    return (
      <React.Fragment>
        <div className="card height-auto">
          <div className="card-body">
            <div className="heading-layout1">
              <div className="item-title">
                <h3>About {data.name}</h3>
              </div>
            </div>
            <div className="single-info-details">
              <div className="item-img">
                <img
                  src={data.gender === "Female" ? student : student1}
                  alt="teacher"
                ></img>
              </div>
              <div className="item-content">
                <div className="header-inline item-header">
                  <h3 className="text-dark-medium font-medium">{data.name}</h3>
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

export default StudentProfile;
