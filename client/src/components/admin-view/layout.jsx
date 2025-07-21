import { Outlet } from "react-router-dom";
import AdminHeader from "./Header";
import AdminSidebar from "./Sidebar";

function AdminLayout() {
  return (
    <div className="flex min-h-screen w-full">
      <AdminSidebar />
      <div className="">
        <AdminHeader />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout; // ✅ THIS IS MANDATORY
