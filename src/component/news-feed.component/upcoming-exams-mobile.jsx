import React from "react";

const UpcomingExamsMobile = () => {
  return (
    <div className="horizontal-scroll">
      <div className="col-lg-3 inner-card">
        <aside className="sidebar static">
          <div className="widget">
            <h4 className="widget-title">
              Upcoming Exams <br />
              <span>
                <p>
                  <span
                    style={{ color: "#0a98dc", textDecoration: "underline" }}
                  >
                    The Craddle of Knowledge
                  </span>
                  <br />
                  <span style={{ width: "50%" }}>
                    We are looking for a<br />
                    competant accountant at the
                    <br />
                    craddle of knowledge
                  </span>
                </p>
                <br />
              </span>
            </h4>
          </div>
          {/* <!-- page like widget --> */}
        </aside>
      </div>
      {/* <!-- sidebar --> */}
      <div className="col-lg-3 inner-card">
        <aside className="sidebar static">
          <div className="widget">
            <h4 className="widget-title">
              Upcoming Exams <br />
              <span>
                <p>
                  <span
                    style={{ color: "#0a98dc", textDecoration: "underline" }}
                  >
                    NIIT College
                  </span>
                  <br />
                  <span style={{ width: "50%" }}>
                    We are looking for a<br />
                    competant accountant at the
                    <br />
                    craddle of knowledge
                  </span>
                </p>
                <br />
              </span>
            </h4>
          </div>
        </aside>
      </div>
      {/* <!-- sidebar --> */}
    </div>
  );
};

export default UpcomingExamsMobile;
