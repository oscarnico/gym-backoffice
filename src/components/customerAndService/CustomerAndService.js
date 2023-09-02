import React, { useState, useEffect } from "react";
import axios from "axios";
import "./customerAndService.css";
import { toast } from "react-toastify";

const CustomerAndService = () => {
  const [clientsWithServices, setClientsWithServices] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [totalServicesPrice, setTotalServicesPrice] = useState(0);

  useEffect(() => {
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

        const total = response.data.reduce(
          (sum, payment) => sum + payment.serviceId.price,
          0
        );
        setTotalServicesPrice(total);
      } catch (error) {
        console.error("Error al traer clientes con servicios", error);
      }
    };

    fetchData();
  }, []);

  const calculateTotalPriceCustomer = (services) => {
    return services.reduce((sum, service) => sum + service.price, 0);
  };

  const deleteService = async (serviceId) => {
    console.log(`esto es la id : ${serviceId}`);
    try {
      const response = await axios.delete(
        `http://localhost:4000/payment/${serviceId}`,
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Service removed successfully!");
        // Actualizar la lista de servicios en el estado (o volver a buscar los datos)
        setSelectedClient((prevClient) => {
          return {
            ...prevClient,
            services: prevClient.services.filter(
              (service) => service._id !== serviceId
            ),
          };
        });
      } else {
        toast.error("Error removing service!");
      }
    } catch (error) {
      console.error("Error deleting service", error);
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Customers with Services</h2>
      <ul className="client-list">
        {clientsWithServices.map((client) => (
          <li key={client._id}>
            {client.name} {client.surname}
            <button
              className="view-services-button"
              onClick={() => setSelectedClient(client)}
            >
              Summary of Services
            </button>
          </li>
        ))}
      </ul>
      {selectedClient && (
        <div className="client-details">
          <h3>
            Services for {selectedClient.name} {selectedClient.surname}, with
            DNI {selectedClient.dni}
          </h3>
          <ul className="service-list">
            {selectedClient.services.map((service) => (
              <li key={service._id}>
                {service.description} - {service.price}€
                <button
                  className="deleDetail"
                  onClick={() => deleteService(service._id)}
                >
                  <i className="fa-solid fa-trash-can"></i>{" "}
                </button>
              </li>
            ))}
          </ul>
          <div className="total-price">
            Total: {calculateTotalPriceCustomer(selectedClient.services)}€
          </div>
        </div>
      )}
      {/* <div className="total-price-all-services">
        Total Sum of Services: {totalServicesPrice}€
      </div> */}
    </div>
  );
};

export default CustomerAndService;
