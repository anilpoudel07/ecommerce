import cookieParser from "cookie-parser";
import cors from "cors";
import healthcheckRouter from "./routes/healthcheck.routes.js"; // Adjust path if necessary
import express from "express";
const app = express();
// Middleware
app.use(cors({ credentials: true, origin: process.env.CORS_ORIGIN }));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ limit: "16kb", extended: true }));
app.use(cookieParser());
app.use(express.static("public"));
import userRouter from "./routes/user.routes.js";
// Routes
//
import orderItemRouter from "./routes/order.routes.js";
import productCatalogue from "./routes/products.routes.js";
import adminRoute from "./routes/admin.routes.js";
import cartRoute from "./routes/cart.routes.js";
app.use("/api/v1/healthcheck", healthcheckRouter);
app.use("/api/v1/user", userRouter); // Check this line
app.use("/api/v1/user", orderItemRouter);
app.use("/api/v1/user", productCatalogue);
app.use("/api/v1", adminRoute);
app.use("/api/v1/user", cartRoute);
import { errorHandler } from "./middleware/error.middleware.js";

app.use(errorHandler);
// Exporting the app for use in the server file (e.g., index.js)
export { app };
