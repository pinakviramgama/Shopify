import { Outlet } from "react-router-dom";
import ProductFilter from "./filter";
import ShoppingHeader from "./header";

function ShoppingLayout() {
  return (
    <div className="bg-white min-vh-100">
      {/* Sticky Header */}
      <ShoppingHeader />

      {/* Full-width Layout */}
      <div className="container-fluid px-0">
        <div className="row no-gutters">
          {/* Sidebar Filter */}
          <div className="col-12 col-lg-3 top-0 px-3 py-4" style={{marginTop:"-20px"}}>
            <ProductFilter />
          </div>

          {/* Main Content */}
          <div className="col-12 col-lg-9 px-3 py-4">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingLayout;
