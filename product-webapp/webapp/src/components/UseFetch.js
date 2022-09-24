import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [fetchedData, setFetchedData] = useState({
    data: null,
    isLoading: true,
    error: false,
  });
  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(url);
      const data = await response.data;
      if (data) {
        setFetchedData({
          data,
          isLoading: false,
          error: false,
        });
      }
    } catch (e) {
      setFetchedData({
        data: null,
        isLoading: false,
        error: true,
      });
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [url, fetchData]);

  const { data, isLoading, error } = fetchedData;
  return { data, isLoading, error };
};

export default useFetch;
