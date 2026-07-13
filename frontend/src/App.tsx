import { useEffect } from "react";
import AppRoutes from "./app/routes";
import { useAuth } from "./features/auth/hooks/useAuth";

const App = () => {
  const { GetMeHandler } = useAuth();
  useEffect(() => {
    GetMeHandler();
  }, []);

  return <AppRoutes />;
};

export default App;
