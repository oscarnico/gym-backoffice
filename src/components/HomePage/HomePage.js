import React from "react";
import "./homePage.css";
import Login from "../Login/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Button } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";

const HomePage = () => {
  // const navigate = useNavigate();

  return (
    <div className="animation">
      <div class="page-header pt-3">
        <h1 className="h1home">OSCAR'S DEVELOPERS GYM</h1>
      </div>
      <p class="lead">Welcome to my individual master's project.</p>
      <hr />
      <div class="row">
        <div class="col-12">
          <p>
            In this virtual gym, you can add users as well as modify or delete
            them, just like with the services, making business management easy.
          </p>
          <p>
            The application consists of this homepage where you can access the
            login to go to the menu page. There you will already find users and
            services created to streamline your experience, although I encourage
            you to try to create something!
          </p>
          <p>
            hhagjajgkjshgkhjkgjka ajhjgkhjkha jahlkjhgjkf jkahgajkhgkjahg kjhgh
            jaghjkakgh hajkhgkjahkjh jkhgkjahkh jkhgjf kjhakgj alh.
          </p>
        </div>
      </div>
      <div className="bigDivButton">
        <div className="divButton">
          <Button
            style={{ width: "150px" }}
            variant="primary"
            size="lg"
            onClick={() => Navigate(<Login />)}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
