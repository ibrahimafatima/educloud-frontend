import React, { Component } from "react";
import { Link } from "react-router-dom";

class SearchForm extends Component {
  render() {
    const { onChange, linkTitle, link, students } = this.props;
    console.log("props ", students);
    return (
      <form className="mg-b-20">
        <div className="row gutters-8">
          <div className="col-4-xxxl col-xl-4 col-lg-3 col-12 form-group">
            <h4>
              Go To <Link to={`/${link}`}>{linkTitle}</Link>
            </h4>
          </div>
          <div className="col-4-xxxl col-xl-3 col-lg-3 col-12 form-group">
            {students !== 0 && (
              <input
                type="text"
                onChange={onChange}
                placeholder="Search student by name ..."
                className="form-control"
              ></input>
            )}
          </div>
        </div>
      </form>
    );
  }
}

export default SearchForm;
