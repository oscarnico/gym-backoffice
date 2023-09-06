import React, { useState, useEffect } from "react";
import axios from "axios";
import "./customerAndService.css";
import { toast } from "react-toastify";

const CustomerAndService = () => {
  const [clientsWithServices, setClientsWithServices] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/payment", {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      });
      setClientsWithServices(response.data);
      console.log("esto es el payment.service");
      console.log(response.data.serviceId);
    } catch (error) {
      console.error("Error al traer clientes con servicios", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const calculateTotalPriceCustomer = (services) => {
    return services.reduce((sum, service) => sum + service.price, 0);
  };

  const deleteService = async (paymentId) => {
    console.log(`esto es la id : ${paymentId}`);
    try {
      const response = await axios.delete(
        `http://localhost:4000/payment/dele/${paymentId}`,
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Service removed successfully!");
        fetchData();
      } else {
        toast.error("Error removing service!");
      }
    } catch (error) {
      console.error("Error deleting service", error);
    }
  };
  console.log("clients rerender", clientsWithServices);

  const selectedClientToRender = clientsWithServices.find(
    ({ _id }) => _id === selectedClient
  );
  return (
    <div className="dashboard-container">
      <h2>Customers with Services</h2>
      <ul className="client-list">
        {clientsWithServices.map((client) => (
          <li key={client._id}>
            {client.name} {client.surname}
            <button
              className="view-services-button"
              onClick={() => setSelectedClient(client._id)}
            >
              Summary of Services
            </button>
          </li>
        ))}
      </ul>
      {selectedClientToRender && (
        <div className="client-details">
          <h3>
            Services for {selectedClientToRender.name}{" "}
            {selectedClientToRender.surname}, with DNI{" "}
            {selectedClientToRender.dni}
          </h3>
          <ul className="service-list">
            {selectedClientToRender.services.map((service) => (
              <li key={service._id}>
                {service.description} - {service.price}€
                <button
                  className="deleDetail"
                  onClick={() => deleteService(service.paymentId)}
                >
                  <i className="fa-solid fa-trash-can"></i>{" "}
                </button>
              </li>
            ))}
          </ul>
          <div className="total-price">
            Total:{" "}
            {calculateTotalPriceCustomer(selectedClientToRender.services)}€
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerAndService;
