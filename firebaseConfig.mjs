import admin from "firebase-admin";
import dotenv from "dotenv";
import { readFile } from "fs/promises";
import path from "path";

dotenv.config();

// Load Firebase credentials from JSON file
const serviceAccountPath = path.resolve("firebaseAdminConfig.json");
const serviceAccount = JSON.parse(await readFile(serviceAccountPath, "utf8"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "recipe-backend-21154", // Replace with your Firebase Storage bucket
});

const bucket = admin.storage().bucket();

export { bucket };
