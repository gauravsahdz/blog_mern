import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const BlogsContext = createContext(null);

export function BlogsProvider({ children }) {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    setLoading(true);
    const res = await axios.get(`${API_URL}/blogs`);
    if (res.data.status === 200) {
      setBlogs(res.data.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <BlogsContext.Provider value={{ blogs, isLoading, fetchBlogs }}>
      {children}
    </BlogsContext.Provider>
  );
}

export function useBlogs() {
  return useContext(BlogsContext);
}

export function useAddBlog() {
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();
  const { fetchBlogs } = useBlogs();

  async function addBlog(blog) {
    setLoading(true);
    const headers = {
      Authorization: `${localStorage.getItem("token")}`,
    };
    const res = await axios.post(`${API_URL}/blogs`, blog, { headers });
    if (res.status === 201) {
      toast({
        title: "Blog added successfully!",
        status: "success",
        isClosable: true,
        position: "top",
        duration: 5000,
      });
      fetchBlogs();
    }
    setLoading(false);
  }

  return { addBlog, isLoading };
}

export function useUpdateBlog() {
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();
  const { fetchBlogs } = useBlogs();

  async function updateBlog(id, blog) {
    setLoading(true);
    const headers = {
      Authorization: `${localStorage.getItem("token")}`,
    };
    const res = await axios.patch(`${API_URL}/blogs/${id}`, blog, { headers });
    if (res.status === 200) {
      toast({
        title: "Blog updated successfully!",
        status: "success",
        isClosable: true,
        position: "top",
        duration: 5000,
      });
      fetchBlogs();
    }
    setLoading(false);
  }

  return { updateBlog, isLoading };
}

export function useDeleteBlog(id) {
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();
  const { fetchBlogs } = useBlogs();

  async function deleteBlog() {
    const res = window.confirm("Are you sure you want to delete this post?");

    if (res) {
      setLoading(true);

      const headers = {
        Authorization: `${localStorage.getItem("token")}`,
      };
      const res = await axios.delete(`${API_URL}/blogs/${id}`, { headers });
      if (res.status === 200) {
        toast({
          title: "Post deleted!",
          status: "info",
          isClosable: true,
          position: "top",
          duration: 5000,
        });
        fetchBlogs();
      }
      setLoading(false);
    }
  }

  return { deleteBlog, isLoading };
}
