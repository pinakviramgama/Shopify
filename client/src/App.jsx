import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import AdminDashboard from "./components/admin-view/dashboard";
import AdminFeatures from "./components/admin-view/features";
import AdminLayout from "./components/admin-view/layout";
import AdminOrders from "./components/admin-view/order";
import AdminProducts from "./components/admin-view/products";
import AuthLayout from "./components/auth/layout";
import CheckAuth from "./components/common/check-auth";
import PageNotFound from "./components/not-found/not-found";
import SHoppingAccount from "./components/shopping-view/account";
import SHoppingCheckout from "./components/shopping-view/checkout";
import SHoppingHome from "./components/shopping-view/home";
import SHoppingListing from "./components/shopping-view/listing";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import ShoppingLayout from "./pages/shopping-view/layout";
import UnauthPage from "./pages/unauth/unauth";
import { checkAuth } from "./store/auth-slice";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const isAuthPage = location.pathname.startsWith("/auth/login") || location.pathname.startsWith("/auth/register");
    if (!isAuthPage) {
      dispatch(checkAuth());
    }
  }, [dispatch, location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<h1>Home Route Working</h1>} />

      <Route
        path="/auth"
        element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout />
          </CheckAuth>
        }
      >
        <Route path="login" element={<AuthLogin />} />
        <Route path="register" element={<AuthRegister />} />
      </Route>

      <Route
        path="/admin"
        element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout />
          </CheckAuth>
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="features" element={<AdminFeatures />} />
      </Route>

      <Route
        path="/shop"
        element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ShoppingLayout />
          </CheckAuth>
        }
      >
        <Route path="home" element={<SHoppingHome />} />
        <Route path="listing" element={<SHoppingListing />} />
        <Route path="account" element={<SHoppingAccount />} />
        <Route path="checkout" element={<SHoppingCheckout />} />
      </Route>

      <Route path="unauth-page" element={<UnauthPage />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
