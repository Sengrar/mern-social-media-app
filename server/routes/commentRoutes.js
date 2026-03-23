import express from 'express';
const router = express.Router({mergeParams: true});
import { createComment, retrieveComment } from "../controllers/commentController.js";
import { auth } from '../middleware/authMiddleware.js';

router.post('/', auth, createComment);
router.get('/', auth, retrieveComment);

export default router;