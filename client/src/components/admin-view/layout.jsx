import { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "./Header";
import AdminSideBar from "./Sidebar";

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="d-flex" style={{ height: "100vh", overflow: "hidden" }}>
      {/* Sidebar */}
      <div
        className={`bg-white border-end position-fixed h-100 transition-sidebar ${
          sidebarOpen ? "sidebar-show" : "sidebar-hide"
        }`}
        style={{ width: 240, zIndex: 1050 }}
      >
        <AdminSideBar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main Content */}
      <div
        className="flex-grow-1"
        style={{
          marginLeft: sidebarOpen ? 240 : 0,
          transition: "margin-left 0.3s ease",
          height: "100vh",
          overflowY: "auto",
        }}
      >
        <AdminHeader setOpen={setSidebarOpen} open={sidebarOpen} />
        <div className="p-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
