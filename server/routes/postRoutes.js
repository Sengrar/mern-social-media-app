import express from 'express';
const router = express.Router();
import { postCreate, postRetrieve } from '../controllers/postController.js';
import { auth } from '../middleware/authMiddleware.js';
import { getAllPost } from '../controllers/feedController.js';

router.post('/', auth, postCreate);

// router.get('/', auth, getAllPost);
router.get('/', getAllPost);

router.get('/:id', auth, postRetrieve);


export default router;