import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import AdminLayout from "./AdminLayout";

const AdminRoute = () => {
  const user = {
    isAdmin: true,
  };
  return user?.isAdmin ? (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  ) : (
    <Navigate to={"/"} />
  );
};

export default AdminRoute;
