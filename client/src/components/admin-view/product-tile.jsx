import { deleteProduct, getAllProducts } from "@/store/admin/product-slices";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { Card, CardContent, CardFooter } from "../UI/card";

function AdminProductTile({ product }) {
  const dispatch = useDispatch(); //

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this product ??")) {
        const result = await dispatch(deleteProduct(id));
        await dispatch(getAllProducts());
      if (result?.payload?.success) {
        toast.success("Product deleted successfully!");
      } else {
        toast.error("Failed to delete product.");
      }
    }
  };

  const handleEdit = async (id) => {

    };

  return (
    <Card
      className="border rounded shadow-sm p-2"
      style={{
        width: "100%",
        maxWidth: "250px",
        fontSize: "14px",
        height: "100%",
      }}
    >
      <div className="d-flex flex-column h-100">
        {/* Image */}
        <div className="text-center bg-light p-2">
          <img
            src={
              product.image ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXNWKQ1j4yyqliH2m8ekr4wYJK_JxXqx7Vkg&s"
            }
            alt={product.title || "Product Image"}
            className="img-fluid"
            style={{
              maxHeight: "160px",
              width: "100%",
              objectFit: "contain",
              borderRadius: "5px",
            }}
          />
        </div>

        {/* Content */}
        <CardContent className="px-2 pt-2 pb-0">
          <h6 className="fw-semibold mb-1 text-truncate">{product.title}</h6>
          <p className="text-muted small mb-1 text-truncate">{product.brand}</p>
          <div className="d-flex align-items-center gap-2">
            <span className="text-success fw-bold">
              ₹{product.salePrice > 0 ? product.salePrice : product.price}
            </span>
            {product.salePrice > 0 && (
              <span className="text-muted text-decoration-line-through">
                ₹{product.price}
              </span>
            )}
       {product?.price && product?.salePrice ? (
  <span className="text-danger small fw-semibold">
    {Math.round(
      ((Number(product.price) - Number(product.salePrice)) / Number(product.price)) * 100
    )}
    % off
  </span>
) : null}

          </div>
        </CardContent>

        {/* Footer */}
        <CardFooter className="bg-white border-0 mt-auto d-flex justify-content-between px-2 pt-2">
            <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(product._id)}>
                    Delete
            </button>

                <Button onClick={() => handleEdit(product._id)} variant="primary" size="sm">
                    Edit
                </Button>
            </CardFooter>
        </div>
    </Card>
  );
}

export default AdminProductTile;
