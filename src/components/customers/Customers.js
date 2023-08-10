import React, { useState } from "react";
import axios from "axios";
import "./customers.css";
import Customer from "./Customer";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [name, setName] = useState("");
  const [surName, setSurNaname] = useState("");
  const [dni, setDni] = useState("");
  const [email, setEmail] = useState("");

  const onGetCustomers = async () => {
    try {
      const resp = await axios.get("http://localhost:4000/customer");
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

  const onDelete = async (id) => {
    await axios.delete(`http://localhost:4000/customer/${id}`);
    console.log(`cliente eliminado con id: ${id}`);
  };


  const onEditCustomer = async () => {
    try {
        const customerData = {
            name,
            surName,
            dni,
            email
        };

        await axios.patch('http://localhost:3001/users/updateUser', customerData, {
            headers: {
                'Authorization': `Bearer ${window.localStorage.getItem('token')}`
            }
        });

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




  // const mapCustomers = async (event) => {
  //   const res = await axios.get("http://localhost:4000/customer");
  //   console.log(res);
  // };

  return (
    <div className="container">
    <button className="addCustomer">Add Customer</button>
    <table className="customerTable">
        <thead>
            <tr>
                <th>Name</th>
                <th>SurName</th>
                <th>DNI</th>
                <th>Email</th>
            </tr>
        </thead>
        <tbody>
            {/* Customers will go here */}
        </tbody>
    </table>
</div>
  )
};

export default Customers;
