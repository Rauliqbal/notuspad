// Read more visit https://expressjs.com/en/guide/routing.html
import express from "express";
import { getUser, login, register } from "../controllers/userController.js";
import verifyToken from "../middlewares/auth.js";
import { createNote, getNotes } from "../controllers/noteController.js";

const router = express.Router();

// Route Auth
router.post('/register', register)
router.post('/login', login)
router.get('/user', verifyToken, getUser)

// Route Note
router.post('/note', verifyToken, createNote)
router.get('/note', verifyToken, getNotes)

export default router;
