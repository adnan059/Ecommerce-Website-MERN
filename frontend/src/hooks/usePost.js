import useHandleApiError from "./useHandleApiError";
import { useDispatch, useSelector } from "react-redux";
import { endLoading, startLoading } from "@/redux/commonSlice";
import axios from "axios";
import { baseUrl } from "@/config/data";

const usePost = () => {
  const handleApiError = useHandleApiError();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.common);
  const { token } = useSelector((state) => state.auth);

  const postData = async (url, data) => {
    dispatch(startLoading());
    try {
      const response = await axios.post(`${baseUrl}/${url}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(endLoading());

      // console.log(response);
      return response;
    } catch (error) {
      handleApiError(error);
      dispatch(endLoading());
    }
  };

  return { postData, loading };
};

export default usePost;
