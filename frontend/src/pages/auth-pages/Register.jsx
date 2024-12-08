import CommonForm from "@/components/common-comps/CommonForm";
import { baseUrl, registerFormControls, toastOptions } from "@/config/data";
import { registerAction } from "@/redux/authSlice";
import { endLoading, startLoading } from "@/redux/commonSlice";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

// --------- Register component -------------
const Register = () => {
  const [formData, setFormData] = useState(initialState);
  const { loading } = useSelector((state) => state.common);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // --------- handle registration ------------
  const onSubmit = async (event) => {
    event.preventDefault();
    const { userName, email, password } = formData;
    if ((userName === "" || email === "", password === "")) {
      toast.error("All the fields are required.", toastOptions);
      return;
    }
    dispatch(startLoading());
    try {
      const { data } = await axios.post(`${baseUrl}/auth/register`, formData);

      const { token, ...others } = data;

      dispatch(registerAction({ token, others }));

      dispatch(endLoading());

      toast.success("registration successful", toastOptions);

      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(
        error.response.data.message || "registration failed!",
        toastOptions
      );
      dispatch(endLoading());
    }
  };

  // ------------ return the jsx -----------------
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create new account
        </h1>
        <p className="mt-2">
          Already have an account
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to={"/auth/login"}
          >
            Login
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={registerFormControls}
        buttonTxt={"Sign Up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        isBtnDisabled={loading}
      />
    </div>
  );
};

export default Register;
