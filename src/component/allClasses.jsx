import React, { Component } from "react";
import ClassTable from "./classTable";
import { getClasses, removeClass } from "../services/adminService";
import { toast } from "react-toastify";
import Search from "./reusableComponent/search";

class AllClasses extends Component {
  state = {
    classes: [],
  };

  async componentDidMount() {
    try {
      const { data } = await getClasses();
      this.setState({ classes: data });
    } catch (ex) {
      if (ex.response && ex.response.status === 400)
        toast.error("Couldnt load class data");
    }
  }

  handleDelete = async (classe) => {
    const originalState = this.state.classes;
    this.setState({
      classes: this.state.classes.filter((c) => c._id !== classe._id),
    });
    try {
      await removeClass(classe._id);
      toast.success("Class deleted successfully");
    } catch (ex) {
      toast.error(ex.response.data);
      this.setState({ classes: originalState });
    }
  };

  handleChange = async (e) => {
    const currentInput = e.currentTarget.value;
    if (currentInput === "") {
      const { data } = await getClasses();
      this.setState({ classes: data });
    } else {
      this.setState({
        classes: this.state.classes.filter((c) =>
          c.className.toLowerCase().startsWith(currentInput.toLowerCase())
        ),
      });
    }
  };

  render() {
    const { classes } = this.state;
    return (
      <React.Fragment>
        <form className="mg-b-20">
          <div className="row gutters-8">
            <div className="col-4-xxxl col-xl-4 col-lg-3 col-12 form-group"></div>
            <div className="col-4-xxxl col-xl-3 col-lg-3 col-12 form-group">
              <Search
                onChange={this.handleChange}
                placeholder="Search class by name ..."
              />
            </div>
          </div>
        </form>
        <div className="card height-auto">
          <div className="card-body">
            <div className="heading-layout1">
              <div className="item-title">
                <h3>All classes</h3>
              </div>
            </div>
            {classes.length === 0 ? (
              <h1>Class list is empty for now </h1>
            ) : (
              <ClassTable classes={classes} onDelete={this.handleDelete} />
            )}
          </div>
        </div>
      </React.Fragment>
    );

    // here we will add pagination and sorting
  }
}

export default AllClasses;
