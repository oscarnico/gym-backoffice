import React, { useState, useEffect } from "react";
import "./gymServices.css";
import axios from "axios";
import GymService from "./GymService";
import PopService from "../popup/PopService";

const GymServices = () => {
  const [gymServices, setGymServices] = useState([]);
  const [actualKey, setActualKey] = useState("");
  const [addService, setaddService] = useState(false);
  const [editService, setEditService] = useState(false);

  const openPopUpEdit = (key) => {
    setEditService(true);
    setActualKey(key);
  };

  const openPopUpAdd = () => {
    setaddService(true);
  };

  const closePopUp = async (newService) => {
    if (addService) {
      try {
        await axios.post("http://localhost:4000/service", newService);
        setGymServices([...gymServices, newService]);
      } catch (error) {
        console.log("no se ha creado el cliente", error);
      }
    } else if (editService) {
      try {
        await axios.patch(
          `http://localhost:4000/service/${actualKey}`,
          newService,
          {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem("token")}`,
            },
          },
          {}
        );
        const serviceIndex = gymServices.findIndex(
          (service) => service._id === actualKey
        );
        const updatedServices = [...gymServices];
        updatedServices[serviceIndex] = { _id: actualKey, ...newService };
        setGymServices(updatedServices);
      } catch (error) {
        console.error("error al actualizar", error);
      }
    }
    onCloseWithoutChange();
  };

  const onCloseWithoutChange = () => {
    setEditService(false);
    setaddService(false);
  };

  const onGetService = async () => {
    try {
      const resp = await axios.get("http://localhost:4000/service");
      setGymServices(resp.data);
    } catch (error) {
      console.log("no trae los clientes", error);
    }
  };


  const onDeleteService = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/service/${id}`);
      console.log(`servicio eliminado con id: ${id}`);
      setGymServices(gymServices.filter((service) => service._id !== id));
    } catch (error) {
      console.log(`error al eliminar el servicio con id: ${id}`, error);
    }
  };

  useEffect(() => {
    onGetService();
  }, []);

  return (
    <div className="container">
      <button className="addGymService" onClick={openPopUpAdd}>
        <i className="fa-solid fa-plus"></i>
      </button>
      <table className="servicesTable">
        <thead>
          <tr>
            <th>Service</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {gymServices.map((service) => (
            <GymService
              key={service._id}
              service={service}
              onEditService={() => openPopUpEdit(service._id)}
              onDeleteService={onDeleteService}
            />
          ))}
        </tbody>
      </table>
      {(addService || editService) && (
        <PopService
          onClose={closePopUp}
          onCloseWithoutChange={onCloseWithoutChange}
        />
      )}
    </div>
  );
};

export default GymServices;
