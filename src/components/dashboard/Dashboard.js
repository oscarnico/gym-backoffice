import React, { useState, useEffect } from "react";
import axios from "axios";
import "./dashboard.css";

const Dashboard = () => {
  const [clientsWithServices, setClientsWithServices] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [totalServicesPrice, setTotalServicesPrice] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/payment");
        setClientsWithServices(response.data);

        const total = response.data.reduce((sum, payment) => sum + payment.serviceId.price, 0);
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

  return (
    <div className="dashboard-container">
      <h2>Clients with Services</h2>
      <ul className="client-list">
        {clientsWithServices.map((client) => (
          <li key={client._id}>
            {client.name} {client.surname}
            <button className="view-services-button" onClick={() => setSelectedClient(client)}>Resumen de Servicios</button>
          </li>
        ))}
      </ul>
      {selectedClient && (
        <div className="client-details">
          <h3>
            Services for {selectedClient.name} {selectedClient.surname}, with DNI {selectedClient.dni}
          </h3>
          <ul className="service-list">
            {selectedClient.services.map((service) => (
              <li key={service._id}>
                {service.description} - {service.price}€
              </li>
            ))}
          </ul>
          <div className="total-price">
            Total: {calculateTotalPriceCustomer(selectedClient.services)}€
          </div>
        </div>
      )}
            <div className="total-price-all-services">
        Total Sum of Services: {totalServicesPrice}€
      </div>
    </div>
  );
};

export default Dashboard;
