import { useState } from "react";
import "./App.css";
import Login from "./components/Login/Login";
import MenuH from "./components/MenuH/MenuH";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import GeneralLayout from "./components/GeneralLayout/GeneralLoayout";
import Customer from "./components/customers/Customer";

function App() {
  // const [isLoggedIn, setLoggedIn] = useState(false);

  // const handleLogin = () => {
  //   setLoggedIn( true );
  // }

  return (
    <>
    <Customer/>
     {/* <MenuH/> */}
      {/* <BrowserRouter>
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Customers" element={ <GeneralLayout><Customers /></GeneralLayout>}/>
        </Routes>
        </BrowserRouter> */}
    </>
  );
}

export default App;
