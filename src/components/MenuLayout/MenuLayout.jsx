import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./MenuLayout.css";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.css";
// import { useNavigate } from "react-router-dom";

const MenuLayout = ({ children }) => {
  const [adminEmail, setAdminEmail] = useState("");
  //   const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem("adminEmail");
    if (savedEmail) {
      setAdminEmail(savedEmail);
    }
  }, []);

  const logout = async () => {
    window.localStorage.removeItem("token");
    // navigate("/");
  };
  return (
    <>
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <div className="col-auto px-0">
            <div
              id="sidebar"
              className="collapse collapse-horizontal show border-end"
            >
              <div
                id="sidebar-nav"
                className="list-group custom-border border-0 rounded-0 text-sm-start min-vh-100"
              >
                <div className="headerMenu">
                  <i className="fa-solid fa-user-tie headerIcon"></i>
                </div>
                <p className="userEmail">Admin: {adminEmail}</p>
                <hr className="my-1" />
                {/* <div className="link-wrapper">
                  <i className="fa-solid fa-user" />
                  <Link className="link" to={"/Customers"}>
                    Customers
                  </Link>
                </div>
                <div className="link-wrapper">
                  <i className="fa-solid fa-dumbbell" />
                  <Link className="link" to={"/GymServices"}>
                    GymServices
                  </Link>
                </div>
                <div className="link-wrapper">
                <i className="fa-solid fa-money-check-dollar"></i>
                  <Link className="link" to={"/Payments"}>
                    Payments
                  </Link>
                </div>
                <div className="link-wrapper">
                <i className="fa-solid fa-right-from-bracket"></i>
                  <Link className="link" to={"/"} onClick={logout}>
                    Logout
                  </Link>
                </div> */}
                <Link className="link" to={"/Customers"}>
                  <i className="fa-solid fa-user" /> Customers
                </Link>
                <Link className="link" to={"/GymServices"}>
                  <i className="fa-solid fa-dumbbell"></i> GymServices
                </Link>
                <Link className="link" to={"/Payments"}>
                  <i className="fa-solid fa-money-check-dollar"></i> Payments
                </Link>
                <Link className="link" to={"/"} onClick={logout}>
                  <i className="fa-solid fa-right-from-bracket"></i>Logout
                </Link>
              </div>
            </div>
          </div>
          <main className="col ps-md-2 pt-2">
            <Link
              href="#"
              data-bs-target="#sidebar"
              data-bs-toggle="collapse"
              className="border rounded-3 p-1 text-decoration-none"
            >
              <i className="fa-solid fa-bars"></i>{" "}
            </Link>
            <div> {children} </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default MenuLayout;
