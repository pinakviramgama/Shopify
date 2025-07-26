import {
  BadgeCheck,
  ChartBar,
  LayoutDashboard,
  ShoppingBasket,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function AdminSideBar({ onClose }) {
  const navigate = useNavigate();

  const menu = [
    {
      label: "Dashboard",
      icon: <LayoutDashboard size={18} className="me-2" />,
      path: "/admin/dashboard",
    },
    {
      label: "Products",
      icon: <ShoppingBasket size={18} className="me-2" />,
      path: "/admin/products",
    },
    {
      label: "Orders",
      icon: <BadgeCheck size={18} className="me-2" />,
      path: "/admin/orders",
    },
    {
      label: "Reports",
      icon: <ChartBar size={18} className="me-2" />,
      path: "/admin/reports",
    },
  ];

  return (
    <aside className="d-flex flex-column h-100 border-end bg-white">
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between p-3 border-bottom">
        <div className="d-flex align-items-center gap-2">
          <LayoutDashboard size={24} className="text-primary" />
          <h5 className="mb-0 fw-semibold">Admin Panel</h5>
        </div>

        {/* Close Button */}
        <button className="btn btn-sm btn-light ms-auto" onClick={onClose}>
          <X size={20} />
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-grow-1 py-3">
        {menu.map((item, idx) => (
          <div
            key={idx}
            onClick={() => {
              navigate(item.path);
              onClose?.();
            }}
            className="d-flex align-items-center px-4 py-2 text-dark hoverable-menu"
            style={{
              cursor: "pointer",
              fontSize: "14px",
              transition: "background-color 0.2s ease",
            }}
          >
            {item.icon}
            {item.label}
          </div>
        ))}
      </nav>
    </aside>
  );
}

export default AdminSideBar;
