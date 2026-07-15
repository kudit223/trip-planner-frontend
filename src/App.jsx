import { Routes, Route, data } from "react-router-dom";
import "./App.css";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Dashboard from "./pages/dashboard";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetch("http://localhost:7000/user/me", { credentials: "include" })
      .then((res) => res.json())
      .then((data) =>{
        if(data.success){
          setIsLoggedIn(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="mainContainer d-flex justify-content-center align-items-center">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
