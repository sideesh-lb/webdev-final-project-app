import { React, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findAllStocksLikedByUserThunk} from "../../services/likes/like-thunk"
import Form from "react-bootstrap/Form";



const ProfileComponentCompany = () => {
  const { user, loggedIn , allUsers, loading } = useSelector((state) => state.user);
  const{likes}=useSelector((state) => state.likes);
 
 
const dispatch=useDispatch()
  useEffect(() => {
    console.log("in useffect")
    dispatch(findAllStocksLikedByUserThunk(user._id));

  }, []);

  return (
    <section className="bg-light">
      {console.log("liked stocks",likes.likedStocks.length)}
    <div className="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div className="col col-xl-10">
          <div className="card" style={{ borderRadius: "1rem" }}>
            <div class="row g-0">
              <div class="col-md-6 col-lg-5 d-none d-md-block">
                <img
                  src="../images/comp.jpeg"
                  alt="login form"
                  className="img-fluid h-100"
                  style={{ borderRadius: "1rem 0 0 1rem" }}
                />
              </div>
              <div class="col-md-6 col-lg-7 d-flex align-items-center">
                <div class="card-body p-4 p-lg-5 text-black">
                  <Form>
                    <h3 className="mb-3 text-uppercase">COMPANY STASTICS</h3>

                    <div className="form-outline mb-4">
                    <Form.Group className="mb-3" controlId="users">
                      <Form.Label>COMPANY NAME</Form.Label>
                         <Form.Control
                         value={user.username}
                         type="text"
                      
                         />
                        <Form.Text className="text-muted"></Form.Text>
                        </Form.Group>
                    </div>


                    <div className="form-outline mb-4">
                    <Form.Group className="mb-3" controlId="stocks">
                      <Form.Label>STOCKS LIKED</Form.Label>
                         <Form.Control
                         value={likes.likedStocks.length}
                         type="text"
                         //  disabled={isDisabled}
                         // onChange={addressChangeHandler}
                         />
                        <Form.Text className="text-muted"></Form.Text>
                        </Form.Group>
                    </div>

                  
                    
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
};

export default ProfileComponentCompany;