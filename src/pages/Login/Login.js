import React, { useState } from "react";
import { login } from "./../../services/user-service";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Form from "react-bootstrap/Form";
import { setLoggedInUser } from "./../../reducers/user-reducer";
import {
  getAllBookMarksThunk
} from "../../services/bookmark-thunks";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    login(email, password).then((res) => {
      if (res.message === "Logged In") {
        console.log(res.userDetail)
        dispatch(setLoggedInUser(res.userDetail));
        dispatch(getAllBookMarksThunk(email))
        navigate("/");
      } else {
        alert("Invalid credentials! Please enter valid credentials!");
      }
    });
  };

  return (
    <section className="bg-light">
      <div className="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div class="row g-0">
                <div class="col-md-6 col-lg-5 d-none d-md-block">
                  <img
                    src="../images/coin.jpg"
                    alt="login form"
                    className="img-fluid h-100"
                    style={{ borderRadius: "1rem 0 0 1rem" }}
                  />
                </div>
                <div class="col-md-6 col-lg-7 d-flex align-items-center">
                  <div class="card-body p-4 p-lg-5 text-black">
                    <Form onSubmit={handleSubmit}>
                      <h3 className="mb-3 text-uppercase">Sign In</h3>

                      <div className="form-outline mb-4">
                        <label className="form-label">Email address:</label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Enter email"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <label className="form-label">Password:</label>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Enter password"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>

                      <div className="pt-1 mb-4">
                        <button
                          className="btn btn-info btn-block"
                          type="submit"
                        >
                          Sign In
                        </button>
                      </div>
                      <p class="mb-5" style={{ color: "#393f81" }}>
                        New to NEUStockTrade?
                        <Link to="/sign-up"> Sign Up</Link>
                      </p>
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
export default Login;
