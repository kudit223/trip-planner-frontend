import { useEffect, useState } from "react";
import { Routes, Route, data } from "react-router-dom";
import "./App.css";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Dashboard from "./pages/dashboard";
import { ClipLoader } from "react-spinners";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import ChatRoom from "./pages/chat-room";
import { io } from "socket.io-client";
import { createContext } from "react";

export const socketContext = createContext();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  let socket;

  //socket.io connection
  if (isLoggedIn) {
    socket = io("http://localhost:7000", { withCredentials: true });
  }

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
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <socketContext.Provider value={socket}>
      <div className="mainContainer d-flex justify-content-center align-items-center">
        <ToastContainer />
        <Routes>
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn} isLoading={isLoading}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chat-room"
            element={
              <ProtectedRoute isLoading={isLoading} isLoggedIn={isLoggedIn}>
                <ChatRoom />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </socketContext.Provider>
  );
}

export default App;
