import { useEffect } from "react";
import AppRoutes from "./app/routes";
import { useAuth } from "./features/auth/hooks/useAuth";
import { ToastContainer } from "react-toastify";
const App = () => {
  const { GetMeHandler } = useAuth();
  // all the things which i want only once when the app starts
  useEffect(() => {
    GetMeHandler();
  }, []);

  return (
    <>
      <AppRoutes />
      <ToastContainer />
    </>
  );
};

export default App;
