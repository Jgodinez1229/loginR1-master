const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const logger = require("morgan");

const corsOptions = {
  origin: "http://localhost:4200", // Cambia esto por la URL de tu aplicación Angular
  optionsSuccessStatus: 200, // Algunos navegadores no envían correctamente el código de estado 204
};


const dotenv = require("dotenv");
dotenv.config();

const mongo = require("./config/dbconfig");
const indexRouter = require("./routes/index");
const usersRoutes = require("./routes/users");

const app = express();

// Middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors(corsOptions));

// Rutas
app.use("/", indexRouter);
app.use("/users", usersRoutes);

module.exports = app;
