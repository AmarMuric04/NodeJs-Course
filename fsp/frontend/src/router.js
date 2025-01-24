import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import App from "./App";
import Auth from "./pages/Auth";
import Layout from "./components/Layout";
import CreatePost from "./pages/CreatePost";
import ProtectedRoute from "./components/ProtectedRoute";
import Feed from "./pages/Feed";
import { Profile } from "./pages/Profile";
import AllReviews from "./pages/AllReviews";

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
          {
            path: "/create-post",
            element: (
              <ProtectedRoute>
                <CreatePost />
              </ProtectedRoute>
            ),
          },
          {
            path: "/feed",
            element: <Feed />,
          },
          {
            path: "/profile/:slug",
            element: <Profile />,
          },
          {
            path: "/reviews",
            element: <AllReviews />,
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
