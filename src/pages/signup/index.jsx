import React, { useState } from "react";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import { data, Link } from "react-router-dom";
import { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

function Signup() {
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const [isLoading, setIsLoading] = useState(false);

  //handling signup click
  const handleSignup = (e) => {
    e.preventDefault();

    setIsLoading(true);

    const nameValue = name.current.value;
    const emailValue = email.current.value;
    const passwordValue = password.current.value;

    // request to server for register new user
    fetch("http://localhost:7000/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nameValue,
        email: emailValue,
        password: passwordValue,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success(data.message);
          name.current.value = "";
          email.current.value = "";
          password.current.value = "";
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="authContainer d-flex flex-column p-4">
      <p className="text-center fs-4 fw-bold">Create you account</p>
      {/* signup form */}
      <form action="">
        <InputField
          ref={name}
          type="text"
          id="name"
          placeholder="Jone Doe"
          label="Name"
        />
        <InputField
          ref={email}
          type="email"
          id="email"
          placeholder="name@example.com"
          label="Email"
        />
        <InputField
          ref={password}
          type="password"
          id="password"
          placeholder="*******"
          label="Password"
        />

        {/* signup btn */}
        <Button
          id="login"
          buttonColor="primary"
          buttonName={isLoading?<ClipLoader size={19}/>:'Sign up'}
          handleClick={handleSignup}
          disabled={isLoading}
        />
        <Button
          id="login"
          buttonColor="outline-secondary"
          buttonName="Continue with Google"
          disabled={isLoading}
        />
      </form>
      <p className="text-center">
        <span>Already a user?</span>
        <Link to="/login" className="text-decoration-none">
          Login
        </Link>
      </p>
      <ToastContainer />
      
    </div>
  );
}

export default Signup;
