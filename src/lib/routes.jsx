import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import { createBrowserRouter } from "react-router-dom";
import Home from "../components/layout";
import CurrentBlog from "../components/layout/CurrentBlog";

export const ROOT = "/";
export const LOGIN = "/login";
export const REGISTER = "/register";

export const router = createBrowserRouter([
  { path: ROOT, element: <Home /> },
  { path: LOGIN, element: <Login /> },
  { path: REGISTER, element: <Register /> },
  { path: "/blogs/:blogId", element: <CurrentBlog /> },
]);
