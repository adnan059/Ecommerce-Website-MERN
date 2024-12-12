import { useSelector } from "react-redux";
import ShoppingLayout from "../shopping-comps/ShoppingLayout";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { user } = useSelector((state) => state.auth);
  return user ? (
    <ShoppingLayout>
      <Outlet />
    </ShoppingLayout>
  ) : (
    <Navigate to="/auth/login" />
  );
};

export default ProtectedRoute;
