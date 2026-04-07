import express from 'express';
const router = express.Router({mergeParams: true});
import { createComment, retrieveComment } from "../controllers/commentController.js";
import { auth } from '../middleware/authMiddleware.js';

router.post('/', auth, createComment);
// router.post('/', createComment);
router.get('/', auth, retrieveComment);
// router.get('/', retrieveComment);

export default router;