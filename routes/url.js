import express from 'express'
import {handleGenerateShortUrl} from '../controllers/url.js'
const router=express.Router();

router.post('/',handleGenerateShortUrl);
export default router;