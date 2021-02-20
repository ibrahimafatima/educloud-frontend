import React, { Component } from 'react';
import { getAdminDetails, updateProfilePicture } from "../services/adminService"
import { getCurrentUser } from "../services/authService"
import upload from "../images/upload.png";
import { toast } from "react-toastify";
import Spinner from "./reusableComponent/spinner";

class AdminProfile extends Component {
    state = { 
        data: {},
        picture: false,
        src: false,
        loading: false,
     }

    async componentDidMount() {
        try {
          const { data } = await getAdminDetails(this.props.match.params.id);
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
        const {data, src, loading} = this.state
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
     { getCurrentUser().isAdmin && <div className="p-image">
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
                      <tr>
                        <td>School Name:</td>
                        <td className="font-medium text-dark-medium">
                            {data.schoolName}
                          </td>
                      </tr>
                      <tr>
                        <td>Gender:</td>
                        <td className="font-medium text-dark-medium">
                            {data.gender}
                          </td>
                      </tr>
                      <tr>
                        <td>Currency:</td>
                        <td className="font-medium text-dark-medium">
                            {data.currency}
                          </td>
                      </tr>
                      <tr>
                        <td>Country:</td>
                        <td className="font-medium text-dark-medium">
                            {data.country}
                          </td>
                      </tr>
                    </tbody>
                  </table>
                  <br/>
              {data.pack === "Free" ? <h4 className="pack">You are using the free Pack of Edukloud</h4>
              : <h4 className="pack">You are using the upgraded pack of Edukloud</h4>
              }
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
    }
}
 
export default AdminProfile;