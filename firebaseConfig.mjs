import admin from "firebase-admin";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { readFileSync } from "fs";

// Convert URL to path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load Firebase credentials
const serviceAccount = JSON.parse(
  readFileSync(__dirname + "/firebaseAdminConfig.json", "utf8")
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "recipe-backend-21154", // Replace with your Firebase project ID
});

const bucket = admin.storage().bucket();

export { bucket };
