const express = require("express");
const router = express.Router();
const {
  addProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
} = require("../../controllers/product-controller");

router.post("/products/add", addProduct);
router.get("/product/getAll", getAllProducts);
router.put("/product/edit/:id", updateProduct);
router.delete("/product/delete/:id", deleteProduct);

module.exports = router;
