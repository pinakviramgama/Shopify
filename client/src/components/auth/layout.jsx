import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div>
      <h1>Welcome to ECommerce Shopping</h1>
      <Outlet />
    </div>
  );
}

export default AuthLayout;
