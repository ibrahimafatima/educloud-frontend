import React, { Component } from "react";
import Delete from "./reusableComponent/delete";
import Table from "./reusableComponent/table";

class BookTable extends Component {
  columns = [
    { path: "bookTitle", title: "Book Title" },
    { path: "author", title: "Author" },
    { path: "totalQty", title: "Total quantity" },
    { path: "addedBy", title: "Added By" },
    { path: "_id", title: "Book ID" },
    {
      path: "like",
      value: classe => (
        <Delete onDoubleClick={() => this.props.onDelete(classe)} />
      )
    }
  ];
  render() {
    const { books } = this.props;
    return (
      <Table elements={books} columns={this.columns} routePath="add-book" />
    );
  }
}

export default BookTable;
