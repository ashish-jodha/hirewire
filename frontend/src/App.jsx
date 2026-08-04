import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Navbar";
import Login from "./Login";
import SignUp from "./SignUp";
import ProtectedRoute from "./ProtectedRoute";
import DashBoard from "./DashBoard";
import AddPage from "./AddPage";
import EditPage from "./EditPage";
import DeleteRoute from "./DeleteRoute";

export default function App() {
  const appContainerClasses = "min-h-screen bg-slate-950 text-slate-200";

  return (
    <div className={appContainerClasses}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashBoard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/add"
            element={
              <ProtectedRoute>
                <AddPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/edit/:id"
            element={
              <ProtectedRoute>
                <EditPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/delete/:id"
            element={
              <ProtectedRoute>
                <DeleteRoute />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}