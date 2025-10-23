import { BrowserRouter,Route,Routes, Navigate } from "react-router-dom";
import UserListPage from "../pages/users/UserListPage";
import UserFormPage from "../pages/users/UserFormPage"; 
import FibonacciPage from "../pages/FibonacciPage";
import CollatzPage from "../pages/CollatzPage";
import Navbar from "../components/layout/Navbar";

const AppRoutes = () => {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/users" element={<UserListPage />} />
        <Route path="/users/new" element={<UserFormPage />} />
        <Route path="/users/:id/edit" element={<UserFormPage />} /> 
        <Route path="/fibonacci" element={<FibonacciPage />} />
        <Route path="/collatz" element={<CollatzPage />} />
        <Route path="*" element={<Navigate to="/users" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;