import React, { Component } from "react";
import PieChart from "react-minimal-pie-chart";
import { FaMale, FaFemale } from "react-icons/fa";
import { getStudents } from "../../services/teacherService";

class StudentGender extends Component {
  state = {
    maleStudents: [],
    femaleStudents: [],
  };

  async componentDidMount() {
    const { data } = await getStudents();
    this.setState({
      maleStudents: data.filter((m) => m.gender === "Male"),
      femaleStudents: data.filter((f) => f.gender === "Female"),
    });
  }
  render() {
    const { femaleStudents, maleStudents } = this.state;
    return (
      <div className="col-12 col-xl-4 col-3-xxxl">
        <div className="card dashboard-card-two pd-b-20">
          <div className="card-body">
            <div className="heading-layout1">
              <div className="item-title">
                <h3>Student Gender sta.</h3>
              </div>
            </div>
            <div className="container">
              <PieChart
                animate
                label
                animationDuration={2000}
                data={[
                  {
                    title: "Male",
                    value: maleStudents.length,
                    color: "#042954",
                  },
                  {
                    title: "Female",
                    value: femaleStudents.length,
                    color: "#FFA501",
                  },
                ]}
              />
            </div>
            <div className="student-report">
              <div className="student-count pseudo-bg-blue">
                <h4 className="item-title">
                  <FaFemale /> Female Students :
                  <span className="item-number">{femaleStudents.length}</span>
                </h4>
                <div className="female_circle"></div>
                {/* <div className="item-number">10,500</div> */}
              </div>
              <div className="student-count pseudo-bg-yellow">
                <h4 className="item-title">
                  <FaMale /> Male Students :
                  <span className="item-number">{maleStudents.length}</span>
                </h4>
                <div className="male_circle"></div>
                {/* <div className="item-number">24,500</div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default StudentGender;
