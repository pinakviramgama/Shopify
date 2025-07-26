import { Button } from "@/components/UI/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/UI/sheet";
import { HousePlug, Menu, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./app.css";

function HeaderRightContent() {
  const { user } = useSelector((state) => state.auth);
  const username = user?.email?.split("@")[0] || "User";
  const firstLetter = username.charAt(0).toUpperCase();

  return (
    <div className="d-none d-lg-flex align-items-center gap-3">
      <Button variant="outline">
        <ShoppingCart className="me-2" />
        <span>User Cart</span>
      </Button>

      <Dropdown align="end">
        <Dropdown.Toggle
          variant="light"
          id="dropdown-basic"
          className="rounded-circle border shadow-sm d-flex justify-content-center align-items-center no-caret"
          style={{
            width: "44px",
            height: "44px",
            backgroundColor: "black",
            fontWeight: "bold",
            fontSize: "1.1rem",
            color: "white",
            padding: 0,
            lineHeight: "1",
          }}
        >
          {firstLetter}
        </Dropdown.Toggle>

        <Dropdown.Menu className="shadow border rounded">
          <Dropdown.Header className="text-muted px-3 small">
            Logged in as <strong>{user?.email}</strong>
          </Dropdown.Header>
          <Dropdown.Divider />
          <Dropdown.Item as={Link} to="/shop/profile">Profile</Dropdown.Item>
          <Dropdown.Item as={Link} to="/logout">Logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

function ShoppingHeader() {
  const [open, setOpen] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1040,
        width: "100%",
        backgroundColor: "#f8f9fa",
        borderBottom: "1px solid #dee2e6",
      }}
    >
      <div
        className="d-flex align-items-center justify-content-between px-3 py-2"
        style={{ width: "100%", maxWidth: "100%" }}
      >
        {/* Logo */}
        <Link to="/shop/home" className="d-flex align-items-center text-decoration-none text-primary">
          <HousePlug className="me-2" />
          <span className="fw-bold fs-4">E-Commerce</span>
        </Link>

        {/* Nav links */}
        <nav className="d-none d-lg-flex gap-4">
          {["home", "products", "cart", "profile"].map((item) => (
            <Link
              key={item}
              to={`/shop/${item}`}
              className="text-dark text-decoration-none"
              style={{ cursor: "pointer" }}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </Link>
          ))}
        </nav>

        {/* Right Content */}
        {isAuthenticated && <HeaderRightContent />}

        {/* Sidebar toggle */}
        <div className="d-flex d-lg-none">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="left"
              className="w-50 d-lg-none p-4 bg-white border-end"
              style={{
                height: "100vh",
                overflowY: "auto",
                transition: "transform 0.4s ease-in-out",
              }}
            >
              <div className="mb-4 border-bottom pb-2">
                <h5 className="fw-bold">Menu</h5>
              </div>
              <nav className="d-flex flex-column gap-3">
                {["home", "products", "cart", "profile"].map((item) => (
                  <Link
                    key={item}
                    to={`/shop/${item}`}
                    className="text-dark text-decoration-none"
                    style={{ cursor: "pointer" }}
                    onClick={() => setOpen(false)}
                  >
                    {item === "home"
                      ? "🏠 Home"
                      : item === "products"
                      ? "🛍️ Products"
                      : item === "cart"
                      ? "🛒 Cart"
                      : "👤 Profile"}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export default ShoppingHeader;
