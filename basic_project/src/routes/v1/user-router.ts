import { Router } from 'express';
import * as usersController from '../../controllers/v1/users-controllers';
import { checkAuth, checkIp } from '../../middlewares/auth-middleware';
import { handleRequestErrors } from '../../middlewares/validator-middleware';
import { validateObjectId } from '../../validators/v1/general-validator';
import {
  validateProfile,
  validateUser,
} from '../../validators/v1/users-validators';

const router = Router();

router.get('', checkAuth, usersController.getUsers);
router.post(
  '',
  checkIp,
  checkAuth,
  validateUser,
  handleRequestErrors,
  usersController.createUser
);
router.get(
  '/:id',
  checkAuth,
  validateObjectId,
  handleRequestErrors,
  usersController.getUserById
);
router.delete(
  '/:id',
  checkIp,
  checkAuth,
  validateObjectId,
  handleRequestErrors,
  usersController.deleteUser
);
router.post('/login', validateUser, handleRequestErrors, usersController.login);
router.patch(
  '',
  checkAuth,
  validateProfile,
  handleRequestErrors,
  usersController.updateProfile
);

export default router;
