import "./App.css";
import Login from "./components/Login/Login";
import MenuLayout from "./components/MenuLayout/MenuLayout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import Customer from "./components/customers/Customer";
import Customers from "./components/customers/Customers";
// import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      {/* <ToastContainer /> */}
      {/* <Customer/> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Login" element={<Login />} />
          <Route
            path="/Customers" element={<MenuLayout> <Customers /> </MenuLayout>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
