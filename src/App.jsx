import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./store/slices/authSlice.js";
import { authServices } from "./appwrite/auth.js";
import { Container } from "./components";
import { Outlet } from "react-router-dom";
function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  // const selector = useSelector()

  useEffect(() => {
    authServices
      .currentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      })
      .catch((err) => {
        console.log("error in getting current User");
        return err;
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      {loading ? (
        <h1 className="text-gray-600">Loading....</h1>
      ) : (
        <Container>
          <Outlet/>
        </Container>
      )}
    </>
  );
}

export default App;
