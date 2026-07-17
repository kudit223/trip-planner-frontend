import React from "react";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import { Link , useNavigate} from "react-router-dom";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

function Login({setIsLoggedIn}) {
  const email = useRef(null);
  const password = useRef(null);
  const navigate = useNavigate();

  const [isLoading,setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const emailValue = email.current.value;
    const passwordValue = password.current.value;

    fetch("http://localhost:7000/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },credentials:'include',
      body: JSON.stringify({
        email: emailValue,
        password: passwordValue,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if(data.success){
            toast.success(data.message);
            setIsLoggedIn(true);
            navigate('/dashboard');
        }else{
            toast.error(data.message)
        }
      })
      .catch((error) => {
        console.log(error);
      }).finally(()=>{
        setIsLoading(false);
      });
  };

  return (
    <div className="authContainer d-flex flex-column p-4">
      <p className="text-center fs-4 fw-bold">Log in to your trip rooms</p>
      <form>
        <InputField
          type="text"
          id="email"
          label="Email"
          placeholder="name@example.com"
          ref={email}
        />
        <InputField
          type="password"
          id="password"
          label="Password"
          placeholder="*******"
          ref={password}
        />
        <Button
          id="login"
          buttonColor="primary"
          buttonName={isLoading?<ClipLoader size={19}/>:'Log in'}
          handleClick={handleLogin}
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
        <span>New here?</span>
        <Link to="/signup" className="text-decoration-none">
          Sign up
        </Link>
      </p>
    </div>
  );
}

export default Login;
