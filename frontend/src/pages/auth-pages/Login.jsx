import CommonForm from "@/components/common-comps/CommonForm";
import { baseUrl, loginFormControls, toastOptions } from "@/config/data";
import { loginAction } from "@/redux/authSlice";
import { endLoading, startLoading } from "@/redux/commonSlice";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const initialState = {
  email: "",
  password: "",
};

// -------- Login component --------
const Login = () => {
  const [formData, setFormData] = useState(initialState);
  const { loading } = useSelector((state) => state.common);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ------ handle the login -------
  const onSubmit = async (event) => {
    event.preventDefault();
    if ((formData.email === "", formData.password === "")) {
      toast.error("all the fields are required", toastOptions);
      return;
    }
    dispatch(startLoading());
    try {
      const { data } = await axios.post(`${baseUrl}/auth/login`, formData);
      const { token, ...others } = data;
      dispatch(loginAction({ token, others }));

      toast.success("login successful", toastOptions);
      dispatch(endLoading());
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message || "login failed", toastOptions);
      dispatch(endLoading());
    }
  };

  // -------- return the jsx -------
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign in to your account
        </h1>
        <p className="mt-2">
          Do not have an account
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to={"/auth/register"}
          >
            Register
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={loginFormControls}
        buttonTxt={"Sign In"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        isBtnDisabled={loading}
      />
    </div>
  );
};

export default Login;
