import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Login,
  Home,
  EditPost,
  AddPost,
  AllPosts,
  Post,
  Signup,
} from "./pages/index.js";

import { Header, Footer } from "./components";

import { AuthLayout } from "./components/index.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: (
          <>
            <Header />
            <Home />
            <Footer />
          </>
        ),
      },
      {
        path: "/login",
        element: (
          <AuthLayout
            authentication={false}
            chidhren={
              <>
                <Login />
              </>
            }
          />
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout
            authentication={false}
            chidhren={
              <>
                <Signup />
              </>
            }
          />
        ),
      },
      {
        path: "/edit-post/:slug",
        element: (
          <AuthLayout
            authentication={true}
            chidhren={
              <>
                <Header />
                <EditPost />
                <Footer />
              </>
            }
          />
        ),
      },
      {
        path: "/add-post",
        element: (
          <AuthLayout
            authentication={true}
            chidhren={
              <>
                <Header />
                <AddPost />
                <Footer />
              </>
            }
          />
        ),
      },
      {
        path: "/all-posts",
        element: (
          <AuthLayout
            chidhren={
              <>
                <Header />
                <AllPosts />
                <Footer />
              </>
            }
          />
        ),
      },
      {
        path: "/post/:slug",
        element: (
          <AuthLayout
            chidhren={
              <>
                <Header />
                <Post />
                <Footer />
              </>
            }
          />
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </StrictMode>
);
