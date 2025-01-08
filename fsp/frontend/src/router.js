import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import App from "./App";
import Auth from "./pages/Auth";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            index: true,
            element: <App />,
          },
        ],
      },
      {
        path: "/signin",
        element: <Auth />,
      },
      {
        path: "/signup",
        element: <Auth />,
      },
    ],
  },
]);
