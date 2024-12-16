/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";

import useHandleApiError from "./useHandleApiError";
import { endLoading, startLoading } from "@/redux/commonSlice";
import axios from "axios";
import { baseUrl } from "@/config/data";
import { useEffect, useState } from "react";

const useFetch = (url = "") => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.common);
  const handleApiError = useHandleApiError();
  const [data, setData] = useState([]);
  const { token } = useSelector((state) => state.auth);

  const refetchData = async (url = "", query) => {
    dispatch(startLoading());
    try {
      const response = await axios(`${baseUrl}/${url}?${query}`, {
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
      const response = await refetchData(url);
      setData(response?.data);
    };
    url && fetchData();
  }, [url, token]);

  return { refetchData, data, loading };
};

export default useFetch;
