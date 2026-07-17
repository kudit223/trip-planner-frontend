import { useEffect, useState } from "react";
import { Routes, Route, data } from "react-router-dom";
import "./App.css";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Dashboard from "./pages/dashboard";
import { ClipLoader } from "react-spinners";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading,setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:7000/user/me", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setIsLoggedIn(true);
        }
      })
      .catch((error) => {
        console.log(error);
      }).finally(()=>{
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="mainContainer d-flex justify-content-center align-items-center">
      <ToastContainer/>
      <Routes>
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn} isLoading={isLoading}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
