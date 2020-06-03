import React, { Component } from "react";
import { GoDiffRenamed } from "react-icons/go";
import { GiBookCover } from "react-icons/gi";
import { MdDateRange } from "react-icons/md";
import { getSchoolExams } from "../../services/teacherService";
import Moment from "react-moment";

class UpcomingExamsMobile extends Component {
  state = {
    allExams: [],
  };

  async componentDidMount() {
    const { data: allExams } = await getSchoolExams();
    this.setState({ allExams });
  }

  render() {
    const { allExams } = this.state;
    return (
      <div className="horizontal-scroll">
        {allExams.length === 0 ? (
          <h4>
            <i>No Exam yet posted!</i>
          </h4>
        ) : (
          allExams.map((exam) => (
            <div className="col-lg-3 inner-card" key={exam._id}>
              <aside className="sidebar static">
                <div className="widget">
                  <h4 className="widget-title">
                    Upcoming Exams <br />
                    <span>
                      <p>
                        <span
                          style={{
                            color: "#0a98dc",
                            textDecoration: "underline",
                          }}
                        >
                          {exam.schoolName}
                        </span>
                        <br />
                        <span style={{ width: "50%" }}>
                          <span>
                            <i>
                              <GoDiffRenamed />
                            </i>
                            <span>{exam.exam_name}</span>
                          </span>
                          <br />
                          <span>
                            <i>
                              <GiBookCover />
                            </i>
                            <span>{exam.subject}</span>
                          </span>
                          <br />
                          <span>
                            <i>
                              <MdDateRange />
                            </i>
                            <span>
                              <Moment format="Do MMMM YYYY">
                                {exam.schedule_date}
                              </Moment>
                            </span>
                          </span>
                        </span>
                      </p>
                      <br />
                    </span>
                  </h4>
                </div>
                {/* <!-- page like widget --> */}
              </aside>
            </div>
          ))
        )}
        {/* <!-- sidebar --> */}
      </div>
    );
  }
}

export default UpcomingExamsMobile;
