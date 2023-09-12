import React, { useState, useEffect } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import axios from "axios";

const Dashboard = () => {
  const [serviceCounts, setServiceCounts] = useState([]);

  const getServiceCounts = async () => {
    try {
      const resp = await axios.get(
        "http://localhost:4000/payment/totalServices",
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Respuesta de conteos de servicios:", resp.data);
      setServiceCounts(resp.data);
    } catch (error) {
      console.log("Error al obtener los conteos de servicios", error);
    }
  };

  useEffect(() => {
    getServiceCounts();
  }, []);

  return (
    <>
      {serviceCounts.length && (
        <BarChart
          colors={["Blue"]}
          xAxis={[
            {
              id: "barCategories",
              data: serviceCounts.map((service) => service.description),
              scaleType: "band",
            },
          ]}
          series={[
            {
              data: serviceCounts.map((service) => service.total),
            },
          ]}
          width={1100}
          height={300}
        />
      )}
    </>
  );
};
export default Dashboard;
