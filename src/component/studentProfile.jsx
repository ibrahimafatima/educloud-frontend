import React, { Component } from "react";
import upload from "../images/upload.png";
import { getStudent, updateProfilePicture } from "../services/studentService";
import auth from "../services/authService";
import { getCurrentUser } from "../services/authService";
import { toast } from "react-toastify";
import Spinner from "./reusableComponent/spinner";


class StudentProfile extends Component {
  state = {
    data: {},
    picture: false,
    src: false,
    loading: false,
    values: [
      { title: "Username", path: "username" },
      { title: "Reg. number", path: "registrationID" },
      { title: "Class", path: "className" },
      { title: "Term", path: "term" },
      { title: "Father name", path: "fatherName" },
      { title: "Mother name", path: "motherName" },
      { title: "Gender", path: "gender" },
      { title: "Date of Birth", path: "dob" },
      { title: "Email", path: "email" },
      { title: "Phone", path: "phone" },
      { title: "Address", path: "address" }
    ]
  };

  feeDetail = { title: "School Fee Paid", path: "feePaid" };

  constructor() {
    super();
    if (!auth.getCurrentUser().isStudent) {
      this.state.values.push(this.feeDetail);
    }
  }

  async componentDidMount() {
    try {
      const { data } = await getStudent(this.props.match.params.id);
      this.setState({ data });
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
    const { data, values, src, loading } = this.state;
    console.log(data);
    return (
      loading ? <Spinner /> :
      <React.Fragment>
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
                  src={data.gender === "Female" ? student : student1}
                  alt="teacher"
                ></img> */}

                <div className="column">
                <div className="row">
   <div className="small-12 medium-2 large-2 columns">
     <div className="circle">
       { src ? <img className="profile-pic" src={src} alt=""/> : 
         <img className="profile-pic" src={data.profileURL} alt=""/> }
     </div>
     { getCurrentUser().isStudent && <div className="p-image">
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
                  <h3 className="text-dark-medium font-medium">{data.username}</h3>
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

export default StudentProfile;
