import { useSelector } from "react-redux";
import useHandleApiError from "./useHandleApiError";

import axios from "axios";
import { baseUrl } from "@/config/data";

const useDelete = () => {
  const handleApiError = useHandleApiError();
  const { token } = useSelector((state) => state.auth);

  const deleteData = async (url) => {
    try {
      const response = await axios.delete(`${baseUrl}/${url}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response;
    } catch (error) {
      handleApiError(error);
    }
  };

  return deleteData;
};

export default useDelete;
