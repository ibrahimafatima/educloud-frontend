import React, { Component } from "react";
import Table from "./reusableComponent/table";
import Delete from "./reusableComponent/delete";

class NoticeBoardTable extends Component {
  state = {
    columns: [
      { path: "posted_by", title: "Posted By" },
      { path: "post_date", title: "Post date" },
      { path: "event_date", title: "Event date" },
      {
        path: "event",
        value: notice => (
          <Delete onDoubleClick={() => this.props.onDelete(notice)} />
        )
      }
    ]
  };

  render() {
    const { notices } = this.props;
    const { columns } = this.state;
    return (
      <Table elements={notices} columns={columns} routePath="notice-board" />
    );
  }
}

export default NoticeBoardTable;
