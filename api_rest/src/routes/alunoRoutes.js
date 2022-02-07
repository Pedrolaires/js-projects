import { Router } from 'express';
import AlunoController from '../controllers/AlunoController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get('/', AlunoController.index);
router.get('/:id', AlunoController.show);

router.post('/', loginRequired, AlunoController.create);
router.delete('/:id', loginRequired, AlunoController.delete);
router.put('/:id', loginRequired, AlunoController.update);

export default router;
