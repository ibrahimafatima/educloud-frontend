import React, { Component } from "react";
import upload from "../images/upload.png";
import { getTeacher } from "../services/adminService";
import { getCourse, updateProfilePicture } from "../services/teacherService";
import { toast } from "react-toastify";
import Spinner from "./reusableComponent/spinner";
import { getCurrentUser } from "../services/authService"

class TeacherDetails extends Component {
  state = {
    data: {},
    subjects: [],
    picture: false,
    src: false,
    loading: false,
    values: [
      { title: "Username", path: "username" },
      { title: "First name", path: "firstName" },
      { title: "Last name", path: "lastName" },
      { title: "Gender", path: "gender" },
      { title: "Date of Birth", path: "dob" },
      { title: "Teacher ID", path: "registrationID" },
      { title: "Email", path: "email" },
      { title: "Phone", path: "phone" },
      { title: "Address", path: "address" },
      { title: "Subject", path: "numberOfSubject" }
    ]
  };

  async componentDidMount() {
    try {
      const { data } = await getTeacher(this.props.match.params.id);
      const { data: subjects } = await getCourse(data.registrationID);
      this.setState({ data, subjects });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        return this.props.history.replace("/not-found");
    }
  }

  handlePictureSelect = (e) => {
    var picture = e.target.files[0]
    var src = URL.createObjectURL(picture)
    this.setState({ picture, src })
  }

  handleUpload = async () => {
    try {
      this.setState({ loading: true })
      const formData = new FormData()
    formData.append('file', this.state.picture, `${this.state.data.username}.png`)
    await updateProfilePicture(formData)
    toast.success("Profile picture successfully updated...");
    this.setState({ loading: false })
    } catch (ex) {
      if (ex.response && ex.response.status === 400)
      toast(ex.response.data);
      this.setState({ loading: false})
    }
  }

  render() {
    const { data, values, subjects, src, loading } = this.state;
    return (
      loading ? <Spinner /> :
      <React.Fragment>
        <div></div>

        <div className="card height-auto">
          <div className="card-body">
            <div className="heading-layout1">
              <div className="item-title">
                <h3>About {data.username}</h3>
              </div>
            </div>
            <div className="single-info-details">
              <div className="item-img" style={{marginRight: "200px"}}>
                {/* <img
                  src={data.gender === "Female" ? teacher : teacher1}
                  alt="teacher"
                ></img> */}

<div className="column">
                <div className="row">
   <div className="small-12 medium-2 large-2 columns">
     <div className="circle">
       { src ? <img className="profile-pic" src={src} alt=""/> : 
         <img className="profile-pic" src={data.profileURL} alt=""/> }
     </div>
     { getCurrentUser().isTeacher && <div className="p-image">
       <label htmlFor="image">
         <img src={upload} alt="" width="40px" height="40px" />
         </label>
        <input type="file" id="image" onChange = {this.handlePictureSelect} hidden />
     </div>}
  </div>
</div>
<div className="upload-btn">
          <button className="btn btn-primary"
          onClick={this.handleUpload}
           style={{visibility: src ? "visible":"hidden"}}>
            Update Profile
          </button>
        </div>
                </div>

              </div>
              <div className="item-content">
                <div className="header-inline item-header">
                  <h3 className="text-dark-medium font-medium">
                    {data.username}
                  </h3>
                </div>
                <div className="info-table table-responsive">
                  <table className="table text-nowrap">
                    <tbody>
                      {values.map(value => (
                        <tr key={value.title}>
                          <td>{value.title} :</td>
                          <td
                            className="font-medium text-dark-medium"
                            style={{
                              color:
                                data[value.path] !== "Not Specified"
                                  ? "blue"
                                  : "red"
                            }}
                          >
                            {data[value.path]}
                          </td>
                        </tr>
                      ))}
                      <tr>
                        <td>All subjects:</td>
                        {subjects.length === 0 ? (
                          <td className="font-medium text-dark-medium">
                            None (For now)
                          </td>
                        ) : (
                          subjects.map(subject => (
                            <td
                              key={subject._id}
                              className="font-medium text-dark-medium"
                            >
                              {subject.name}
                            </td>
                          ))
                        )}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default TeacherDetails;
