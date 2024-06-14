import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { LOGIN, ROOT } from "../lib/routes";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// This code is for fatching User data
export function useAuth() {
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const res = await axios.get(`${API_URL}/auth/`, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      setUser(res.data);
      setLoading(false);
    }
    fetchData();
  }, []);

  return { user, isLoading };
}

// This code is for Login functionlity
export function useLogin() {
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  async function login({ email, password, redirectTo = ROOT }) {
    setLoading(true);

    try {
      const res = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });
      if (res.status !== 200) {
        throw new Error(res.data.message);
      }
      localStorage.setItem("token", res.data.token);
      toast({
        title: "You are logged in",
        status: "success",
        isClosable: true,
        position: "top",
        duration: 5000,
      });
      navigate(redirectTo);
    } catch (error) {
      toast({
        title: "Logging in failed",
        description: error.message,
        status: "error",
        isClosable: true,
        position: "top",
        duration: 5000,
      });
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  return { login, isLoading };
}

// This code is for logout functionlity
export function useLogout() {
  const toast = useToast();
  const navigate = useNavigate();

  async function logout() {
    localStorage.removeItem("token");
    toast({
      title: "Successfully logged out",
      status: "success",
      isClosable: true,
      position: "top",
      duration: 5000,
    });
    navigate(LOGIN);
  }

  return { logout };
}

// This code is for user register functionlity
export function useRegister() {
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  async function register({
    username,
    email,
    password,
    redirectTo = DASHBOARD,
  }) {
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/auth/register`, {
        username,
        email,
        password,
      });

      if (res.status === 201) {
        localStorage.setItem("token", res.data.token);
        toast({
          title: "Account created",
          description: "You are logged in",
          status: "success",
          isClosable: true,
          position: "top",
          duration: 5000,
        });

        navigate(redirectTo);
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      toast({
        title: "Signing Up failed",
        description: error.message,
        status: "error",
        isClosable: true,
        position: "top",
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  }

  return { register, isLoading };
}
