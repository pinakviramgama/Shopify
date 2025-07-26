import { getAllProducts } from "@/store/admin/product-slices";
import { Fragment, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import AddNewProduct from "./AddNewProduct";
import AdminProductCard from "./product-tile";

function AdminProducts() {
    const dispatch = useDispatch();
    const [showSidebar, setShowSidebar] = useState(false);
    const { productList } = useSelector((state) => state.adminProducts);

    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);

    return (
        <Fragment>
        <div className="container-fluid p-3">
            <div className="d-flex justify-content-between align-items-center mb-4">
            <h3>All Products</h3>
            <Button variant="primary" onClick={() => setShowSidebar(true)}>
                + Add New Product
            </Button>
            </div>

        <div className="container-fluid">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-1">
            {productList?.length > 0 ? (
            productList.map((product) => (
                <div className="col mb-4 card-hover p-2" key={product._id}>
                <AdminProductCard product={product} />
                </div>
            ))
            ) : (
            <p>No products found.</p>
            )}
            </div>
        </div>
        <AddNewProduct showSidebar={showSidebar} setShowSidebar={setShowSidebar}/>
    </div>
    </Fragment>
    );
}

export default AdminProducts;