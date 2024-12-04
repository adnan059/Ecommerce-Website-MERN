import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthLayout from "./AuthLayout";

const PublicRoute = () => {
  const user = false;
  return user ? (
    <Navigate to={"/"} />
  ) : (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  );
};

export default PublicRoute;
