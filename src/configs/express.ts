"use strict";
import express from "express";
import cors from "cors";
import V1Route from "../routes/todo.routes";

// Dotenv Setup
import dotenv from "dotenv";
dotenv.config();

// Routes import
// import V1Route from "../app/routes/index.js"

const app = express();

// Swagger setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("Static"));
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    preflightContinue: false,
    optionsSuccessStatus: 200,
  })
);
app.set("trust proxy", 1);
app.get("/", function (req, res) {
  res.send("Server is up and running...");
});

// Routes for the API
app.use("/api/v1", V1Route);

export default app;
