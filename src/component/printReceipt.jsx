import React, { Component } from "react";
import { getPaymentDetails, getStudent } from "../services/adminService";
import Moment from "react-moment";
import jsPDF from "jspdf";
import logo from "../images/logo.png";
import numToWords from "num-to-words";
import html2canvas from "html2canvas";
import { FaBarcode } from "react-icons/fa";
import auth from "../services/authService";

class PrintReceipt extends Component {
  state = {
    receiptInfo: {},
    studentInfo: {},
  };

  async componentDidMount() {
    const receiptID = localStorage.getItem("receiptID");
    const { data: receiptInfo } = await getPaymentDetails(receiptID);
    const { data: studentInfo } = await getStudent(
      receiptInfo.registration_number
    );
    this.setState({ receiptInfo, studentInfo });
  }

  printDocument() {
    const input = document.getElementById("divToPrint");
    html2canvas(input).then((canvas) => {
      const imageData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imageData, "JPEG", 0, 0);
      pdf.save("download.pdf");
    });
    localStorage.removeItem("receiptID");
  }

  render() {
    const { receiptInfo, studentInfo } = this.state;
    const amount = receiptInfo.amountPaid;
    const admin = auth.getCurrentUser();
    return (
      <React.Fragment>
        <div className="mb5">
          <button className="btn btn-primary" onClick={this.printDocument}>
            print receipt
          </button>
        </div>
        <hr></hr>
        <div
          id="divToPrint"
          className="mt4"
          style={{
            backgroundColor: "#f5f5f5",
            width: "210mm",
            minHeight: "145mm", //297mm
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
                    fontSize: "26px",
                    color: "#042954",
                  }}
                >
                  <b>{admin.schoolName}</b>
                </p>
              </div>
              <div className="col-sm"></div>
            </div>
          </div>
          <div>
            <p
              style={{
                marginTop: "25px",
                textAlign: "center",
                fontSize: "16px",
              }}
            >
              <i>OFFICIAL RECEIPT</i>{" "}
            </p>
          </div>
          <div>
            <div className="container" style={{ textAlign: "center" }}>
              <div className="row">
                <div className="col">
                  <p>
                    Receipt #{" "}
                    <span>
                      <b>{receiptInfo._id}</b>
                    </span>
                  </p>
                </div>
                <div className="col">
                  <p>
                    {" "}
                    Receipt Date:{" "}
                    <span>
                      <b>
                        <Moment format="Do MMMM YYYY">
                          {receiptInfo.paymentDate}
                        </Moment>
                      </b>
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="container" style={{ textAlign: "center" }}>
              <div className="row">
                <div className="col">
                  <p>
                    {" "}
                    Received from:{" "}
                    <span>
                      <b>{studentInfo.name}</b>
                    </span>
                  </p>
                </div>
                <div className="col"></div>
              </div>
            </div>
            <div className="container" style={{ textAlign: "center" }}>
              <div className="row">
                <div className="col">
                  <p>
                    {" "}
                    Registration Number:{" "}
                    <span>
                      <b>{studentInfo.registration_number}</b>
                    </span>
                  </p>
                </div>
                <div className="col"></div>
              </div>
            </div>
            <div className="container" style={{ textAlign: "center" }}>
              <div className="row">
                <div className="col">
                  <p>
                    {" "}
                    The sum of:
                    <span>
                      <b>
                        {" "}
                        {numToWords(amount, { ands: true, commas: true })}{" "}
                        {admin.currency}
                      </b>
                    </span>
                  </p>
                </div>
                <div className="col"></div>
              </div>
            </div>
            <div className="container" style={{ textAlign: "center" }}>
              <div className="row">
                <div className="col">
                  <p>
                    Towards:{" "}
                    <span>
                      <b>{receiptInfo.operatedBy}</b>
                    </span>
                  </p>
                </div>
                <div className="col">
                  {" "}
                  <p>{receiptInfo.operatedBy}</p>
                  <p>
                    <i>Signature</i>
                  </p>
                </div>
              </div>
            </div>
            <div className="container" style={{ textAlign: "center" }}>
              <div className="row">
                <div className="col">
                  <p>
                    In:{" "}
                    <span>
                      <b>
                        Cash ({receiptInfo.amountPaid} {admin.currency})
                      </b>
                    </span>
                  </p>
                </div>
                <div className="col"></div>
              </div>
            </div>
            <div>
              <FaBarcode
                style={{ width: "80px", height: "30px", marginLeft: "50px" }}
              />
            </div>
          </div>
          <hr></hr>
        </div>
      </React.Fragment>
    );
  }
}

export default PrintReceipt;
