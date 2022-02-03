import { Router } from 'express';
import Usercontroller from '../controllers/UserController';

const router = new Router();

router.post('/', Usercontroller.create);
router.get('/', Usercontroller.index);
router.get('/:id', Usercontroller.show);
router.put('/:id', Usercontroller.update);
router.delete('/:id', Usercontroller.delete);

export default router;
