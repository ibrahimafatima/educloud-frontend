import React, { Component } from "react";
import { GoDiffRenamed } from "react-icons/go";
import { GiBookCover } from "react-icons/gi";
import { MdDateRange } from "react-icons/md";
import { getSchoolExams } from "../../services/teacherService";
import Moment from "react-moment";

class UpcomingExams extends Component {
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
      <div className="col-lg-3 job-opportunity">
        <aside className="sidebar static">
          <div className="widget">
            <h4 className="widget-title">
              <b>Upcoming Exams</b>
            </h4>
            <div className="your-page">
              {allExams.length === 0 ? (
                <h4>
                  <i>No Exams yet posted!</i>
                </h4>
              ) : (
                allExams.map((exam) => (
                  <div className="page-meta" key={exam._id}>
                    <span
                      title=""
                      style={{ fontSize: "14px", color: "#088DCD" }}
                      className="underline"
                    >
                      {exam.schoolName} ({exam.className})
                    </span>
                    <span>
                      <i>
                        <GoDiffRenamed />
                      </i>
                      <span>{exam.exam_name}</span>
                    </span>
                    <span>
                      <i>
                        <GiBookCover />
                      </i>
                      <span>{exam.subject}</span>
                    </span>
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
                    <hr />
                  </div>
                ))
              )}
            </div>
          </div>
          {/* <!-- page like widget --> */}
        </aside>
      </div>
    );
  }
}

export default UpcomingExams;
