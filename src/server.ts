import express, { Request, Response } from "express";
import mongoose from "mongoose";
import multer from "multer";
import crypto from "crypto";
import path from "path";
import cors from "cors";
const { GridFsStorage } = require("multer-gridfs-storage");
require("dotenv").config();
const app = express();
app.use(cors());

// Middleware for parsing json requests
app.use(express.json());

// MongoDB URI
const mongoURI =
  process.env.MONGO_URI || "mongodb://localhost:27017/mediastream";
const promise = mongoose.connect(mongoURI, { useNewUrlParser: true });

const conn = mongoose.connection;
let gfs;

conn.once("open", () => {
  // Initialize GridFS
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "videos",
  });
});

// Create storage engine
const storage = new GridFsStorage({
  db: promise,
  file: (req: any, file: any) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "videos",
        };
        resolve(fileInfo);
      });
    });
  },
});

const upload = multer({ storage });

// Routes
app.post("/upload", upload.single("file"), (req: Request, res: Response) => {
  try {
    res.json({ file: req.file });
  } catch (error) {
    res.json(error);
  }
});

// @TODO: Add more routes here for retrieving files, streaming files, etc.

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
