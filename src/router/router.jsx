import { createBrowserRouter, redirect } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Watchlist from "../pages/Watchlist";
import AddWatchlist from "../pages/AddWatchlist";
import AddTask from "../pages/AddTask";
import Layout from "../layout/Layout";
import Tasklist from "../pages/Tasklist";

import TaskDetail from "../pages/TaskDetail";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    loader: () => {
      if (localStorage.access_token) {
        return localStorage.access_token
      }

      return null
    },
    children: [
      {
        path: "/",
        element: <Home/>,
      }
    ],
  },
  {
    element: <Layout />,
    loader: () => {
      if (localStorage.access_token) {
        return localStorage.access_token
      }
      return redirect("/login");
    },
    children: [
      {
        path: "/watchlist",
        element: <Watchlist />,
      },
      {
        path: "/addwatchlist",
        element: <AddWatchlist />,
      },
      {
        path: "/addtask",
        element: <AddTask />,
      },
      {
        path: "/tasklist",
        element: <Tasklist />,
      },

      {
        path: "/task/:id",
        element: <TaskDetail />,
      },

    ],
  },
  {
    path: "/login",
    element: <Login />,
    loader: () => {
      console.log(location);
      if (!localStorage.access_token) {
        return null;
      }
      return redirect("/");
    },
  },
  {
    path: "/register",
    element: <Register />,
    loader: () => {
      if (!localStorage.access_token) {
        return null;
      }
      return redirect("/");
    },
  },
]);

export default router;
