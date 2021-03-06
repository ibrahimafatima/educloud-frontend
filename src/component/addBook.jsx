import React from "react";
import { addBook, getBook } from "../services/adminService";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import Form from "./reusableComponent/form";
import { Link } from "react-router-dom";
import Spinner from "./reusableComponent/spinner";

class AddBook extends Form {
  state = {
    data: { bookTitle: "", author: "", totalQty: 0 },
    loading: true,
    error: {},
  };

  schema = {
    _id: Joi.string(),
    bookTitle: Joi.string().max(20).required().label("Book title"),
    author: Joi.string().max(20).required().label("Author"),
    totalQty: Joi.number().min(0).required().label("Total quantity"),
  };

  async componentDidMount() {
    if (this.props.location.pathname === "/add-book/new") {
      this.setState({ loading: false });
      return;
    }
    try {
      const { data: book } = await getBook(this.props.match.params.id);
      const data = {
        _id: book._id,
        bookTitle: book.bookTitle,
        author: book.author,
        totalQty: book.totalQty,
      };
      this.setState({ data, loading: false });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        return this.props.history.replace("/not-found");
      }
    }
  }

  doSubmit = async () => {
    try {
      this.setState({ loading: true });
      await addBook(this.state.data);
      this.setState({
        data: { bookTitle: "", author: "", totalQty: 0 },
      });
      toast.success("Library updated successfully...");
      this.setState({ loading: false });
    } catch (ex) {
      this.setState({ loading: false });
      if (ex.response && ex.response.status === 400) {
        const error = { ...this.state.error };
        error.author = ex.response.data;
        this.setState({ error });
      }
    }
  };

  render() {
    const { location } = this.props;
    return this.state.loading ? (
      <Spinner />
    ) : (
      <React.Fragment>
        <div>
          <h4>
            Go To <Link to="/all-books">Library Books</Link>
          </h4>
        </div>
        <div className="card height-auto">
          <div className="card-body">
            <div className="heading-layout1">
              <div className="item-title">
                {location.pathname === "/add-book/new" ? (
                  <h3>Add New Book</h3>
                ) : (
                  <h3>Update Library Book</h3>
                )}
              </div>
            </div>
            <form onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="col-xl-3 col-lg-6 col-12 form-group">
                  <label>Book title *</label>
                  {this.renderInput("", "bookTitle", "text", "form-control")}
                </div>
                <div className="col-xl-3 col-lg-6 col-12 form-group">
                  <label>Author *</label>
                  {this.renderInput("", "author", "text", "form-control")}
                </div>
                <div className="col-xl-3 col-lg-6 col-12 form-group">
                  <label>Total Quantity *</label>
                  {this.renderInput("", "totalQty", "text", "form-control")}
                </div>
                <div className="col-12 form-group mg-t-8">
                  {this.renderButton(
                    "Save",
                    "btn btn-ln btn-size bg-blue-dark btn-hover-yellow"
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AddBook;
