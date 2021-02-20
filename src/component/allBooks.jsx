import React, { Component } from "react";
import { getBooks, removeBook } from "../services/adminService";
import { toast } from "react-toastify";
import Search from "./reusableComponent/search";
import BookTable from "./bookTable";

class AllBooks extends Component {
  state = {
    books: [],
    virtualBooks: []
  };

  async componentDidMount() {
    try {
      const { data } = await getBooks();
      this.setState({ books: data, virtualBooks: data });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("Couldnt load library");
    }
  }

  handleDelete = async book => {
    const originalState = this.state.books;
    this.setState({
      books: this.state.books.filter(b => b._id !== book._id)
    });
    try {
      await removeBook(book._id);
      toast.success("Library updated successfully");
    } catch (ex) {
      toast.error("Error occured couldnt delete...");
      this.setState({ books: originalState });
    }
  };

  handleChange = async e => {
    const currentInput = e.currentTarget.value;
      this.setState({
        books: this.state.virtualBooks.filter(b =>
          b.bookTitle.toLowerCase().startsWith(currentInput.toLowerCase())
        )
      });
  };

  render() {
    const { books } = this.state;
    return (
      <React.Fragment>
        <form className="mg-b-20">
          <div className="row gutters-8">
            <div className="col-4-xxxl col-xl-4 col-lg-3 col-12 form-group"></div>
            <div className="col-4-xxxl col-xl-3 col-lg-3 col-12 form-group">
              <Search
                onChange={this.handleChange}
                placeholder="Search class by book title ..."
              />
            </div>
          </div>
        </form>
        <div className="card height-auto">
          <div className="card-body">
            <div className="heading-layout1">
              <div className="item-title">
                <h3>Library Books</h3>
              </div>
            </div>
            {books.length === 0 ? (
              <h1>The Library is empty for now </h1>
            ) : (
              <BookTable books={books} onDelete={this.handleDelete} />
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AllBooks;
