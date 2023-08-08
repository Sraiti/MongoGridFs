import express, { Request, Response } from "express";
import mongoose from "mongoose";
import multer from "multer";
import Grid from "gridfs-stream";
import crypto from "crypto";
import path from "path";
import cors from "cors";
import * as GridFsStorage from "multer-gridfs-storage";
const app = express();
app.use(cors());

// Middleware for parsing json requests
app.use(express.json());

// MongoDB URI
const mongoURI =
  process.env.MONGO_URI || "mongodb://localhost:27017/mediastream";

// Create mongoose connection
const conn = mongoose.createConnection(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Initialize GridFS
let gfs: Grid.Grid;

conn.once("open", () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("videos");
});

// Create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads",
        };
        resolve(fileInfo);
      });
    });
  },
});

const upload = multer({ storage });

// Routes
app.post("/upload", upload.single("file"), (req: Request, res: Response) => {
  res.json({ file: req.file });
});

// @TODO: Add more routes here for retrieving files, streaming files, etc.

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
