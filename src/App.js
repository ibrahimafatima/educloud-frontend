import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Dashbord from "./component/dashboard";
import ConfirmAccount from "./component/confirmAccount";
import ResetPassword from "./component/resetPassword";
import Registration from "./component/registration";
import Login from "./component/login";
import ProtectedRoute from "./component/reusableComponent/protectedRoute";
import "react-toastify/dist/ReactToastify.css";
import jwtDecode from "jwt-decode";
import "./App.css";

class App extends Component {
  state = {};

  componentDidMount() {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      this.setState({ user });
    } catch (ex) {}
  }
  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <Switch>
          <Route
            path="/dashboard"
            render={(props) => <Dashbord {...props} user={this.state.user} />}
          />
          <ProtectedRoute exact path="/" currentUser={user} component={Login} />
          <Route path="/registration" component={Registration} />
          <Route path="/confirm-account" component={ConfirmAccount} />
          <Route path="/reset-password" component={ResetPassword} />

          {/* <Route
            path="/reset-student-password"
            component={ResetStudentPassword}
          />
          <Route path="/confirm-student" component={ConfirmStudent} />
          <Route
            path="/reset-password"
            component={ResetPassword}
          /> */}
          <ProtectedRoute
            path="/logout"
            currentUser={user}
            component={Dashbord}
          />
          <Route path="/add-teacher/:id" component={Dashbord} />
          <Route path="/all-teacher" component={Dashbord} />
          <Route path="/teacher/:id" component={Dashbord} />
          <Route path="/student/:id" component={Dashbord} />
          <Route path="/admin/:id" component={Dashbord} />
          <Route path="/account/:id" component={Dashbord} />
          <Route path="/student-account/:id" component={Dashbord} />
          <Route path="/admin-dashboard" component={Dashbord} />
          <Route path="/add-class/:id" component={Dashbord} />
          <Route path="/all-class" component={Dashbord} />
          <Route path="/add-student/:id" component={Dashbord} />
          <Route path="/students-fee" component={Dashbord} />
          <Route path="/payment/:id" component={Dashbord} />
          <Route path="/payment-details/:id" component={Dashbord} />
          <Route path="/add-subject/:id" component={Dashbord} />
          <Route path="/all-subject" component={Dashbord} />
          <Route path="/all-student/:id" component={Dashbord} />
          <Route path="/print" component={Dashbord} />
          <Route path="/notice-board/:id" component={Dashbord} />
          <Route path="/all-notice" component={Dashbord} />
          <Route path="/add-exams/:id" component={Dashbord} />
          <Route path="/all-exams" component={Dashbord} />
          <Route path="/add-timetable/:id" component={Dashbord} />
          <Route path="/my-timetable" component={Dashbord} />
          <Route path="/add-book/:id" component={Dashbord} />
          <Route path="/all-books" component={Dashbord} />
          <Route path="/add-assignment" component={Dashbord} />
          <Route path="/all-assignment" component={Dashbord} />
          <Route path="/my-assignment/:id" component={Dashbord} />
          <Route path="/post-mark/:id" component={Dashbord} />
          <Route path="/view-mark/:id" component={Dashbord} />
          <Route path="/added-student/:id" component={Dashbord} />
          <Route path="/promote-student/:id" component={Dashbord} />
          <Route path="/new-promotion/:id" component={Dashbord} />
          <Route path="/new-term/:id" component={Dashbord} />
          <Route path="/fees-reporting" component={Dashbord} />
          <Route path="/print-fees-report" component={Dashbord} />
          <Route path="/chat" component={Dashbord} />
          <Route path="/" component={Login} />
          <Route path="/discussion/:id" component={Dashbord} />
          <Route path="/admin-end-year" component={Dashbord} />
          <Route path="/teacher-end-year" component={Dashbord} />
          <Route path="/pre-chat/:id" component={Dashbord} />
          <Route path="/not-found" component={Dashbord} />
          <Redirect to="not-found" />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
