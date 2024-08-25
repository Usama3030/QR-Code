const http = require("http");
require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 8000;
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const mongoose = require("./DataBase/DataBase");
//import routes
const userRoutes = require("./Routes/userRoutes");
const locationRoutes = require("./Routes/locationChecklistRoutes");
const problemRoutes = require("./Routes/problemChecklistRoutes");
const formChecklistRoutes = require("./Routes/formChecklist");
const uploadFileRoutes = require("./Routes/uploadCloudinaryRoutes");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Facility QR Pro",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:8080",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use(cors());

app.use(bodyParser.json());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/user", userRoutes);
app.use("/location", locationRoutes);
app.use("/problem", problemRoutes);
app.use("/form", formChecklistRoutes);
app.use("/file", uploadFileRoutes);

app.listen(port, () => {
  // console.log(`Server is running on port ${port}`);
  console.log(`Server is running on ${port}`);
});
