import React from "react";
import CountUp from "react-countup";

const SummeryItem = ({ title, count, contentColor, icon: Icon, textColor }) => {
  let bgColor = "item-icon bg-light-";
  bgColor += contentColor;
  return (
    <div className="col-xl-3 col-sm-6 col-12">
      <div className="dashboard-summery-one mg-b-20">
        <div className="row align-items-center">
          <div className="col-6">
            <div className={bgColor}>
              <i>
                <Icon size="40" color={textColor} />
              </i>
            </div>
          </div>
          <div className="col-6">
            <div className="item-content">
              <div className="item-title">{title}</div>
              <div className="item-number">
                <span className="counter" data-num={count}>
                  <CountUp end={count ?? 0} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummeryItem;
