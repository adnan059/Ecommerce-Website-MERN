import { useDispatch, useSelector } from "react-redux";
import useHandleApiError from "./useHandleApiError";
import { endLoading, startLoading } from "@/redux/commonSlice";
import axios from "axios";
import { baseUrl } from "@/config/data";

const useDelete = () => {
  const dispatch = useDispatch();
  const handleApiError = useHandleApiError();
  const { token } = useSelector((state) => state.auth);

  const deleteData = async (url) => {
    dispatch(startLoading());
    try {
      const response = await axios.delete(`${baseUrl}/${url}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(endLoading());
      return response;
    } catch (error) {
      handleApiError(error);
      dispatch(endLoading());
    }
  };

  return deleteData;
};

export default useDelete;
