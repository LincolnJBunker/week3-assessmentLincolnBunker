//imports
import express from "express";
import session from "express-session";
import cors from "cors";
import morgan from "morgan";

//express instance
const app = express();

//middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static("client"));
app.use(
  session({
    secret: "Thisisasupersecret",
    saveUninitialized: true,
    resave: false,
  })
);

import handlerFunctions from "./controller.js";
//Routes
app.get("/hello", handlerFunctions.wassup);
app.get("/skis", handlerFunctions.getTheSkis);
app.post("/newSki", handlerFunctions.newSkis);
app.delete("/deleteSki/:id", handlerFunctions.deleteSki);
app.put("/updateSki/:id", handlerFunctions.changeVote)

app.listen(8080, () => 
    console.log("Jerry's runnin' at http://localhost:8080")
    );