import { Router } from 'express';
import Usercontroller from '../controllers/UserController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

/* router.get('/', Usercontroller.index);
router.get('/:id', Usercontroller.show); */

router.post('/', Usercontroller.create);
router.put('/', loginRequired, Usercontroller.update);
router.delete('/', loginRequired, Usercontroller.delete);

export default router;
