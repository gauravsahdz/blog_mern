import axios from "axios";
import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;
export function useUser(id) {
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const headers = {
        Authorization: `${localStorage.getItem("token")}`,
      };
      const res = await axios.get(`${API_URL}/auth`, { headers });
      setUser(res.data);
      setLoading(false);
    }
    fetchData();
  }, []);

  return { user, isLoading };
}
