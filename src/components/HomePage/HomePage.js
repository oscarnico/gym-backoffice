import React from "react";
import "./homePage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="animation">
      <div className="container2">
        <div className="page-header pt-3">
          <h1 className="h1home">
            OSCAR'S GYM <i className="fa-solid fa-dumbbell"></i>{" "}
          </h1>
        </div>
        <p>Welcome to my individual master's project.</p>
        <hr />
        <ul>
          <li>
            This app is a backoffice for managing the clients and services of a
            gym where you can add, edit, and delete, as well as assign services
            to clients.
          </li>
          <li>
            The application consists of this homepage where you can access the
            login to go to the menu page. There you will already find customers
            and services created to streamline your experience, although I
            encourage you to try to create something!
          </li>
          <li>
            This web application is specifically designed to provide users with
            a seamless experience. We trust you'll find great value in managing
            the gym's clients and services.
          </li>
        </ul>
        <div className="bigDivButton">
          <div className="divButton">
            <Button
              style={{ width: "150px" }}
              variant="primary"
              size="lg"
              onClick={() => navigate("/Login")}
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
