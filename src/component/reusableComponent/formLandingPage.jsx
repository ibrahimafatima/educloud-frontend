import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";

const FormLandingPage = () => {
  const style = { color: "white" };
  const social = { margin: "10px", color: "white" };
  return (
    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
      <div className="land-featurearea">
        <div className="land-meta">
          <h1 style={style}>EduCloud</h1>
          <p>Africa's Education on a single Cloud.</p>
          <div>
            <span>
              <img alt="logo" src={logo} height="200px" width="180px"></img>
            </span>
          </div>
          <h5 style={style}>Follow us on</h5>

          <div className="social-icons">
            <Link to="/social">
              <FaFacebookF style={social} />
            </Link>
            <Link to="/social">
              <FaTwitter style={social} />
            </Link>
            <Link to="/social">
              <FaLinkedinIn style={social} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormLandingPage;
