import { Menu } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { logout } from "../../store/auth-slice/index";
import { Button } from "../UI/button";

function AdminHeader({ setOpen, open }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

async function handleLogout(e) {

  try {
     e.preventDefault();
     const res = await dispatch(logout());
    const payload = res?.payload;
    console.log(payload);
    toast.success("Logged-Out successfully")
  } catch (err) {
    console.error("Logout failed:", err);
    toast.error(err?.message || "Logout failed");
  }
}
  return (
    <header className="d-flex justify-content-between align-items-center p-3 border-bottom bg-white">
      {/* Menu Button */}
      <Button
        className="btn btn-sm btn-outline-primary me-2"
        onClick={() => setOpen(prev => !prev)}
        style={{ visibility: open ? "hidden" : "visible" }}
      >
        <Menu size={20} />
      </Button>

      {/* Title */}
      <h5 className="mb-0">Admin Dashboard</h5>

      {/* Logout */}
      <Button className="btn btn-sm btn-danger" onClick={handleLogout}>
        Logout
      </Button>
    </header>
  );
}

export default AdminHeader;
