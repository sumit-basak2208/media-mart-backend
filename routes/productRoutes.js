const { Router } = require("express");
const { isAuthorized } = require("../middleware/VerifiedUser");
const {
  getProduct,
  updateProduct,
  removeProduct,
  addProduct,
} = require("../controllers/product.control");

const productRoutes = Router();

productRoutes
  .route("/:id")
  .get(isAuthorized(["CUSTOMER", "ADMIN"]), getProduct);
productRoutes.route("/:id").delete(isAuthorized(["ADMIN"]), removeProduct);
productRoutes.route("/").get(isAuthorized(["CUSTOMER", "ADMIN"]), getProduct);
productRoutes.route("/").post(isAuthorized(["ADMIN"]), updateProduct);
productRoutes.route("/").put(isAuthorized(["ADMIN"]), addProduct);

module.exports = { productRoutes };
