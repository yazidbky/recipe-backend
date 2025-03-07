import express from "express";
import { register, login } from "../controllers/userControllers.mjs";

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

export default router;
