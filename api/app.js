const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const logger = require("morgan")
const categoryRoute = require("./routes/categories.js");
const productRoute = require("./routes/product.js")
const InvoiceRoute = require("./routes/invoices.js")
const authRoute = require("./routes/auth.js");
const userRoute = require("./routes/users.js");

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to mongo");
  } catch (error) {
    throw error;
  }
};

app.use(logger("dev"))
app.use(express.json())
app.use(cors());

app.use("/api/categories", categoryRoute)
app.use("/api/products", productRoute)
app.use("/api/invoices", InvoiceRoute)
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);

app.listen(process.env.PORT, () => {
  connect();
  console.log(`${process.env.PORT} Listening.... `);
});
