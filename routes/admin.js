import express from 'express';
import Admin from '../controller/admin/index';

const router = express.Router();

router.post('/login', Admin.login);
router.post('/register', Admin.register);
router.get('/list', Admin.list);

export default router;
