import { endLoading, startLoading } from "@/redux/commonSlice";
import { useDispatch, useSelector } from "react-redux";
import useHandleApiError from "./useHandleApiError";
import axios from "axios";
import { baseUrl } from "@/config/data";

const usePut = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.common);
  const { token } = useSelector((state) => state.auth);
  const handleApiError = useHandleApiError();

  const updateData = async (url, id, data) => {
    dispatch(startLoading());
    try {
      const response = await axios.put(`${baseUrl}/${url}/${id}`, data, {
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

  return { loading, updateData };
};

export default usePut;
