import { Route, Routes } from "react-router-dom";
import PublicRoute from "./components/auth-comps/PublicRoute";
import Login from "./pages/auth-pages/Login";
import Register from "./pages/auth-pages/Register";
import AdminRoute from "./components/admin-comps/AdminRoute";

import NotFound from "./pages/not-found/NotFound";
import Ad_Dashboard from "./pages/admin-pages/Ad_Dashboard";
import Ad_Products from "./pages/admin-pages/Ad_Products";
import Ad_Orders from "./pages/admin-pages/Ad_Orders";
import Ad_Features from "./pages/admin-pages/Ad_Features";
import Sh_Home from "./pages/shopping-pages/Sh_Home";
import Sh_Listing from "./pages/shopping-pages/Sh_Listing";
import Sh_Checkout from "./pages/shopping-pages/Sh_Checkout";
import Sh_Account from "./pages/shopping-pages/Sh_Account";
import UnAuthPage from "./pages/unauth-pages/UnAuthPage";
import ProtectedRoute from "./components/auth-comps/ProtectedRoute";
import Sh_PaypalReturn from "./pages/shopping-pages/Sh_PaypalReturn";
import Sh_PaymentSuccess from "./pages/shopping-pages/Sh_PaymentSuccess";

const Ecom = () => {
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />

        {/* --- auth routes --- */}
        <Route path="/auth" element={<PublicRoute />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/* --- admin routes --- */}
        <Route path="/admin" element={<AdminRoute />}>
          <Route path="dashboard" element={<Ad_Dashboard />} />
          <Route path="products" element={<Ad_Products />} />
          <Route path="orders" element={<Ad_Orders />} />
          <Route path="features" element={<Ad_Features />} />
        </Route>

        {/* --- shopping routes --- */}
        <Route path="/shop" element={<ProtectedRoute />}>
          <Route path="home" element={<Sh_Home />} />
          <Route path="listing" element={<Sh_Listing />} />
          <Route path="checkout" element={<Sh_Checkout />} />
          <Route path="account" element={<Sh_Account />} />
          <Route path="paypal-return" element={<Sh_PaypalReturn />} />
          <Route path="payment-success" element={<Sh_PaymentSuccess />} />
        </Route>

        {/* un-auth page */}
        <Route path="/unauth-page" element={<UnAuthPage />} />

        {/* --- not found route --- */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default Ecom;
