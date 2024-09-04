const express = require("express");
var logger = require("morgan");
const swaggerUi = require("swagger-ui-express");

const { connectToMongoDB } = require("./db");
const courseRoute = require("./routes/courseRoute");
const reviewRoute = require("./routes/reviewRoute");
const categoryRoute = require("./routes/categoryRoute");

connectToMongoDB();
const app = express();

app.use(express.json());
app.use(logger("dev"));

app.use("/categories", categoryRoute);

app.use("/courses", courseRoute);

app.use("/reviews", reviewRoute);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
