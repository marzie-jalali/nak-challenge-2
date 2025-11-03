import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import styled from "@emotion/styled";
import UserListPage from "../pages/users/UserListPage";
import UserFormPage from "../pages/users/UserFormPage";
import FibonacciPage from "../pages/FibonacciPage";
import CollatzPage from "../pages/CollatzPage";
import Navbar from "../components/layout/Navbar";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <AppLayout>
        <Navbar />
        <MainContent>
          <Routes>
            <Route path="/users" element={<UserListPage />} />
            <Route path="/users/new" element={<UserFormPage />} />
            <Route path="/users/:id/edit" element={<UserFormPage />} />
            <Route path="/fibonacci" element={<FibonacciPage />} />
            <Route path="/collatz" element={<CollatzPage />} />
            <Route path="*" element={<Navigate to="/users" />} />
          </Routes>
        </MainContent>
      </AppLayout>
    </BrowserRouter>
  );
};

const AppLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #ffffff;
  overflow: hidden;
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export default AppRoutes;
