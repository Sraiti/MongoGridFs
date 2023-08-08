# Video Streaming Service with MongoDB GridFS

This project provides a solution for storing, streaming, and uploading videos using MongoDB's GridFS. It's an integration that enables large file handling by storing files in chunks and streaming them to the frontend, allowing seamless playback and efficient storage.

## Features

- **Chunked Storage**: Videos are stored in MongoDB in smaller chunks using GridFS, which provides efficient storage and retrieval.
- **Chunked Uploads**: Videos are uploaded in chunks, allowing for handling large files without overwhelming the system.
- **Video Streaming**: Videos are streamed in chunks to the frontend, enabling smooth playback without needing to download the entire file.
- **Express Backend**: A robust Express.js backend handles video uploading and streaming.

## Technologies Used

- **Node.js**: Runtime environment for executing JavaScript server-side code.
- **TypeScript**: Superset of JavaScript that adds static typing.
- **Express**: Web application framework for Node.js.
- **MongoDB**: NoSQL database used to store video chunks.
- **GridFS**: Specification used in MongoDB for storing and retrieving large files such as videos.
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB and Node.js.
- **Multer**: Middleware for handling `multipart/form-data`, used for uploading files.
- **GridFsStorage**: A multer storage engine for GridFS.
- **Crypto**: Node's native module for various cryptographic functions.
- **CORS**: Package to enable Cross-Origin Resource Sharing.

## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB instance running (local or cloud)

### Installation

1. **Install the dependencies:**

   ```shell
   npm install
   ```

2. **Update the `mongoURI` variable in `server.ts` with your MongoDB connection string.**

3. **Run the server:**

   ```shell
   npm run dev
   ```

4. **The server will be running at `http://localhost:5000`.**

## Usage

- **Uploading Videos**: POST request to `/upload` with video file attached.

## Contributing

Please feel free to do so
