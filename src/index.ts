"use strict";
import app from "./configs/express";
import { AppDataSource } from "./configs/database";

const PORT = process.env.PORT || 5000;

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected successfully !!!");
  })
  .catch((error) => {
    console.log("Could not connect to db", error);
  });

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}...`));
