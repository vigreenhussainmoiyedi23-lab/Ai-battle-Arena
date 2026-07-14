import { Routes, Route } from "react-router-dom";

import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import Chat from "../features/chat/pages/Chat";

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <a href="/chat">Go To CHAT</a>
            <a href="/login">SIGN IN</a>
            <a href="/register">Register</a>
          </>
        }
      />
      <Route path="/chat/:id" element={<Chat />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  );
}
