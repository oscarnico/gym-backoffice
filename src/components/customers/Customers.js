import React from 'react';
import axios from "axios";

import Table from 'react-bootstrap/Table';
import "./customers.css";

function Customers() {

  const mapCustomers = async (event) => {
    const res = await axios.get(
      "http://localhost:4000/customer"
    );
    console.log(res)
  }

  return (
    <button onClick={mapCustomers}>Hola</button>
  );
}

export default Customers;