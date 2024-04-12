const express = require("express");
const { connect } = require("./config/database");
const cors = require("cors");
const { UserRoutes } = require("./routes/userRoutes");
const { productRoutes } = require("./routes/productRoutes");
require("dotenv").config();

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(
  cors({
    origin: "http://localhost:3000",
    method: "GET,PUT,POST,DELETE",
  })
);

app.use("/api/user", UserRoutes);
app.use("/api/product", productRoutes);

connect().then(() => {
  app.listen(process.env.PORT || 8080, () => {
    console.log(`Connected on PORT: ${process.env.PORT || 8080}`);
  });
});
