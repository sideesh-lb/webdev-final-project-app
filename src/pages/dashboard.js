import React, { Component } from "react";


const handleEditProfile=()=>{
  window.location="/editProfile";
}


const handleLogout = () => {
  localStorage.removeItem("token");
  alert("logout successful");
  window.location="/sign-in";

};
export default class UserDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: "",
    };
  }
  
  componentDidMount() {
    fetch("http://localhost:4000/userData", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        this.setState({ userData: data.data });
      });
  }
  render() {
    return (
      <div>
        Name<h1>{this.state.userData.fname}</h1>
        Email <h1>{this.state.userData.email}</h1>
        dob <h1>{this.state.userData.dob}</h1>
        gender<h1>{this.state.userData.gender}</h1>
        password<h1>{this.state.userData.password}</h1>
        address<h1>{ this.state.userData.address}</h1>
        <button  onClick={handleLogout}>
					Logout
				</button>
        <button onClick={handleEditProfile}>
          EditProfile
        </button>
       
      </div>
    );
  }
}