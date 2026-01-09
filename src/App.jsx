import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SignUp } from "./pages/SignUp";
import { Signin } from "./pages/Signin";
import { Dashboard } from "./pages/Dashboard";
import { Navbar } from "./component/Navbar";

export default function App() {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>



      <Routes>
        {/* Public routes */}
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected route */}
        <Route
          path="/dashboard"
          element={token ? <Dashboard /> : <Navigate to="/signin" />}
        />

        {/* Default redirect */}
        <Route
          path="*"
          element={<Navigate to={token ? "/dashboard" : "/signin"} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
