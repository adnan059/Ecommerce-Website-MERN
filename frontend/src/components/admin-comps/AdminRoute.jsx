import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import { useSelector } from "react-redux";

const AdminRoute = () => {
  const { user } = useSelector((state) => state.auth);
  return user?.isAdmin ? (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  ) : (
    <Navigate to={"/unauth-page"} />
  );
};

export default AdminRoute;
