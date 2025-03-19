import multer from "multer";
import { bucket } from "../firebaseConfig.mjs";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import { Readable } from "stream";

// Configure Multer to process files but not store them locally
const storage = multer.memoryStorage();
const upload = multer({ storage });

const uploadToFirebase = async (file) => {
  return new Promise((resolve, reject) => {
    const fileName = `${uuidv4()}-${file.originalname}`;
    const fileRef = bucket.file(fileName);

    const stream = fileRef.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    stream.on("error", (err) => reject(err));
    stream.on("finish", async () => {
      // Make file publicly accessible
      await fileRef.makePublic();
      resolve(`https://storage.googleapis.com/${bucket.name}/${fileName}`);
    });

    // Convert buffer to readable stream and pipe it
    Readable.from(file.buffer).pipe(stream);
  });
};

export { upload, uploadToFirebase };
