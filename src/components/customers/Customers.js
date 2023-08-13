import React, { useState, useEffect } from "react";
import axios from "axios";
import "./customers.css";
import Customer from "./Customer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [name, setName] = useState("");
  const [surName, setSurNaname] = useState("");
  const [dni, setDni] = useState("");
  const [email, setEmail] = useState("");

  const onGetCustomers = async () => {
    try {
      const resp = await axios.get("http://localhost:4000/customer");
      console.log("Data recibida:", resp.data);
      setCustomers(resp.data);
    } catch (error) {
      console.log("no trae los clientes", error);
    }
  };

  const onAddCustomer = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const newCustomer = {
      name: data.get("name"),
      surName: data.get("surName"),
      dni: data.get("dni"),
      email: data.get("email"),
    };

    try {
      await axios.post("http://localhost:4000/customer", newCustomer);
      setCustomers([...customers, newCustomer]);
    } catch (error) {
      console.log("no se ha creado el cliente", error);
    }
  };

  const onDeleteCustomer = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/customer/${id}`);
      console.log(`cliente eliminado con id: ${id}`);
      setCustomers(customers.filter((customer) => customer._id !== id));
    } catch (error) {
      console.error(`Error al eliminar el cliente con id: ${id}`, error);
    }
  };

  const onEditCustomer = async (_id) => {
    try {
      const customerData = {
        name,
        surName,
        dni,
        email,
      };

      await axios.patch(
        `http://localhost:3001/users/upDateUser/${_id}`,
        customerData,
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        }
      );

      toast.success("cliente actualizado!", {
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
      console.error("error al actualizar", error);

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
    onGetCustomers();
  }, []);

  return (
    <div className="container">
      <button className="addCustomer">
        {" "}
        <i className="fa-solid fa-user-plus"></i>{" "}
      </button>
      <table className="customerTable">
        <thead>
          <tr>
            <th>Name</th>
            <th>SurName</th>
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
              onEditCustomer={onEditCustomer}
              onDeleteCustomer={onDeleteCustomer}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Customers;
