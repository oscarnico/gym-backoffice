import React, { useState, useEffect } from "react";
import axios from "axios";
import "./autocompleteCustomer.css";

const AutocompleteCustomer = ({ onSelectCustomer }) => {
  const [inputValue, setInputValue] = useState("");
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("http://localhost:4000/customer");
        setCustomers(response.data);
      } catch (error) {
        console.error("Error fetching customers", error);
      }
    };

    fetchCustomers();
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    const filtered = customers.filter((customer) =>
      `${customer.name} ${customer.surname}`
        .toLowerCase()
        .includes(value.toLowerCase())
    );
    setFilteredCustomers(filtered);
    setShowSuggestions(true);
  };

  const handleSelect = (customer) => {
    setInputValue(`${customer.name} ${customer.surname} - ${customer.dni}`);
    setShowSuggestions(false);
    onSelectCustomer(customer);
  };

  return (
    <div className="divAutoComplete">
      <input
        className="searchInput"
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Search for a customer..."
      />
      {showSuggestions && (
        <ul className="ul-filter">
          {filteredCustomers.map((customer) => (
            <li
              className="list"
              key={customer._id}
              onClick={() => handleSelect(customer)}
            >
              {customer.name} {customer.surname} - {customer.dni}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutocompleteCustomer;
