import express from 'express';
import Admin from '../controller/admin/index';

const router = express.Router();

router.post('/login', Admin.login);

export default router;
