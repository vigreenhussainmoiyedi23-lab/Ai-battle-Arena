import { useEffect } from "react";
import AppRoutes from "./app/routes";
import { useAuth } from "./features/auth/hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";
const App = () => {
  const { GetMeHandler } = useAuth();
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
