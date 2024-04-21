import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, email, password, role, confirmpassword, error);
    if (password !== confirmpassword) {
      alert("Passwords don't match");
    } else {
      fetch("http://localhost:4000/sign-up", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          role,
          lname: "none",
          fname: "none",
          gender: "none",
          dob: "none",
          phonenumber: "none",
          address: "none",
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "userRegister");
          if (data.message === "Success") {
            // window.localStorage.setItem("token", data.data);
            navigate("/sign-in");
          } else {
            alert("USER ALREADY EXISTS USE DIFFERENT EMAIL ID");
            window.location.href = "./sign-up";
          }
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <section className="h-100 bg-light">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col">
              <div className="card card-registration my-4">
                <div className="row g-0">
                  <div className="col-xl-6 d-none d-xl-block">
                    <img
                      src="../images/how-to-save-money.jpg"
                      alt="howtosave"
                      class="img-fluid h-100"
                      style={{
                        borderTopLeftRadius: ".25rem",
                        borderBottomLeftRadius: ".25rem;",
                      }}
                    />
                  </div>

                  <div className="col-xl-6">
                    <div className="card-body p-4 text-black">
                      <h3 className="mb-3 text-uppercase">Sign Up</h3>

                      <div class="form-outline">
                        <label>Username (Symbol for Industry):</label>
                        <input
                          required="yes"
                          type="text"
                          className="form-control mb-4"
                          placeholder="Username"
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </div>

                      <div className="form-outline">
                        <label>Email address:</label>
                        <input
                          required="yes"
                          type="email"
                          className="form-control"
                          placeholder="example@domain.com"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>

                      <div className="d-md-flex justify-content-start align-items-center mb-2 mt-2 py-2">
                        <label className="mb-0 me-4">Role: </label>
                        <div className="form-check form-check-inline mb-0 me-4">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="role"
                            id="trader"
                            value="TRADER"
                            checked={role === "TRADER"}
                            onChange={(e) => setRole(e.target.value)}
                          />
                          <label class="form-check-label" for="trader">
                            StockTrader
                          </label>
                        </div>

                        <div className="form-check form-check-inline mb-0 me-4">
                          <input
                            required
                            className="form-check-input"
                            type="radio"
                            name="role"
                            id="admin"
                            value="ADMIN"
                            checked={role === "ADMIN"}
                            onChange={(e) => setRole(e.target.value)}
                          />
                          <label class="form-check-label" for="admin">
                            Admin
                          </label>
                        </div>

                        <div className="form-check form-check-inline mb-0">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="role"
                            id="industry"
                            value="INDUSTRY"
                            checked={role === "INDUSTRY"}
                            onChange={(e) => setRole(e.target.value)}
                          />
                          <label class="form-check-label" for="Industry">
                            Industry
                          </label>
                        </div>
                      </div>

                      <div className="form-outline">
                        <label>Password:</label>
                        <input
                          type="password"
                          className="form-control mb-4"
                          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                          required="yes"
                          placeholder="*****************"
                          title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>

                      <div className="form-outline">
                        <label className="form-label" for="confirmpassword">
                          Confirm Password:
                        </label>
                        <input
                          type="password"
                          id="confirmpassword"
                          class="form-control"
                          placeholder="*****************"
                          onChange={(e) => setConfirmpassword(e.target.value)}
                          required="yes"
                        />
                      </div>

                      <div className="d-flex justify-content-end pt-3">
                        <div className="d-grid">
                          <button
                            type="submit"
                            className="btn btn-info btn-md ms-2"
                          >
                            Sign Up
                          </button>
                        </div>
                      </div>

                      <div>
                        {" "}
                        <p class="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                          Already have an account?{" "}
                          <Link to="/sign-in" style={{ color: "#393f81" }}>
                            Login here
                          </Link>
                        </p>{" "}
                      </div>

                      {error && (
                        <div
                          style={{
                            width: "370",
                            padding: "15px",
                            margin: "5px 0",
                            fontSize: "14px",
                            backgroundColor: "#f34646",
                            color: "white",
                            borderRadius: "5px",
                            textAlign: "center",
                          }}
                        >
                          {error}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </form>
  );
};
export default SignUp;

