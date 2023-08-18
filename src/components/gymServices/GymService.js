import React from 'react';
import "./gymService.css";

const GymService = ({ service = {}, onEditService, onDeleteService }) => {
  if (!service || !service.description || !service.price) {
    return null;
  }
    
  return (
        <tr className="Service">
      <td>{service.description}</td>
      <td>{service.price}€</td>
      <td>
        <button className="Service-button edit" onClick={() => onEditService(service._id)}><i className="fa-solid fa-user-pen"></i></button>
        <button className="Service-button delete" onClick={() => onDeleteService(service._id)}><i className="fa-solid fa-trash-can"></i></button>
      </td>
    </tr>
  )
}

export default GymService