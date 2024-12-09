import { useDispatch, useSelector } from "react-redux";

import useHandleApiError from "./useHandleApiError";
import { endLoading, startLoading } from "@/redux/commonSlice";
import axios from "axios";
import { baseUrl } from "@/config/data";
import { useEffect, useState } from "react";

const useFetch = (url) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.common);
  const handleApiError = useHandleApiError();
  const [data, setData] = useState([]);
  const { token } = useSelector((state) => state.auth);

  const refetchData = async () => {
    dispatch(startLoading());
    try {
      const response = await axios(`${baseUrl}${url}`, {
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

  useEffect(() => {
    const fetchData = async () => {
      const response = await refetchData();
      setData(response?.data);
    };
    fetchData();
  }, [url, token]);

  return { refetchData, data, loading };
};

export default useFetch;
