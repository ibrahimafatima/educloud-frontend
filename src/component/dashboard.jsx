import React, { Component } from "react";
//import { Online, Offline } from "react-detect-offline";
import Navbar from "./navbar";
import Breadcubs from "./breadcups";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import AddClass from "./addClass";
import AddBook from "./addBook";
import AllBooks from "./allBooks";
import PrintReceipt from "./printReceipt";
import AddExams from "./addExams";
import AllExams from "./allExams";
import MyTimetable from "./myTimetable";
import AddTimetable from "./addTimetable";
import AddTeacher from "./addTeacher";
import AllTeacher from "./allTeacher";
import FeeDetails from "./feeDetails";
import AllClasses from "./allClasses";
import AddStudent from "./addStudent";
import FeePayment from "./feePayment";
import AllStudent from "./allStudent";
import StudentFee from "./studentFee";
import AddSubject from "./addSubject";
import AllSubject from "./allSubject";
import ViewMark from "./viewMark";
import PostMark from "./postMark";
import NotFound from "./notFound";
import AddedStudent from "./addedStudent";
import StudentAccount from "./studentAccount";
import StudentProfile from "./studentProfile";
import AddToNoticeBoard from "./addToNoticeBoard";
import TeacherAccount from "./teacherAccount";
import TeacherSidebar from "./teacherSidebar";
import AdminSidebar from "./adminSidebar";
import auth from "../services/authService";
import StudentSidebar from "./studentSidebar";
import AllNoticeBoard from "./allNoticeBoard";
import TeacherDetails from "./teacherDetails";
import AdminDashboard from "./adminDashboard";
import AddAssignment from "./addAssignment";
import { sendMessage, getMessages } from "../services/studentService";
import Discussion from "./discussion";
import { pusherChannel } from "../reusableFunctions/pusher";
import StudentPromotion from "./studentsPromotion";
import NewPromotion from "./newPromotion";
import NewTerm from "./newTerm";
import TeacherEndYear from "./teacherEndYear";
import AllAssignment from "./allAssignment";
import FeesReporting from "./feesReporting";
import AdminEndYear from "./adminEndYear";
import PrintFeesReport from "./printFeesReport";
import StudentAssignment from "./studentsAssignment";
import Footer from "./reusableComponent/footer";
import PreChat from "./reusableComponent/preChat";
import Logout from "./logout";
import Chat from "./chat";
import { toast } from "react-toastify";

class Dashboard extends Component {
  state = {
    sidebarToggled: false,
    sidebarExpanded: false,
    message: "",
    chats: [],
  };

  async componentDidMount() {
    const { data: chats } = await getMessages();
    this.setState({ chats });
    const user = auth.getCurrentUser();
    pusherChannel().bind("message", (data) => {
      if (
        user.schoolSecretKey === data.schoolSecretKey &&
        user.class_name === data.classe
      ) {
        this.setState({ chats: [...this.state.chats, data] });

        if (
          this.props.match.path !== "/chat" &&
          user.username !== data.sender
        ) {
          Notification.requestPermission();
          new Notification(
            `Educloud - New chat message from your classmate. \n ${data.message}`
          );
        }
      }
    });
  }

  async post_message() {
    try {
      const payload = {
        message: this.state.message,
      };
      await sendMessage(payload);
    } catch (ex) {
      toast.error(ex.response.data);
    }
  }

  handleTextChange = async (e) => {
    if (e.keyCode === 13) {
      this.post_message();
      this.setState({ message: "" });
    } else {
      this.setState({ message: e.target.value });
    }
  };

  handleClick = async () => {
    this.post_message();
    this.setState({ message: "" });
  };

  expandSidebar = (sidebarName) => {
    this.setState({
      sidebarExpanded: !this.state["sidebarExpanded"],
    });
  };

  toggleSidebar = () => {
    this.setState({ toggle: !this.state.toggle });
  };

