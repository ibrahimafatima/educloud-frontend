import React from "react";
import banner from "../../images/banner.jpg";
import bookIcon from "../../images/book-icon.png";
import { FaGraduationCap } from "react-icons/fa";
import Events from "./events";

const RecentEvent = () => {
  return (
    <div className="col-lg-3">
      <div className="recent_activities">
        <aside
          className="sidebar static wide-screen-feed"
          style={{ display: "block" }}
        >
          <div className="widget recent_activities">
            <h4 className="widget-title">
              <b>Recent Event</b>
            </h4>
            <Events />
          </div>
          {/* <!-- recent activites --> */}
          <div className="widget education-banner">
            <div className="banner medium-opacity bluesh">
              <div
                className="bg-image"
                style={{ backgroundImage: `url(${banner})` }}
              ></div>
              <div className="baner-top">
                <span>
                  <img alt="" src={bookIcon} />
                </span>
                <i>
                  <FaGraduationCap />
                </i>
              </div>
              <div className="banermeta">
                <p>Education is the key for a brighter future.</p>
                <span>EduCloud presence</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default RecentEvent;
