import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./MenuLayout.css";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

const MenuLayout = ({ children }) => {
//   const navigate = useNavigate();

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
                <Link className="link" to={"/Customer"}>Customer</Link>
                <Link className="link" to={"/Services"}>Services</Link>
                <Link className="link" to={"/Payments"}>Payments</Link>
                <Link className="link" to={"/lo que sea"}>Lo que sea</Link>
                <Link className="link" to={"/"} onClick={logout}>Logout</Link>
              </div>
            </div>
          </div>
          <main class="col ps-md-2 pt-2">
            <a href="#" data-bs-target="#sidebar" data-bs-toggle="collapse" class="border rounded-3 p-1 text-decoration-none">
                <i class="bi bi-list bi-lg py-2 p-1"></i> Menu </a>
            <div> {children} </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default MenuLayout;
