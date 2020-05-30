import React from "react";

const UpcomingExams = () => {
  return (
    <div className="col-lg-3 job-opportunity">
      <aside className="sidebar static">
        <div className="widget">
          <h4 className="widget-title">Upcoming Exams</h4>
          <div className="your-page">
            <div className="page-meta">
              <span title="" style={{ fontSize: "14px" }} className="underline">
                The Craddle of Knowledge
              </span>
              <span>
                <i className="ti-agenda"></i>
                <span>Vacant Accountant Post</span>
              </span>
              <span>
                We are looking for a competant accountant at the craddle of
                knowledge
              </span>
            </div>
            <div className="page-likes">
              <ul className="nav nav-tabs likes-btn">
                <li className="nav-item">
                  <hr />
                </li>
              </ul>
            </div>

            <div className="page-meta">
              <span style={{ fontSize: "14px" }} className="underline">
                NIIT College
              </span>
              <span>
                <i className="ti-agenda"></i>
                <span>Vacant Teacher Post</span>
              </span>
              <span>
                NIIT College is looking for a Java teacher, interview will be
                scheduled right after CV is submitted. Thank you!
              </span>
            </div>
            <div className="page-likes">
              <ul className="nav nav-tabs likes-btn">
                <li className="nav-item">
                  <hr />
                </li>
              </ul>
            </div>

            <div className="page-meta">
              <span style={{ fontSize: "14px" }} className="underline">
                Victoria JHS School
              </span>
              <span>
                <i className="ti-agenda"></i>
                <span>Vacant Teacher Post</span>
              </span>
              <span>
                Victoria JHS School has a vacant post, hence we are looking
                foris looking for a French teacher.
              </span>
            </div>
            <div className="page-likes">
              <ul className="nav nav-tabs likes-btn">
                <li className="nav-item">
                  <hr />
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* <!-- page like widget --> */}
      </aside>
    </div>
  );
};

export default UpcomingExams;
