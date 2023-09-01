import React from "react";
import "./Customer.css";

const Customer = ({ customer = {}, onEditCustomer, onDeleteCustomer }) => {
  if (
    !customer ||
    !customer.name ||
    !customer.surname ||
    !customer.dni ||
    !customer.email ||
    !customer._id
  ) {
    return null;
  }

  return (
    <tr className="Customer">
      <td>{customer.name}</td>
      <td>{customer.surname}</td>
      <td>{customer.dni}</td>
      <td>{customer.email}</td>
      <td>
        <button
          className="Customer-button edit"
          onClick={() => onEditCustomer(customer._id)}
        >
          <i className="fa-solid fa-user-pen"></i>
        </button>
        <button
          className="Customer-button delete"
          onClick={() => onDeleteCustomer(customer._id)}
        >
          <i className="fa-solid fa-trash-can"></i>
        </button>
      </td>
    </tr>
  );
};

export default Customer;
