import React, { useState, useEffect } from "react";
import axios from "axios";
import "./customers.css";
import Customer from "./Customer";
import PopCustomer from "../popup/PopCustomer";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [actualKey, setActualKey] = useState("");
  const [editCustomer, setEditCustomer] = useState(false);
  const [addCustomer, setAddCustomer] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState(null);

  const openPopUpEdit = (key) => {
    const customerToEdit = customers.find((customer) => customer._id === key);
    setCurrentCustomer(customerToEdit);
    setEditCustomer(true);
    setActualKey(key);
  };

  const openPopUpAdd = () => {
    setAddCustomer(true);
  };

  const onclosePopUp = async (newCustomer) => {
    if (addCustomer) {
      try {
        await axios.post(
          "http://localhost:4000/customer", newCustomer,
          {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem("token")}`,
            },
          },

        );
        // setCustomers([...customers, newCustomer]);
        onGetCustomers();
      } catch (error) {
        console.log("no se ha creado el cliente", error);
      }
    } else if (editCustomer) {
      try {
        await axios.patch(
          `http://localhost:4000/customer/${actualKey}`,
          newCustomer,
          {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem("token")}`,
            },
          }
        );
        const customerIndex = customers.findIndex(
          (customer) => customer._id === actualKey
        );
        const updatedCustomers = [...customers];
        updatedCustomers[customerIndex] = { _id: actualKey, ...newCustomer };
        setCustomers(updatedCustomers);
      } catch (error) {
        console.error("error al actualizar", error);
      }
    }
    onCloseWithoutChange();
  };

  const onCloseWithoutChange = () => {
    setEditCustomer(false);
    setAddCustomer(false);
    setCurrentCustomer(null);
  };

  const onGetCustomers = async () => {
    console.log("entra")
    try {
      const resp = await axios.get("http://localhost:4000/customer", {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      });
      console.log("Data recibida:", resp.data);
      setCustomers(resp.data);
    } catch (error) {
      console.log("no trae los clientes", error);
    }
  };

  const onDeleteCustomer = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/customer/${id}`, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      });
      console.log(`cliente eliminado con id: ${id}`);
      setCustomers(customers.filter((customer) => customer._id !== id));
    } catch (error) {
      console.error(`Error al eliminar el cliente con id: ${id}`, error);
    }
  };

  useEffect(() => {
    onGetCustomers();
  }, []);

  return (
    <div className="container">
      <button className="addCustomer" onClick={openPopUpAdd}>
        <i className="fa-solid fa-user-plus"></i>
      </button>
      <table className="customerTable">
        <thead>
          <tr>
            <th>Name</th>
            <th>Surname</th>
            <th>DNI</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <Customer
              key={customer._id}
              customer={customer}
              onEditCustomer={() => openPopUpEdit(customer._id)}
              onDeleteCustomer={onDeleteCustomer}
            />
          ))}
        </tbody>
      </table>
      {(addCustomer || editCustomer) && (
        <PopCustomer
          currentData={currentCustomer}
          onClose={onclosePopUp}
          onCloseWithoutChange={onCloseWithoutChange}
        />
      )}
    </div>
  );
};

export default Customers;
