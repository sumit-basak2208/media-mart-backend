const { errorMessage, HTTP_STATUS } = require("../enums/enums");
const { Product } = require("../models/productSchema");

async function getProduct(req, res) {
  const { page = 1 } = req.query; // Default page number is 1
  const limit = 12; // Number of songs per page
  const { id } = req.params;

  try {
    let products;
    if (!id) {
      products = await Product.find({});      
    } else {
      products = [await Product.findById(id)];
    }
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const product = products.slice(startIndex, endIndex);

    const paginatedResult = {
      products: product,
      nextPage: products.length > endIndex ? true : false,
      role: req.role,
    };
    return res.status(HTTP_STATUS.OK).send(paginatedResult);
  } catch (error) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send({
      error: error.message || "Unable to fetch history",
    });
  }
}

async function addProduct(req, res) {
  const { name, type, description, price, image } = req.body;
  try {
    if (!name || !type || !description || !price || !image) {
      return res.status(HTTP_STATUS.BAD_REQUEST).send({
        error: errorMessage.REQUIRED_FIELDS,
      });
    }

    await Product.create({
      name,
      type,
      description,
      price,
      image,
    });

    return res.status(HTTP_STATUS.OK).send({
      message: "Product added",
    });
  } catch (error) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send({
      error: error.message || "Error in adding product",
    });
  }
}

async function removeProduct(req, res) {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(HTTP_STATUS.BAD_REQUEST).send({
        error: errorMessage.REQUIRED_FIELDS,
      });
    }

    await Product.findOneAndDelete({ _id: id });
    return res.status(HTTP_STATUS.OK).send({
      message: "Product removed",
    });
  } catch (error) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send({
      error: error.message || "Error in removing product",
    });
  }
}

async function updateProduct(req, res) {
  try {
    const { id, name, type, description, price, image } = req.body;
    await Product.findOneAndUpdate(
      { _id: id },
      {
        name,
        type,
        description,
        price,
        image,
      }
    );
    return res.status(HTTP_STATUS.OK).send({
      message: "Product updated successfully",
    });
  } catch (error) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      error:
        error.message ||
        "Error in update product route. Contact the developer for help.",
    });
  }
}

module.exports = { getProduct, addProduct, removeProduct, updateProduct };
