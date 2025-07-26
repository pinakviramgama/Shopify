import { addNewProduct, getAllProducts } from "@/store/admin/product-slices";
import { useState } from "react";
import { Button, Form, Offcanvas } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const initialStateFormData = {
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
};

const AddNewProduct = ({ showSidebar, setShowSidebar }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialStateFormData);
  const [imageCount, setImageCount] = useState(0);
  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e, index) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const preview = URL.createObjectURL(file);
      setImages((prev) => {
        const updated = [...prev];
        updated[index] = { file, preview };
        return updated;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (images.some((img) => !img || !img.file)) {
      return toast.error("Please upload all selected images.");
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    images.forEach((imgObj) => {
      data.append("images", imgObj.file);
    });

    const result = await dispatch(addNewProduct(data));
    if (result?.payload?.success) {
      dispatch(getAllProducts());
      setImages([]);
      setImageCount(0);
      setFormData(initialStateFormData);
      toast.success("Product Added Successfully!");
      setShowSidebar(false);
    }
  };

  return (
    <Offcanvas
      show={showSidebar}
      onHide={() => setShowSidebar(false)}
      placement="end"
      backdrop="static"
      scroll
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Add New Product</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Form onSubmit={handleSubmit}>
          {[{ label: "Title", name: "title" },
            { label: "Description", name: "description", type: "textarea" },
            { label: "Price", name: "price", type: "number" },
            { label: "Sale Price", name: "salePrice", type: "number" },
            { label: "Total Stock", name: "totalStock", type: "number" }].map(
            ({ label, name, type = "text" }) => (
              <Form.Group className="mb-3" key={name}>
                <Form.Label>{label}</Form.Label>
                <Form.Control
                  as={type === "textarea" ? "textarea" : "input"}
                  type={type !== "textarea" ? type : undefined}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  required={name === "title"}
                />
              </Form.Group>
            )
          )}

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              <option value="electronics">Electronics</option>
              <option value="fashion">Fashion</option>
              <option value="books">Books</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Brand</Form.Label>
            <Form.Select
              name="brand"
              value={formData.brand}
              onChange={handleChange}
            >
              <option value="">Select Brand</option>
              <option value="apple">Apple</option>
              <option value="nike">Nike</option>
              <option value="samsung">Samsung</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Number of Images (max 6)</Form.Label>
            <Form.Control
              type="number"
              min={1}
              max={6}
              value={imageCount}
              onChange={(e) => {
                const count = Math.min(6, parseInt(e.target.value) || 0);
                setImageCount(count);
                setImages(Array(count).fill(null));
              }}
            />
          </Form.Group>

          {[...Array(imageCount)].map((_, index) => (
            <Form.Group className="mb-3" key={index}>
              <Form.Label>Image {index + 1}</Form.Label>
              <div
                onClick={() =>
                  document.getElementById(`fileInput${index}`).click()
                }
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const file = e.dataTransfer.files[0];
                  if (file?.type.startsWith("image/")) {
                    handleImageChange({ target: { files: [file] } }, index);
                  }
                }}
                style={{
                  border: "2px dashed #ccc",
                  padding: "20px",
                  borderRadius: "8px",
                  textAlign: "center",
                  cursor: "pointer",
                }}
              >
                {images[index]?.preview ? (
                  <>
                    <img
                      src={images[index].preview}
                      alt={`preview-${index}`}
                      style={{ maxHeight: "100px", marginBottom: "10px" }}
                    />
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        const updated = [...images];
                        updated[index] = null;
                        setImages(updated);
                      }}
                      style={{
                        color: "red",
                        fontWeight: "bold",
                        cursor: "pointer",
                      }}
                    >
                      × Remove
                    </div>
                  </>
                ) : (
                  <p>Click or drag & drop image here</p>
                )}
                <input
                  id={`fileInput${index}`}
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => handleImageChange(e, index)}
                />
              </div>
            </Form.Group>
          ))}

          <div className="d-flex justify-content-end">
            <Button type="submit" variant="success">
              Create Product
            </Button>
          </div>
        </Form>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default AddNewProduct;
