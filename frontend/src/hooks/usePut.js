import { useSelector } from "react-redux";
import useHandleApiError from "./useHandleApiError";
import axios from "axios";
import { baseUrl } from "@/config/data";

const usePut = () => {
  const { token } = useSelector((state) => state.auth);
  const handleApiError = useHandleApiError();

  const updateData = async (url, data) => {
    try {
      const response = await axios.put(`${baseUrl}/${url}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response;
    } catch (error) {
      handleApiError(error);
    }
  };

  return { updateData };
};

export default usePut;
