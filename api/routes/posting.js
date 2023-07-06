import { login, logout, profile, register } from "../controllers/authController.js";

import express from "express";
const router = express.Router();

router.get('/profile', profile);

router.post('/register', register);
router.post('/login', login);
router.post("/logout", logout);
export default router;