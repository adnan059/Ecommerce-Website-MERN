import useHandleApiError from "./useHandleApiError";
import { useSelector } from "react-redux";

import axios from "axios";
import { baseUrl } from "@/config/data";

const usePost = () => {
  const handleApiError = useHandleApiError();

  const { token } = useSelector((state) => state.auth);

  const postData = async (url, data) => {
    try {
      const response = await axios.post(`${baseUrl}/${url}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // console.log(response);
      return response;
    } catch (error) {
      handleApiError(error);
    }
  };

  return { postData };
};

export default usePost;
