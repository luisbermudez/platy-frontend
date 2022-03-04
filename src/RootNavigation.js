import { Routes, Route } from "react-router-dom";
import { SignupForm, LoginForm } from "./pages";
import { Logout } from "./components";

function RootNavigation() {
  return (
    <Routes>
      <Route path="/" element={<h2>Home</h2>} />
      <Route path="/signup" element={<SignupForm />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/logout" element={<Logout />} />
    </Routes>
  );
}

export default RootNavigation;