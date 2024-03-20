/* eslint-disable react-hooks/exhaustive-deps */
import { loginForm } from "../signData";
import { Link } from "react-router-dom";
import * as FaIcon from "react-icons/fa";
import { useState } from "react";
import { useAuth } from "../../../middleware/auth";
import { FieldForm } from "../../../components/form/";
import Preloader from "../../../components/preloader";

export function RememberMe() {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="w-full flex justify-between items-center">
      <div className="flex gap-2 items-center">
        <div
          className={
            agreed
              ? "w-5 h-5 cursor-pointer rounded-sm bg-primary-600 flex items-center justify-center"
              : "w-5 h-5 cursor-pointer bg-white rounded-sm border border-primary-600"
          }
          onClick={() => {
            setAgreed((prev) => !prev);
          }}
        >
          {agreed ? <FaIcon.FaCheck size=".6rem" color="#fff" /> : null}
        </div>
        <div
          className="cursor-pointer select-none"
          onClick={() => {
            setAgreed((prev) => !prev);
          }}
        >
          Remember me
        </div>
      </div>
      <Link to="/forgot-password" className="text-secondary-600">
        Forget password?
      </Link>
    </div>
  );
}

function Login() {
  const [isloading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { signIn } = useAuth();

  const handleSubmit = (data) => {
    setLoading(true);
    signIn(data, setLoading, setErrorMessage);
  };

  return (
    <>
      {isloading && <Preloader />}
      <div>
        <h1 className="text-4xl">Welcome back...</h1>
        <p>Continue from where you stopped</p>
      </div>
      <div className="w-full flex flex-col items-stretch text-xs md:text-sm">
        <FieldForm
          handleSubmit={handleSubmit}
          params={loginForm}
          formFor="Sign in"
          errorMessage={errorMessage}
        >
          <RememberMe />
        </FieldForm>

        {/* Log In Link */}
        <p className="self-center mt-6">
          You don't have an account?{" "}
          <Link to="/signup" className="text-secondary-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </>
  );
}

export default Login;
