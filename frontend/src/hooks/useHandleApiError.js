import { toastOptions } from "@/config/data";
import { logoutAction } from "@/redux/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const useHandleApiError = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleApiError = (error) => {
    const errMsg = error?.response?.data?.message || "something went wrong";
    if (errMsg === "invalid token") {
      dispatch(logoutAction());
      toast.error("session expired. please log in", toastOptions);
      navigate("/auth/login");
    } else {
      toast.error(errMsg);
    }
  };
  return handleApiError;
};

export default useHandleApiError;
