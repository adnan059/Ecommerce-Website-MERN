import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import { useSelector } from "react-redux";

const PublicRoute = () => {
  const { user } = useSelector((state) => state.auth);
  return user ? (
    <Navigate to={"/"} />
  ) : (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  );
};

export default PublicRoute;
