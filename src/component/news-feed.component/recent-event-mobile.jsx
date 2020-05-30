import React from "react";
import Events from "./events";

const RecentEventMobile = () => {
  return (
    <section className="event-section">
      {/* <!--HERE WILL BE DISPLAYED THE RECENT EVENT ON SMALL DEVICES--> */}
      <div className="gap gray-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="row merged20" id="page-contents">
                <div className="col-lg-3">
                  <aside className="sidebar static">
                    <div className="widget" id="recent_activities">
                      <h4 className="widget-title">
                        <b>Recent Event</b>
                      </h4>
                      <Events />
                    </div>
                  </aside>
                </div>
                {/* <!-- sidebar --> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecentEventMobile;
