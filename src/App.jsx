import { useState } from "react";
import "./App.css";
import Login from "./components/Login/Login";
import MenuH from "./components/MenuH/MenuH";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import GeneralLayout from "./components/GeneralLayout/GeneralLoayout";

function App() {
  // const [isLoggedIn, setLoggedIn] = useState(false);

  // const handleLogin = () => {
  //   setLoggedIn( true );
  // }

  return (
    <>

      <Login/>
      {/* <MenuH/>  */}
      {/* <BrowserRouter>
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/HomePage" element={ <GeneralLayout><HomePage /></GeneralLayout>}/>
        </Routes>
        </BrowserRouter> */}
    </>
  );
}

export default App;
