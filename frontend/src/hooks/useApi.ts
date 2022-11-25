import { Api } from "../utils/api";
import { useState, useEffect } from "react";


const token = localStorage.getItem('@App:token')
export const useApi =  (
  url: string,
  dependece?: any
) => {
  const [data, setData] = useState<object[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const options = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  useEffect(() => {
        Api.get(url, options)
          .then((response) => {
            setData(response.data);
          })
          .catch((err) => {
            setError(err.response.data);
          })
          .finally(() => {
            setLoading(false);
          });
    
  }, [dependece]);

  return { data, loading, error };
};
