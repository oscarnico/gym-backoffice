import React, { useState, useEffect } from "react";
import "./payments.css";
import AutocompleteCustomer from "../autoComplete/AutocompleteCustomer";
import axios from "axios";
import { toast } from "react-toastify";

const Payments = () => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("http://localhost:4000/service", {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        });
        setServices(response.data);
      } catch (error) {
        console.error("Error fetching services", error);
      }
    };

    fetchServices();
  }, []);

  const handleServiceChange = (e) => {
    setSelectedService(e.target.value);
  };

  const handleSubmit = async () => {
    if (selectedCustomer && selectedService) {
      try {
        const response = await axios.post(
          "http://localhost:4000/payment",
          {
            customerId: selectedCustomer._id,
            serviceId: selectedService,
          },
          {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem("token")}`,
            },
          },
        );

        if (response.status === 200) {
          toast.success("Operation completed, sending invoice!");

          setTimeout(() => {
            window.location.reload();
          }, 4500);
        } else {
          toast.error("operation incompleted!!");
        }
      } catch (error) {
        toast.success("Operación realizada");
        console.error("Error al asignar servicio", error);
      }
    }
  };

  return (
    <div className="divPayments">
      <h1 className="title1">Assign Service to Customer</h1>
      <AutocompleteCustomer onSelectCustomer={setSelectedCustomer} />
      {selectedCustomer && (
        <>
          <h2 className="title2">
            Selected Customer: {selectedCustomer.name}{" "}
            {selectedCustomer.surname}, DNI- {selectedCustomer.dni}
          </h2>
          <select
            className="combo"
            value={selectedService}
            onChange={handleServiceChange}
          >
            <option value="" disabled>
              Select a service
            </option>
            {services.map((service) => (
              <option key={service._id} value={service._id}>
                {service.description} &rarr; {service.price}€
              </option>
            ))}
          </select>
          <button className="btnAsing" onClick={handleSubmit}>
            Assign Service <i className="fa-solid fa-money-check-dollar"></i>{" "}
          </button>
        </>
      )}
    </div>
  );
};

export default Payments;
