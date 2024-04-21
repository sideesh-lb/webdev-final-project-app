import React, { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { UNSAFE_DataRouterStateContext, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/user-reducer";

const NavigationComponent = () => {
  const [expanded, setExpanded] = useState(false);
  const { user, loggedIn, allUsers, loading } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { pathname } = useLocation();
  const paths = pathname.split("/");
  const active = paths[1];

  const dropdownToggle = () => {
    setExpanded((e) => !e);
  };

  const handleLogout = () => {
    setExpanded(false);
    dispatch(logout());
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <div className="bg-dark text-white p-3 row">
        <div className="col-md-3 ">
          <Link to="/" style={{ textDecoration: "none" }}>
            <h3 className="wd-logo">NEUStockTrade</h3>
          </Link>
        </div>
        <div className="col-md-7"></div>
        <div className="col-md-1 pt-1">
          {/* <input
            type="text"
            class="rounded-pill w-100 h-100 bg-light border-0 ps-3"
            placeholder="Search for companies"
          /> */}
          <Link
            to={"/search"}
            className="fs-5 mt-2 text-decoration-none text-light"
          >
            <i className="bi bi-search me-2 text-light"></i>
            Search
          </Link>
        </div>
        <div className="col-md-1">
          <a onClick={dropdownToggle}>
            <span className="bg-light rounded-pill pt-2 pb-2 ps-2 pe-1">
              <i class="bi bi-person-fill text-dark fs-4"></i>{" "}
            </span>

            {!expanded && <i class="bi bi-caret-down-fill text-white ms-2"></i>}
            {expanded && <i class="bi bi-caret-up-fill text-white ms-2"></i>}
          </a>
        </div>
      </div>
      {expanded && (
        <div className="row bg-light">
          <ul
            className="list-group col-md-2 col-sm-12 position-absolute end-0 shadow"
            style={{ zIndex: "1" }}
          >
            {!loggedIn && (
              <>
                <Link
                  to="/sign-up"
                  onClick={dropdownToggle}
                  className={`list-group-item ${
                    active === "sign-up" ? "active" : ""
                  }`}
                >
                  SignUp
                </Link>
                <Link
                  to="/sign-in"
                  onClick={dropdownToggle}
                  className={`list-group-item ${
                    active === "sign-in" ? "active" : ""
                  }`}
                >
                  Login
                </Link>
              </>
            )}
            {loggedIn && user.role === "ADMIN" && (
              <>
                <Link
                  to="/profileadmin"
                  onClick={dropdownToggle}
                  className={`list-group-item ${
                    active === "profileadmin" ? "active" : ""
                  }`}
                >
                  Dashboard
                </Link>

                <div
                  style={{ cursor: "pointer" }}
                  className="list-group-item"
                  onClick={handleLogout}
                >
                  Logout
                </div>
              </>
            )}
            {loggedIn && user.role === "INDUSTRY" && (
              <>
                <Link
                  to="/profilecompany"
                  onClick={dropdownToggle}
                  className={`list-group-item ${
                    active === "profilecompany" ? "active" : ""
                  }`}
                >
                  Dashboard
                </Link>

                <div
                  style={{ cursor: "pointer" }}
                  className="list-group-item"
                  onClick={handleLogout}
                >
                  Logout
                </div>
              </>
            )}
            {loggedIn && user.role === "TRADER" && (
              <>
                <Link
                  to="/profile"
                  onClick={dropdownToggle}
                  className={`list-group-item ${
                    active === "profilecompany" ? "active" : ""
                  }`}
                >
                  Dashboard
                </Link>

                <div
                  style={{ cursor: "pointer" }}
                  className="list-group-item"
                  onClick={handleLogout}
                >
                  Logout
                </div>
              </>
            )}
          </ul>
        </div>
      )}
    </>
  );
};

export default NavigationComponent;
