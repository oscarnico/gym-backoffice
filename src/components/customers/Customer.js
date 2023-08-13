import React from 'react';
import "./Customer.css";

function Customer({ customer = {}, onEditCustomer, onDeleteCustomer, onAddService}) {
  console.log(customer); 
  if (!customer) {
    return <tr><td colSpan="6">Información del cliente no disponible</td></tr>;
  }
  
  return (
    <tr className="Customer">
      {/* <td>{customer._id}</td> */}
      <td>{customer.name}</td>
      <td>{customer.surname}</td>
      <td>{customer.dni}</td>
      <td>{customer.email}</td>
      <td>
        <button className="Customer-button edit" onClick={() => onEditCustomer(customer._id)}><i className="fa-solid fa-user-pen"></i></button>
        <button className="Customer-button delete" onClick={() => onDeleteCustomer(customer._id)}><i class="fa-solid fa-trash-can"></i></button>
      </td>
    </tr>
  );
}

export default Customer;
