import {Router} from 'express';
import {handleRegisterUser, handleLoginUser} from '../controllers/authenticationControllers'

const router = Router();

router.post('/users/register', handleRegisterUser);
router.post('/users/login', handleLoginUser);

export default router;