  render() {
    const { user } = this.props;
    if (!auth.getCurrentUser()) return <Redirect to="/" />;
    return (
      <BrowserRouter>
        {/* <Online> */}
        <div id="wrapper" className={this.renderWrapperClass()}>
          <Navbar onBarClick={this.toggleSidebar} user={user} />
          <div className="dashboard-page-one">
            {auth.getCurrentUser().isAdmin && (
              <AdminSidebar
                onSidebarExpand={this.expandSidebar}
                onMenuExpand={this.expandMenu}
                isSidebarExpanded={this.state.sidebarExpanded}
                toggleSidebar={this.toggleSidebar}
              />
            )}
            {auth.getCurrentUser().isTeacher && (
              <TeacherSidebar
                onSidebarExpand={this.expandSidebar}
                onMenuExpand={this.expandMenu}
                isSidebarExpanded={this.state.sidebarExpanded}
                toggleSidebar={this.toggleSidebar}
              />
            )}
            {auth.getCurrentUser().isStudent && (
              <StudentSidebar
                onSidebarExpand={this.expandSidebar}
                onMenuExpand={this.expandMenu}
                isSidebarExpanded={this.state.sidebarExpanded}
                toggleSidebar={this.toggleSidebar}
              />
            )}
            <div
              className="dashboard-content-one"
              style={{ marginTop: "65px" }}
            >
              <Breadcubs user={user} />
              <Switch>
                <Route path="/add-teacher/:id" component={AddTeacher} />
                <Route path="/all-teacher" component={AllTeacher} />
                <Route path="/teacher/:id" component={TeacherDetails} />
                <Route path="/student/:id" component={StudentProfile} />
                <Route path="/account/:id" component={TeacherAccount} />
                <Route path="/student-account/:id" component={StudentAccount} />
                <Route path="/logout" component={Logout} />
                <Route path="/add-class/:id" component={AddClass} />
                <Route path="/all-class" component={AllClasses} />
                <Route path="/add-subject/:id" component={AddSubject} />
                <Route path="/all-subject" component={AllSubject} />
                <Route path="/students-fee" component={StudentFee} />
                <Route path="/payment/:id" component={FeePayment} />
                <Route path="/payment-details/:id" component={FeeDetails} />
                <Route path="/all-student/:id" component={AllStudent} />
                <Route path="/notice-board/:id" component={AddToNoticeBoard} />
                <Route path="/all-notice" component={AllNoticeBoard} />
                <Route path="/add-exams/:id" component={AddExams} />
                <Route path="/add-timetable/:id" component={AddTimetable} />
                <Route path="/my-timetable" component={MyTimetable} />
                <Route path="/add-book/:id" component={AddBook} />
                <Route path="/all-books" component={AllBooks} />
                <Route path="/post-mark/:id" component={PostMark} />
                <Route path="/view-mark/:id" component={ViewMark} />
                <Route path="/added-student/:id" component={AddedStudent} />
                <Route path="/new-promotion/:id" component={NewPromotion} />
                <Route path="/new-term/:id" component={NewTerm} />
                <Route
                  path="/promote-student/:id"
                  component={StudentPromotion}
                />
                <Route path="/add-assignment" component={AddAssignment} />
                <Route path="/fees-reporting" component={FeesReporting} />
                <Route path="/print-fees-report" component={PrintFeesReport} />
                <Route path="/discussion/:id" component={Discussion} />
                <Route path="/admin-end-year" component={AdminEndYear} />
                <Route path="/teacher-end-year" component={TeacherEndYear} />
                <Route path="/pre-chat/:id" component={PreChat} />
                <Route
                  path="/chat"
                  render={(props) => (
                    <Chat
                      {...props}
                      onTextChange={this.handleTextChange}
                      onClick={this.handleClick}
                      message={this.state.message}
                      chats={this.state.chats}
                    />
                  )}
                />
                <Route
                  path="/my-assignment/:id"
                  component={StudentAssignment}
                />
                <Route path="/all-assignment/:id" component={AllAssignment} />
                <Route
                  path="/all-exams"
                  render={(props) => <AllExams {...props} user={user} />}
                />
                <Route
                  path="/print"
                  render={(props) => <PrintReceipt user={user} {...props} />}
                />
                <Route
                  path="/add-student/:id"
                  render={(props) => <AddStudent {...props} user={user} />}
                />
                <Route
                  path="/dashboard"
                  render={(props) => <AdminDashboard {...props} user={user} />}
                />
                <Route path="/not-found" component={NotFound} />
                <Redirect to="not-found" />
              </Switch>
            </div>
          </div>
          <Footer />
        </div>
        {/* </Online> */}
        {/* <Offline>
          <h3 style={{ color: "red" }}>
            {" "}
            Please check your internet connection
          </h3>
        </Offline> */}
      </BrowserRouter>
    );
  }

  renderWrapperClass() {
    return this.state.toggle
      ? "wrapper bg-ash sidebar-collapsed-mobile"
      : "wrapper bg-ash";
  }
  expandMenu = () => {
    const { sidebarExpanded } = this.state;
    let iconClass = "nav-item sidebar-nav-item ";
    let menuClass = "nav sub-group-menu ";
    iconClass += sidebarExpanded && "active";
    menuClass += sidebarExpanded && "menu-open";
    return { iconClass, menuClass };
  };
}

export default Dashboard;
