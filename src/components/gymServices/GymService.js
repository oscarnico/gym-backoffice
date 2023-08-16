import React from 'react';
import "./gymService.css";
import PopService from '../popup/PopService';

const GymService = ({ service = {}, closePopUp, onEditService, addService, onDeleteService, onAddService }) => {
    
  return (
        <tr className="Service">
      <td>{service.description}</td>
      <td>{service.price}€</td>
      <td>
        <button className="Service-button edit" onClick={() => onEditService(service._id)}><i className="fa-solid fa-user-pen"></i></button>
        <button className="Service-button delete" onClick={() => onDeleteService(service._id)}><i class="fa-solid fa-trash-can"></i></button>
      </td>
      {addService && <PopService onClose={closePopUp} />}
    </tr>
  )
}

export default GymService