const express = require("express");
var logger = require("morgan");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");

const { connect, disconnect } = require("./database/dbConfig");
const courseRoute = require("./routes/courseRoute");
const reviewRoute = require("./routes/reviewRoute");
const categoryRoute = require("./routes/categoryRoute");
const partnerRoute = require("./routes/partnerRoute");

connect();
const app = express();

app.use(express.json());
app.use(logger("dev"));

app.use("/categories", categoryRoute);

app.use("/courses", courseRoute);

app.use("/reviews", reviewRoute);

app.use("/partners", partnerRoute);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res) => {
  res.status(404).json({ message: "Resource not found" });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
