import {Router} from 'express';

import { getAllGuides } from "../controllers/guide.controller.js";


const router = Router();

router.get('/', getAllGuides);
export default router;
