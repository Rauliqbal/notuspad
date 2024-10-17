// Read more visit https://expressjs.com/en/guide/routing.html
import express from "express";
import { getUser, login, register } from "../controllers/userController.js";
import verifyToken from "../middlewares/auth.js";
import { createNote, deleteNote, getNoteById, getNotes, updateNote } from "../controllers/noteController.js";

const router = express.Router();

// Route Auth
router.post('/register', register)
router.post('/login', login)
router.get('/user', verifyToken, getUser)

// Route Note
router.post('/note', verifyToken, createNote)
router.get('/note', verifyToken, getNotes)
router.get('/note/:id', verifyToken, getNoteById)
router.patch('/note/:id', verifyToken, updateNote)
router.delete('/note/:id', verifyToken, deleteNote)

export default router;
