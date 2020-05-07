import React, { Component } from "react";
import Moment from "react-moment";
import jsPDF from "jspdf";
import logo from "../images/logo.png";
import html2canvas from "html2canvas";
import { getStudent } from "../services/teacherService";
import { toast } from "react-toastify";
import auth from "../services/authService";

class PrintFeesReport extends Component {
  state = {
    paymentInfo: [],
  };

  async componentDidMount() {
    try {
      const className = localStorage.getItem("class_report");
      const { data: paymentInfo } = await getStudent(className);
      this.setState({ paymentInfo });
    } catch (ex) {
      toast.error(ex.response.data);
    }
  }

  printDocument() {
    const input = document.getElementById("divToPrint");
    html2canvas(input).then((canvas) => {
      const imageData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imageData, "JPEG", 0, 0);
      pdf.save("download.pdf");
    });
    localStorage.removeItem("class_report");
  }

  render() {
    const { paymentInfo } = this.state;
    console.log(paymentInfo);
    return (
      <React.Fragment>
        <div className="mb5">
          <button className="btn btn-primary" onClick={this.printDocument}>
            print report
          </button>
        </div>
        <hr></hr>
        <div
          id="divToPrint"
          className="mt4"
          style={{
            backgroundColor: "#f5f5f5",
            width: "210mm",
            minHeight: "297mm", //297mm
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <div className="container">
            <div
              className="row"
              style={{ marginTop: "30px", marginLeft: "18px" }}
            >
              <div className="col-sm">
                {" "}
                <img
                  alt="no"
                  src={logo}
                  style={{
                    textAlign: "left",
                    width: "70px",
                    height: "70px",
                  }}
                />
              </div>
              <div className="col-sm">
                <p
                  style={{
                    textAlign: "center",
                    marginTop: "14px",
                    fontSize: "22px",
                    color: "#042954",
                  }}
                >
                  <b>
                    <u>{`${localStorage.getItem(
                      "class_report"
                    )} Fee payment Report`}</u>
                  </b>
                </p>
              </div>
              <div className="col-sm"></div>
            </div>
            <p
              style={{
                textAlign: "center",
                marginTop: "8px",
                fontSize: "16px",
                color: "#042954",
              }}
            >
              <b>
                <i>
                  <u>
                    {`Reporting data: `}{" "}
                    <Moment format="Do MMMM YYYY">{new Date()}</Moment>
                  </u>
                </i>
              </b>
            </p>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-sm">
                <b>Student name</b>
              </div>
              <div className="col-sm">
                <b>Registration Number</b>
              </div>
              <div className="col-sm">
                <b>Amount Paid</b>
              </div>
            </div>
          </div>
          <hr></hr>
          <div className="container">
            {paymentInfo.map((studentInfo) => (
              <div className="row">
                <div className="col-sm">{studentInfo.name}</div>
                <div className="col-sm">{studentInfo.registration_number}</div>
                <div className="col-sm">
                  {studentInfo.fee_paid} {auth.getCurrentUser().currency}
                </div>
              </div>
            ))}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default PrintFeesReport;
