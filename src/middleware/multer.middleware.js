// multer.middleware.js
import multer from "multer";
import path from "path";

class MulterMiddleware {
  constructor() {
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, "./public/temp"); // Temporary upload directory
      },
      filename: (req, file, cb) => {
        cb(null, file.originalname);
      },
    });

    // Initialize multer with storage
    this.upload = multer({ storage });
  }
}

// Export the upload instance
const multerMiddleware = new MulterMiddleware();
export const upload = multerMiddleware.upload;
