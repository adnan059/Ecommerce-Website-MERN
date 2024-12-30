/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux";

import useHandleApiError from "./useHandleApiError";

import axios from "axios";
import { baseUrl } from "@/config/data";
import { useEffect, useState } from "react";

const useFetch = (url = "") => {
  const handleApiError = useHandleApiError();
  const [data, setData] = useState([]);
  const { token } = useSelector((state) => state.auth);

  const refetchData = async (url = "", query = "") => {
    try {
      const response = await axios(`${baseUrl}/${url}?${query}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response;
    } catch (error) {
      handleApiError(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await refetchData(url);
      setData(response?.data);
    };
    url && fetchData();
  }, [url, token]);

  return { refetchData, data };
};

export default useFetch;
