import React, { useState } from "react";
import { Button } from "../../components";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { Spinner } from "../../constants/images";

const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState({
    email: "",
    password: "",
  });
  const [errorState, setErrorState] = useState({
    emailError: "",
    passwordError: "",
  });
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  const validate = () => {
    let isError = false;
    const errors = {
      emailError: "",
      passwordError: "",
    };

    if (!details.email) {
      isError = true;
      errors.emailError = "Please enter your email address";
    }
    if (details.email && !emailRegex.test(details.email)) {
      isError = true;
      errors.emailError = "Please enter a valid email address";
    }
    if (!details.password) {
      isError = true;
      errors.passwordError = "Please enter your password";
    }

    setErrorState({ ...errorState, ...errors });
    return isError;
  };
  const handleForm = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validate();
    if (!error) {
      setLoading(true);

      try {
        const response = await signInWithEmailAndPassword(
          auth,
          details.email,
          details.password,
        );
        localStorage.setItem("user", JSON.stringify(response.user));
        setLoading(false);
        navigate("/admin/dashboard");
      } catch (error) {
        setLoading(false);
        const errorCode = error.code;
        setErrorState({
          ...errorState,
          servererror: errorCode,
          emailError: "",
          passwordError: "",
        });
      }
    }
  };
  return (
    <div className="flex h-screen items-center justify-center bg-secondary">
      <div className="flex w-[50%] flex-col gap-y-4 rounded-[6px] border border-[#d5d5d5] bg-primary px-10 py-6">
        <div className="flex justify-center py-2">
          <span className="text-3xl font-medium">
            Login with email and password
          </span>
        </div>
        <div className="flex w-full flex-col gap-y-2">
          <label htmlFor="email" className="text-xl font-medium">
            Email
          </label>
          <input
            onChange={handleForm}
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            className="w-full rounded-[6px] border border-[#d5d5d5] px-4 py-3 focus:outline-none"
          />
          <span className="text-sm text-[#e62e2e]">
            {errorState.emailError}
          </span>
        </div>
        <div className="flex w-full flex-col gap-y-2">
          <label htmlFor="password" className="text-xl font-medium">
            Password
          </label>
          <input
            onChange={handleForm}
            type="password"
            name="password"
            id="password"
            placeholder="Enter your Password"
            className="w-full rounded-[6px] border border-[#d5d5d5] px-4 py-3 focus:outline-none"
          />
          <span className="text-sm text-[#e62e2e]">
            {errorState.passwordError}
          </span>
        </div>
        {errorState.servererror && (
          <span className="text-sm text-[#e62e2e]">
            {errorState.servererror}
          </span>
        )}
        <Button onClick={handleSubmit} className="flex justify-center">
          {loading ? (
            <img src={Spinner} className="h-[25px] w-[25px]" />
          ) : (
            "Login"
          )}
        </Button>

        <span className="text-center text-sm font-normal text-secondary">
          Don't have an account?.{" "}
          <Link to="/admin/signup" className="text-base font-medium">
            Sign up as an admin to get admin privleges
          </Link>
        </span>
      </div>
    </div>
  );
};

export default LoginPage;
