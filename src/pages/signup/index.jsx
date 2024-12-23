import React, { useState } from "react";
import { Button } from "../../components";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/";
import { Spinner } from "../../constants/images";

const SignupPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState({
    email: "",
    password: "",
  });
  const [errorState, setErrorState] = useState({
    emailError: "",
    passwordError: "",
    servererror: "",
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
    setLoading(true);
    if (!error) {
      try {
        const response = await createUserWithEmailAndPassword(
          auth,
          details.email,
          details.password,
        );
        setLoading(false)
        navigate("/admin/dashboard");
      } catch (error) {
        setLoading(false)
        const errorCode = error.code;
        setErrorState({ ...errorState, servererror: errorCode });
      }
    }
  };
  return (
    <div className="flex h-screen items-center justify-center bg-secondary">
      <div className="flex w-[50%] flex-col gap-y-4 rounded-[6px] border border-[#d5d5d5] bg-primary px-10 py-6">
        <div className="flex justify-center py-2">
          <span className="text-3xl font-medium">Request an admin account</span>
        </div>
        <div className="flex w-full flex-col gap-y-2">
          <label htmlFor="email" className="text-xl font-medium">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={handleForm}
            placeholder="Enter your email"
            className="w-full rounded-[6px] border border-[#d5d5d5] px-4 py-3 focus:outline-none"
          />
          <span className="text-xs text-[#e62e2e]">
            {errorState.emailError}
          </span>
        </div>
        <div className="flex w-full flex-col gap-y-2">
          <label htmlFor="email" className="text-xl font-medium">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleForm}
            placeholder="Enter your password"
            className="w-full rounded-[6px] border border-[#d5d5d5] px-4 py-3 focus:outline-none"
          />
          <span className="text-xs text-[#e62e2e]">
            {errorState.passwordError}
          </span>
        </div>
        <div className="flex w-full flex-col gap-y-2">
          <label htmlFor="email" className="text-xl font-medium">
            Position
          </label>
          <input
            // type="email"
            // name="email"
            // id="email"
            placeholder="Enter your position e.g admin, sales ..."
            className="w-full rounded-[6px] border border-[#d5d5d5] px-4 py-3 focus:outline-none"
          />
        </div>
        {errorState.servererror && (
          <span className="text-sm text-[#e62e2e]">
            {errorState.servererror}
          </span>
        )}
        <Button className="flex justify-center" onClick={handleSubmit}>
          {loading ? (
            <img src={Spinner} className="h-[25px] w-[25px]" />
          ) : (
            "Sign up"
          )}
        </Button>

        <span className="text-center text-sm font-normal text-secondary">
          Already have an admin account?.{" "}
          <Link to="/admin/login" className="text-base font-medium">
            Login as an admin
          </Link>
        </span>
      </div>
    </div>
  );
};

export default SignupPage;
