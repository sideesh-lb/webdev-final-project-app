import React, { Component } from "react";

const axios = require('axios');

const handleProfile=()=>{
  window.location="/userdetails";
}


const handleLogout = () => {
  localStorage.removeItem("token");
  alert("logout successful");
  window.location="/sign-in";

};
export default class EditProfile extends Component {
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

  UpdateProfileHandler=(e)=>{
    e.preventDefault();
    //create object of form data
    const formData=new FormData();  
    formData.append("user_id",this.state.user_id);

    //update-profile
    axios.post("http://localhost:4000/userapi/update-profile/",formData,{
        headers: {
            "content-type": "application/json"
          }
    }).then(res=>{
        console.log(res);
       this.setState({msg:res.data.message});
       
    })
    .catch(err=>console.log(err))
}


componentDidMount1(){
 this.fetchUserDetails(this.state.user_id);
}

  render() {
    return (
      <div>

<div className="form-outline">
          <label>First Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Last name"
            defaultValue={this.state.userData.fname}
            onChange={(e) => this.setState({ fname: e.target.value })}
          />
        </div>
         
        <div className="form-outline">
        
        <label>Email address</label>
        <input
          required="yes"
          type="email"
          className="form-control"
          placeholder="Enter email"
          defaultvalue={this.state.userData.email}
          onChange={(e) => this.setState({ email: e.target.value })}
          
        />
      </div>

        <div className="form-outline">
          <label>Last name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Last name"
            defaultValue={this.state.userData.lname}
            onChange={(e) => this.setState({ lname: e.target.value })}
          />
        </div>

        <div className="form-outline">
          <label className="form-label" for="address">Address</label>
            <input type="text" id="address" className="form-control form-control-lg" defaultValue={this.state.userData.address} onChange={(e) => this.setState({ address: e.target.value })} />
             
              </div>
              
       
    
<div className="form-outline">
<label class="form-label" for="dob">DOB</label>
<input type="date" id="dob" class="form-control form-control-lg" required="yes"  defaultvalue={this.state.userData.dob}  onChange={(e) => this.setState({ dob: e.target.value })} />
</div>




<div className="form-outline">

<label className="form-label" for="number">Phone Number</label>
<input type="tel" id="number" placeholder="012-345-6789" class="form-control form-control-lg" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required="yes"  defaultvalue={this.state.userData.phonenumber}  onChange={(e) => this.setState({ phonenumber: e.target.value })} />

</div>


<button  onClick={handleLogout}>
					Logout
				</button>
        <button onClick={handleProfile}>
          Profile
        </button>
       
      </div>
    );
  }
}



        
          
    
      

        

       
          
            
                
   

 


                             
                                      
                                
                                
                                

        


		

		

 