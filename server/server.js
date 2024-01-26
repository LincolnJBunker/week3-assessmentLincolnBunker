// import packages and files
import express from "express";
import session from "express-session";
import cors from "cors";
import morgan from "morgan";

// set up express instance
const app = express();

// set up middleware
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

app.listen(8080, () => 
    console.log("Jerry's runnin' at http://localhost:8080")
    );