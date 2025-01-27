import app from "./index.js";
import cookieParser from "cookie-parser";
import cors from "cors";
app.use(
  cors({
    credential: true,
    origin: process.env.CORS_ORIGIN,
  }),
);
app.use(express.static("public"));
app.use(
  express.json({
    limit: "16kb",
  }),
);
app.use(
  express.urlencoded({
    limit: "16kb",
    extended: true,
  }),
);
console.log(cookieParser());

app.use(cookieParser());
