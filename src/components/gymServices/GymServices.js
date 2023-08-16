import React, { useState, useEffect } from "react";
import "./gymServices.css";
import axios from "axios";
import GymService from "./GymService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PopService from "../popup/PopService";

const GymServices = () => {
  const [gymServices, setGymServices] = useState([]);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [addService, setaddService] = useState(false);
  const [editService, setEditService] = useState(false);

  const openPopUp = () => {
    setEditService(true);
    setaddService(true);
  };

  const closePopUp = () => {
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

  const onAddService = async () => {
    openPopUp();
    const newService = {
      description: description,
      price: price,
    };
    try {
      await axios.post("http://localhost:4000/service", newService);
      setGymServices([...gymServices, newService]);
    } catch (error) {
      console.log("no se ha creado el cliente", error);
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

  const onEditService = async (_id) => {
    openPopUp();
    try {
      const serviceData = {
        description,
        price,
      };

      await axios.patch(
        `http://localhost:3001/users/upDataService/${_id}`,
        serviceData,
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        }
      );

      toast.success("servicio actualizado!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      console.log("error al actualizar", error);

      toast.error(`error al actualizar`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  useEffect(() => {
    onGetService();
  }, []);

  return (
    <div className="container">
      <button className="addGymService" onClick={onAddService}>
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
              onEditService={onEditService}
              onDeleteService={onDeleteService}
            />
          ))}
        </tbody>
      </table>
      {editService && <PopService onClose={closePopUp} />}
    </div>
  );
};

export default GymServices;
