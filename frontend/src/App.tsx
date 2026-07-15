import { useEffect } from "react";
import AppRoutes from "./app/routes";
import { useAuth } from "./features/auth/hooks/useAuth";
import { ToastContainer } from "react-toastify";
import { useChat } from "./features/chat/hooks/useChat";
const App = () => {
  const { GetMeHandler } = useAuth();
  const { GetChats } = useChat();
  // all the things which i want only once when the app starts
  useEffect(() => {
    GetMeHandler();
    GetChats();
  }, []);

  return (
    <>
      <AppRoutes />
      <ToastContainer />
    </>
  );
};

export default App;
