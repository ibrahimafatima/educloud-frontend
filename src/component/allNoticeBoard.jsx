import React, { Component } from "react";
import { getNoticeBoard, removeNotice } from "../services/adminService";
import NoticeBoardTable from "./tables/noticeBoardTable";
import { toast } from "react-toastify";

class AllNoticeBoard extends Component {
  state = {
    notices: []
  };

  async componentDidMount() {
    try {
      const { data } = await getNoticeBoard();
      this.setState({ notices: data });
    } catch (ex) {
      if (ex.response && ex.response.status === 400)
        toast.error("Couldnt load notice board data");
    }
  }

  handleDelete = async notice => {
    const originalState = this.state.notices;
    this.setState({
      notices: this.state.notices.filter(n => n._id !== notice._id)
    });
    try {
      await removeNotice(notice._id);
      toast.success("Successfully removed from notice board.");
    } catch (ex) {
      toast.error("Error occured couldnt delete...");
      this.setState({ notices: originalState });
    }
  };

  render() {
    const { notices } = this.state;
    return (
      <React.Fragment>
        <div className="card height-auto">
          <div className="card-body">
            <NoticeBoardTable notices={notices} onDelete={this.handleDelete} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AllNoticeBoard;
