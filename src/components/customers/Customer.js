import React from 'react';
import "./Customer.css";

function Customer({ customer, onEdit, onDelete, onAddService}) {
  
  return (
    <tr className="Customer">
      <td>32423</td>
      <td>Pedro</td>
      <td>Rodriguez</td>
      <td>34242Q</td>
      <td>perdrro@gmail.com</td>
      <td>
        <button className="Customer-button edit" onClick={() => onEdit(customer.id)}>Edit</button>
        <button className="Customer-button delete" onClick={() => onDelete(customer.id)}>Delete</button>
      </td>
    </tr>
  );
}

export default Customer;
